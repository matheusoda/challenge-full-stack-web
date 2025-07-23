// src/views/Login.vue
<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-card class="pa-5" max-width="600" min-width="400">
      <v-card-title class="text-center text-h5"> Login </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="login">
          <v-text-field
            v-model="email"
            data-teste="email"
            label="E-mail"
            type="email"
            required
            prepend-icon="mdi-email"
          />
          <v-text-field
            v-model="password"
            data-teste="password"
            label="Senha"
            type="password"
            required
            prepend-icon="mdi-lock"
          />

          <v-alert v-if="error" type="error" class="mt-2">{{ error }}</v-alert>

          <v-btn color="primary" block class="mt-4" type="submit" :loading="loading">
            Entrar
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/plugins/axios'
import { useAuthStore } from '@/stores/auth'

export default {
  setup() {
    const email = ref('')
    const password = ref('')
    const loading = ref(false)
    const error = ref<string | null>(null)
    const router = useRouter()
    const authStore = useAuthStore()

    const login = async () => {
      loading.value = true
      error.value = null

      try {
        const response = await api.post('/login', {
          email: email.value,
          password: password.value,
        })

        const token = await response.data.data.token
        authStore.setToken(token)

        router.push('/studentList')
      } catch (err) {
        console.error('Erro no login:', err)
        error.value = 'E-mail ou senha inválidos'
      } finally {
        loading.value = false
      }
    }

    return {
      login,
      password,
      email,
      loading,
      error,
    }
  },
}
</script>
