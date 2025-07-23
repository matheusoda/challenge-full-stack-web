// src/views/StudentsList.vue
<template>
  <v-container class="content">
    <v-card>
      <v-card-title>
        <span>
          Lista de Alunos
        </span>
        <v-text-field
          v-model="searchQuery"
          label="Pesquisar"
          variant="outlined"
          class="search-field"
          density="compact"
          clearable
          hide-details
        />
        <v-btn @click="goToRegisterPage"> Cadastrar Aluno </v-btn>
      </v-card-title>

      <v-data-table :headers="headers" :items="filteredStudents" item-key="ra" class="elevation-1">
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn prepend-icon="mdi-pencil" variant="text" @click="editStudent(item)">Editar</v-btn>
          <v-btn prepend-icon="mdi-delete" variant="text" color="red" @click="confirmDelete(item)"
            >Excluir</v-btn
          >
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" persistent max-width="400px">
      <v-card>
        <v-card-title class="headline">Confirmação</v-card-title>
        <v-card-text>
          Você tem certeza que deseja excluir o aluno {{ studentToDelete?.name }}?
        </v-card-text>
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
import { ref, onMounted, computed } from 'vue'
import api from '@/plugins/axios'
import { useRouter } from 'vue-router'

interface Student {
  name: string
  ra: string
  cpf: string
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
    const searchQuery = ref('')
    const dialog = ref(false)
    const studentToDelete = ref<Student | null>(null)

    const feedbackDialog = ref(false)
    const feedbackTitle = ref('')
    const feedbackMessage = ref('')

    const fetchStudents = async () => {
      try {
        const response = await api.get('/students')
        students.value = response.data
      } catch (error) {
        console.error('Erro ao buscar alunos:', error)
        localStorage.removeItem('token')
      }
    }

    onMounted(() => {
      fetchStudents()
    })

    const filteredStudents = computed(() => {
      if (!searchQuery.value.trim()) return students.value
      return students.value.filter(student =>
        Object.values(student).some(value =>
          value.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
      )
    })

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

    return {
      headers,
      students,
      editStudent,
      confirmDelete,
      deleteStudent,
      dialog,
      searchQuery,
      filteredStudents,
      studentToDelete,
      goToRegisterPage,
      feedbackDialog,
      feedbackTitle,
      feedbackMessage,
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
