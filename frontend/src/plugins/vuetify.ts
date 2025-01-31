// src/plugins/vuetify.ts
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import { VBtn, VCard, VCardSubtitle, VCardTitle, VContainer, VDataTable } from 'vuetify/components'

export default createVuetify({
  components: {
    VDataTable,
    VBtn,
    VContainer,
    VCard,
    VCardTitle,
    VCardSubtitle,
  },
})
