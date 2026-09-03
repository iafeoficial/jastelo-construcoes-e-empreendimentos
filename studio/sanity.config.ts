import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {HomeIcon} from '@sanity/icons'
import {schemaTypes} from './schemaTypes'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

if (!projectId) {
  throw new Error('Defina SANITY_STUDIO_PROJECT_ID para conectar o painel da Jastelo.')
}

export default defineConfig({
  name: 'jastelo',
  title: 'Jastelo — Administração de Imóveis',
  projectId,
  dataset,
  icon: HomeIcon,
  plugins: [
    structureTool({
      title: 'Conteúdo do site',
      structure: (S) =>
        S.list()
          .title('Jastelo')
          .items([
            S.listItem()
              .title('Imóveis')
              .icon(HomeIcon)
              .child(S.documentTypeList('property').title('Imóveis')),
          ]),
    }),
    visionTool(),
  ],
  schema: {types: schemaTypes},
})
