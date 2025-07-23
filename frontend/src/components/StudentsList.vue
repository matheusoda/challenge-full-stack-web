<template>
  <v-container class="content">
    <v-card>
      <v-card-title>
        <span>Lista de Alunos</span>
        <v-text-field
          v-model="searchQuery"
          label="Pesquisar"
          variant="outlined"
          class="search-field"
          density="compact"
          clearable
          hide-details
          @input="onSearch"
        />

        <v-btn @click="goToRegisterPage">Cadastrar Aluno</v-btn>
      </v-card-title>

      <v-data-table-server
        v-model:options="options"
        :headers="headers"
        :items="students"
        :server-items-length="totalItems"
        :items-length="totalItems"
        item-key="ra"
        class="elevation-1"
        :loading="loading"
        :items-per-page-options="[5, 10, 20, 50]"
        items-per-page-text='Itens por página'
        show-first-last-page = true
        :show-current-page=true
        @update:options="onOptionsUpdate"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn prepend-icon="mdi-pencil" variant="text" @click="editStudent(item)">Editar</v-btn>
          <v-btn prepend-icon="mdi-delete" variant="text" color="red" @click="confirmDelete(item)">
            Excluir
          </v-btn>
        </template>

        <template v-slot:no-data>
          <v-alert type="info">Nenhum aluno encontrado.</v-alert>
        </template>
      </v-data-table-server>
    </v-card>

    <v-dialog v-model="dialog" persistent max-width="400px">
      <v-card>
        <v-card-title class="headline">Confirmação</v-card-title>
        <v-card-text>Você tem certeza que deseja excluir o aluno {{ studentToDelete?.name }}?</v-card-text>
        <v-card-actions>
          <v-btn @click="dialog = false">Cancelar</v-btn>
          <v-btn color="red" @click="deleteStudent(studentToDelete)">Confirmar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="feedbackDialog" persistent max-width="400px">
      <v-card>
        <v-card-title class="headline">{{ feedbackTitle }}</v-card-title>
        <v-card-text>{{ feedbackMessage }}</v-card-text>
        <v-card-actions>
          <v-btn @click="feedbackDialog = false">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { ref, onMounted, reactive, watch } from 'vue'
import api from '@/plugins/axios'
import { useRouter } from 'vue-router'

interface Student {
  id: string
  name: string
  ra: string
  cpf: string
  email: string
  [key: string]: string
}

interface Header {
  title: string
  value: string
  sortable: boolean
  align: 'start' | 'center' | 'end'
}

export default {
  setup() {
    const router = useRouter()
    const headers = ref<Header[]>([
      { title: 'Registro Acadêmico', value: 'ra', sortable: true, align: 'start' },
      { title: 'Nome', value: 'name', sortable: true, align: 'start' },
      { title: 'CPF', value: 'cpf', sortable: true, align: 'start' },
      { title: 'Ações', value: 'actions', sortable: false, align: 'center' },
    ])

    const students = ref<Student[]>([])
    const totalItems = ref(0)
    const searchQuery = ref('')
    const dialog = ref(false)
    const studentToDelete = ref<Student | null>(null)

    const feedbackDialog = ref(false)
    const feedbackTitle = ref('')
    const feedbackMessage = ref('')
    const loading = ref(false)

    const options = reactive({
      page: 1,
      itemsPerPage: 10,
      sortBy: [] as string[],
      sortDesc: [] as boolean[],
    })

    watch( () => ([options.page, options.itemsPerPage, options.sortBy, options.sortDesc]),
      () => {
        fetchStudents()
      },
      { deep: true }
    )

    let searchTimeout: number | null = null

    const fetchStudents = async () => {
      loading.value = true
      try {
        const params: { page: number; limit: number; search?: string; sortBy?: string; sortDesc?: boolean } = {
          page: options.page,
          limit: options.itemsPerPage,
        }

        if (searchQuery.value.trim()) {
          params.search = searchQuery.value.trim()
        }

        if (options.sortBy.length > 0) {
          params.sortBy = options.sortBy[0]
          params.sortDesc = options.sortDesc[0]
        }

        const response = await api.get('/students', { params })
        students.value = response.data.data
        totalItems.value = response.data.meta.total
      } catch (error) {
        console.error('Erro ao buscar alunos:', error)
        localStorage.removeItem('token')
      } finally {
        loading.value = false
      }
    }

    const onOptionsUpdate = (newOptions: typeof options) => {
      const hasChanged =
        newOptions.page !== options.page ||
        newOptions.itemsPerPage !== options.itemsPerPage ||
        JSON.stringify(newOptions.sortBy) !== JSON.stringify(options.sortBy) ||
        JSON.stringify(newOptions.sortDesc) !== JSON.stringify(options.sortDesc)

      if (hasChanged) {
        options.page = newOptions.page
        options.itemsPerPage = newOptions.itemsPerPage
        options.sortBy = Array.isArray(newOptions.sortBy) ? [...newOptions.sortBy] : []
        options.sortDesc = Array.isArray(newOptions.sortDesc) ? [...newOptions.sortDesc] : []

        fetchStudents()
      }
    }

    // Debounce para evitar muitas chamadas API enquanto digita
    const onSearch = () => {
      if (searchTimeout) clearTimeout(searchTimeout)
      searchTimeout = window.setTimeout(() => {
        options.page = 1
        fetchStudents()
      }, 500)
    }

    const editStudent = (student: Student) => {
      router.push({ path: '/studentForm', query: { id: student.id } })
    }

    const confirmDelete = (student: Student) => {
      studentToDelete.value = student
      dialog.value = true
    }

    const deleteStudent = async (student: Student | null) => {
      if (student) {
        try {
          const response = await api.delete(`/students/${student.id}`)
          if (response.status === 200) {
            feedbackTitle.value = 'Sucesso'
            feedbackMessage.value = `Aluno ${student.name} excluído com sucesso!`
            feedbackDialog.value = true
            fetchStudents()
          } else {
            feedbackTitle.value = 'Erro'
            feedbackMessage.value = `Falha ao excluir o aluno ${student.name}.`
            feedbackDialog.value = true
          }
        } catch (error) {
          console.error('Erro ao excluir aluno:', error)
          feedbackTitle.value = 'Erro'
          feedbackMessage.value = 'Erro ao tentar excluir o aluno.'
          feedbackDialog.value = true
        }
      }
      dialog.value = false
    }

    const goToRegisterPage = () => {
      router.push('/studentForm')
    }

    onMounted(() => {
      fetchStudents()
    })

    return {
      headers,
      students,
      editStudent,
      confirmDelete,
      deleteStudent,
      dialog,
      searchQuery,
      totalItems,
      onSearch,
      studentToDelete,
      goToRegisterPage,
      feedbackDialog,
      feedbackTitle,
      feedbackMessage,
      fetchStudents,
      onOptionsUpdate,
      loading,
      options,
    }
  },
}
</script>

<style scoped>
.content {
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: auto;
  width: 70vw;
}

.v-card-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-field {
  max-width: 400px;
  width: 100%;
  height: 32px;
  margin-left: 16px;
}


</style>
