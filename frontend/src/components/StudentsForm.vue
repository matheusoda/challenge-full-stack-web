<template>
  <v-container class="content">
    <v-card>
      <v-card-title>Cadastro de Alunos</v-card-title>
      <v-form @submit.prevent="submitForm" style="padding: 0 1rem 1rem 1rem">
        <v-text-field
          v-model="name"
          data-teste="name"
          label="Nome"
          placeholder="Informe o nome completo"
          :error-messages="errors.name"
          required
        />

        <v-text-field
          v-model="email"
          data-teste="email"
          label="E-mail"
          placeholder="Informe apenas um e-mail"
          type="email"
          :error-messages="errors.email"
          required
        />

        <v-text-field
          v-model="ra"
          data-teste="ra"
          label="RA"
          placeholder="Informe o registro acadêmico"
          :error-messages="errors.ra"
          required
          :readonly="isEditing"
        />

        <v-text-field
          v-model="rawCpf"
          :value="cpf"
          data-teste="cpf"
          label="CPF"
          placeholder="Informe o número do documento"
          :error-messages="errors.cpf"
          required
        />

        <v-btn color="primary" type="submit" data-teste="save-button">Salvar</v-btn>
        <v-btn color="secondary" @click="goBack" style="margin-left:1rem">Voltar</v-btn>
      </v-form>
    </v-card>

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
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/plugins/axios'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()

    const { handleSubmit, errors, setValues } = useForm({
      validationSchema: yup.object({
        name: yup.string().required('Nome é obrigatório'),
        email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
        ra: yup.string().required('RA é obrigatório'),
        cpf: yup
          .string()
          .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido')
          .required('CPF é obrigatório'),
      }),
    })

    const { value: name } = useField('name')
    const { value: email } = useField('email')
    const { value: ra } = useField('ra')
    const { value: cpf } = useField('cpf')

    const rawCpf = ref('')

    watch(rawCpf, (val) => {
      const onlyNumbers = val.replace(/\D/g, '')
      let masked = onlyNumbers
      if (onlyNumbers.length > 3) {
        masked = masked.replace(/^(\d{3})(\d)/, '$1.$2')
      }
      if (onlyNumbers.length > 6) {
        masked = masked.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
      }
      if (onlyNumbers.length > 9) {
        masked = masked.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4')
      }
      cpf.value = masked
    })

    const isEditing = ref(false)
    const feedbackDialog = ref(false)
    const feedbackTitle = ref('')
    const feedbackMessage = ref('')

    const fetchStudent = async (id: string) => {
      try {
        const response = await api.get(`/students/${id}`)
        setValues(response.data)
        rawCpf.value = response.data.cpf
        isEditing.value = true
      } catch (error) {
        console.error('Erro ao buscar aluno:', error)
        localStorage.removeItem('token')
      }
    }

    onMounted(() => {
      const id = route.query.id as string
      if (id) {
        fetchStudent(id)
      }
    })

    const goBack = () => {
      router.back()
    }

    const submitForm = handleSubmit(
      async () => {
        let response
        try {
          const studentData = {
            name: name.value,
            email: email.value,
            ra: ra.value,
            cpf: cpf.value,
          }
          if (isEditing.value) {
            const id = route.query.id as string
            response = await api.put(`/students/${id}`, studentData)
            feedbackTitle.value = 'Aluno Atualizado'
            feedbackMessage.value = 'Os dados do aluno foram atualizados com sucesso!'
          } else {
            response = await api.post('/students', studentData)
            feedbackTitle.value = 'Aluno Cadastrado'
            feedbackMessage.value = 'O aluno foi cadastrado com sucesso!'
          }
          if (response && (response.status === 200 || response.status === 201)) {
            feedbackDialog.value = true
          } else {
            throw new Error('Erro ao processar a requisição')
          }
        } catch (error) {
          console.error('Erro ao salvar aluno:', error)
          feedbackTitle.value = 'Erro'
          feedbackMessage.value = 'Ocorreu um erro ao tentar salvar aluno.'
          feedbackDialog.value = true
        }
      },
      (error) => {
        console.log('Erro de validação:', error)
        return false
      }
    )

    const closeModal = () => {
      feedbackDialog.value = false
      router.push('/')
      window.location.reload()
    }

    watch(feedbackDialog, (newValue) => {
      if (!newValue) {
        router.push('/')
      }
    })

    return {
      goBack,
      submitForm,
      fetchStudent,
      isEditing,
      feedbackDialog,
      feedbackTitle,
      feedbackMessage,
      closeModal,
      errors,
      name,
      email,
      ra,
      cpf,
      rawCpf,
    }
  },
}
</script>

<style scoped>
.content {
  flex-grow: 1;
  overflow-y: auto;
  width: 70vw;
}
</style>
