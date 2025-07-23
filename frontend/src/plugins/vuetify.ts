// src/plugins/vuetify.ts
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

import 'vuetify/styles'
import {
  VAlert,
  VApp,
  VAppBar,
  VBtn,
  VCard,
  VCardActions,
  VCardSubtitle,
  VCardText,
  VCardTitle,
  VContainer,
  VDataTable,
  VDataTableServer,
  VDialog,
  VForm,
  VNavigationDrawer,
  VTextField,
} from 'vuetify/components'

export default createVuetify({
  components: {
    VDataTable,
    VDataTableServer,
    VBtn,
    VContainer,
    VCard,
    VCardTitle,
    VCardActions,
    VCardSubtitle,
    VApp,
    VNavigationDrawer,
    VAppBar,
    VTextField,
    VForm,
    VAlert,
    VCardText,
    VDialog,
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'light', // ou 'dark' para tema escuro
    themes: {
      light: {
        dark: false,
        colors: {
          background: '#FFFFFF', // Cor de fundo clara
          surface: '#FFFFFF', // Cor do fundo do cartão e outros componentes
          primary: '#1976D2', // Cor primária (pode ser ajustada conforme sua preferência)
          secondary: '#424242', // Cor secundária
          accent: '#82B1FF', // Cor de destaque
          error: '#FF5252', // Cor de erro
          info: '#2196F3', // Cor de informação
          success: '#4CAF50', // Cor de sucesso
          warning: '#FF9800', // Cor de alerta
        },
      },
    },
  },
})
