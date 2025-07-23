import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StudentForm from '@/components/StudentsForm.vue'
import { routes } from '@/router/index'
import { createRouter, createMemoryHistory } from 'vue-router'

import {
  VContainer,
  VCard,
  VCardTitle,
  VCardText,
  VCardActions,
  VBtn,
  VForm,
  VTextField,
  VDialog,
} from 'vuetify/components'
import { createVuetify } from 'vuetify'
import * as directives from 'vuetify/directives'

// Configura Vuetify com os componentes usados
const vuetify = createVuetify({
  components: {
    VContainer,
    VCard,
    VCardTitle,
    VCardText,
    VCardActions,
    VBtn,
    VForm,
    VTextField,
    VDialog,
  },
  directives,
})

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

describe('StudentForm.vue', () => {
  test('exibe o formulário corretamente', async () => {
    router.push('/studentForm')
    await router.isReady()

    const wrapper = mount(StudentForm, {
      global: {
        plugins: [vuetify, router],
      },
    })

    // Verifica se o título está visível
    expect(wrapper.text()).toContain('Cadastro de Alunos')

    // Verifica se os campos estão presentes
    expect(wrapper.find('[data-teste="name"]').exists()).toBe(true)
    expect(wrapper.find('[data-teste="email"]').exists()).toBe(true)
    expect(wrapper.find('[data-teste="ra"]').exists()).toBe(true)
    expect(wrapper.find('[data-teste="cpf"]').exists()).toBe(true)

    // Verifica se o botão de salvar está visível
    expect(wrapper.find('[data-teste="save-button"]').exists()).toBe(true)
  })
})
