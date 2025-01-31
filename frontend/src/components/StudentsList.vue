// src/views/StudentsList.vue
<template>
  <v-container class="content">
    <v-card>
      <v-card-title>Lista de Alunos</v-card-title>
      <v-data-table :headers="headers" :items="students" item-key="ra" class="elevation-1">
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn prepend-icon="mdi-pencil" variant="text" @click="editStudent(item)">Editar</v-btn>
          <v-btn prepend-icon="mdi-delete" variant="text" color="red" @click="deleteStudent(item)"
            >Excluir</v-btn
          >
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

interface Student {
  name: string
  ra: string
  cpf: string
}

export default {
  setup() {
    const headers = ref([
      { title: 'Registro Acadêmico', value: 'ra' },
      { title: 'Nome', value: 'name' },
      { title: 'CPF', value: 'cpf' },
      { title: 'Ações', value: 'actions', sortable: false },
    ])
    const students = ref<Student[]>([])

    const fetchStudents = async () => {
      try {
        const token =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkZmIzNmIwNy02YTFmLTQzMTUtYjU0My1hYTAwZTFjNmY1MzAiLCJpYXQiOjE3MzgyODYxNTMsImV4cCI6MTczODI4OTc1M30._SnEt1dQfjFHsQdWQ45v4gULqqq1O1Y_mxnIa_J70AY'
        const response = await axios.get('http://localhost:3000/api/students', {
          headers: {
            Authorization: `Bearear ${token}`,
          },
        })
        students.value = response.data
      } catch (error) {
        console.error('Erro ao buscar alunos:', error)
      }
    }

    onMounted(() => {
      fetchStudents()
    })

    const editStudent = (student: Student) => {
      console.log('Editar', student)
    }
    const deleteStudent = (student: Student) => {
      console.log('Excluir', student)
    }

    return {
      headers,
      students,
      editStudent,
      deleteStudent,
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
</style>
