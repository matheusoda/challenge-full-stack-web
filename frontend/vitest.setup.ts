import { vi } from 'vitest'
import { beforeAll, afterAll } from 'vitest'

// Mock global de arquivos CSS importados por Vuetify
vi.mock('vuetify/lib/components/VCode/VCode.css', () => ({}))
// Caso queira ignorar todos CSS (recomendado para testes):
vi.stubGlobal('CSS', {})

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
})

afterAll(() => {
  delete (global as unknown as Record<string, unknown>).ResizeObserver
})
