import {HomeIcon} from '@sanity/icons/Home'
import {ImagesIcon} from '@sanity/icons/Images'
import {PinIcon} from '@sanity/icons/Pin'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const propertyType = defineType({
  name: 'property',
  title: 'Imóvel',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {name: 'main', title: 'Informações principais', default: true},
    {name: 'details', title: 'Ficha técnica'},
    {name: 'media', title: 'Fotos', icon: ImagesIcon},
    {name: 'location', title: 'Localização', icon: PinIcon},
    {name: 'publication', title: 'Publicação'},
  ],
  fields: [
    defineField({name: 'title', title: 'Nome do imóvel', type: 'string', group: 'main', validation: (Rule) => Rule.required().min(5)}),
    defineField({name: 'slug', title: 'Endereço do imóvel', type: 'slug', group: 'main', options: {source: 'title', maxLength: 80}, validation: (Rule) => Rule.required()}),
    defineField({name: 'code', title: 'Código', type: 'string', group: 'main', description: 'Exemplo: JA-001 · ALTO DO TURU', validation: (Rule) => Rule.required()}),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'main',
      options: {
        list: [
          {title: 'Pronta para morar', value: 'pronto'},
          {title: 'Lançamento', value: 'lancamento'},
          {title: 'Venda na planta', value: 'planta'},
          {title: 'Vendida', value: 'vendido'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'statusLabel', title: 'Texto exibido no status', type: 'string', group: 'main', description: 'Exemplo: Pronta para morar · com piscina', validation: (Rule) => Rule.required()}),
    defineField({name: 'description', title: 'Descrição completa', type: 'text', rows: 7, group: 'main', validation: (Rule) => Rule.required().min(40)}),
    defineField({name: 'price', title: 'Preço', type: 'string', group: 'main', description: 'Exemplo: R$ 530.000', validation: (Rule) => Rule.required()}),
    defineField({name: 'area', title: 'Área construída', type: 'string', group: 'details', description: 'Exemplo: 117,62 m²'}),
    defineField({name: 'rooms', title: 'Quartos ou suítes', type: 'string', group: 'details'}),
    defineField({name: 'bathrooms', title: 'Banheiros', type: 'string', group: 'details'}),
    defineField({name: 'garage', title: 'Garagem', type: 'string', group: 'details'}),
    defineField({name: 'year', title: 'Ano ou fase da obra', type: 'string', group: 'details'}),
    defineField({
      name: 'highlights',
      title: 'Diferenciais',
      type: 'array',
      group: 'details',
      of: [defineArrayMember({type: 'string'})],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'gallery',
      title: 'Galeria de ambientes',
      type: 'array',
      group: 'media',
      of: [
        defineArrayMember({
          name: 'propertyPhoto',
          title: 'Foto do imóvel',
          type: 'object',
          fields: [
            defineField({name: 'image', title: 'Imagem', type: 'image', options: {hotspot: true}, validation: (Rule) => Rule.required()}),
            defineField({
              name: 'area',
              title: 'Ambiente',
              type: 'string',
              options: {list: ['Fachada', 'Sala', 'Cozinha', 'Quartos', 'Banheiros', 'Área gourmet', 'Lazer', 'Piscina', 'Planta', 'Obra', 'Outros']},
              validation: (Rule) => Rule.required(),
            }),
            defineField({name: 'label', title: 'Legenda', type: 'string', validation: (Rule) => Rule.required()}),
          ],
          preview: {select: {title: 'label', subtitle: 'area', media: 'image'}},
        }),
      ],
      options: {layout: 'grid'},
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({name: 'location', title: 'Localização exibida', type: 'string', group: 'location', validation: (Rule) => Rule.required()}),
    defineField({name: 'mapQuery', title: 'Endereço para o mapa', type: 'string', group: 'location', description: 'Informe rua, número, bairro, cidade e estado.'}),
    defineField({name: 'featured', title: 'Exibir em destaque na página inicial', type: 'boolean', group: 'publication', initialValue: false}),
    defineField({name: 'published', title: 'Imóvel visível no site', type: 'boolean', group: 'publication', initialValue: true}),
    defineField({name: 'order', title: 'Ordem de exibição', type: 'number', group: 'publication', initialValue: 100, validation: (Rule) => Rule.integer().min(0)}),
  ],
  orderings: [
    {title: 'Ordem do site', name: 'siteOrder', by: [{field: 'order', direction: 'asc'}]},
    {title: 'Mais recentes', name: 'createdAtDesc', by: [{field: '_createdAt', direction: 'desc'}]},
  ],
  preview: {
    select: {title: 'title', status: 'statusLabel', price: 'price', media: 'gallery.0.image'},
    prepare({title, status, price, media}) {
      return {title, subtitle: [status, price].filter(Boolean).join(' · '), media}
    },
  },
})
