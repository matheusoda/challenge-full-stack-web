import { mount } from '@vue/test-utils'
import Login from '@/views/LoginView.vue'
import { describe, it, expect, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({ components, directives })

const push = vi.fn()

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push,
  }),
}))

vi.mock('@/plugins/axios', () => ({
  default: {
    post: vi.fn(() =>
      Promise.resolve({
        data: {
          data: {
            token: 'fake-token',
          },
        },
      }),
    ),
  },
}))

describe('Login.vue', () => {
  it('realiza login com sucesso e navega para studentList', async () => {
    const wrapper = mount(Login, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn }), vuetify],
      },
    })

    await wrapper.find('[data-teste="email"] input').setValue('usuario@teste.com')
    await wrapper.find('[data-teste="password"] input').setValue('123456')

    await wrapper.find('form').trigger('submit.prevent')

    expect(push).toHaveBeenCalledWith('/studentList')
  })
})
