import {useState} from 'react'
import {Button, Card, Container, Flex, Heading, Stack, Text} from '@sanity/ui'
import {useClient} from 'sanity'
import {getInitialAssetUrl, initialProperties} from './initialProperties'

type ImportState = 'idle' | 'working' | 'done' | 'error'

export function InitialDataTool() {
  const client = useClient({apiVersion: '2026-09-03'})
  const [state, setState] = useState<ImportState>('idle')
  const [message, setMessage] = useState('')

  const importProperties = async () => {
    if (!window.confirm('Importar os seis imóveis atuais? Registros já importados serão atualizados.')) return
    setState('working')
    setMessage('Preparando as imagens…')

    try {
      const assets = new Map<string, string>()
      const uniqueImages = [...new Set(initialProperties.flatMap((property) => property.gallery.map((photo) => photo.source)))]

      for (let index = 0; index < uniqueImages.length; index += 1) {
        const filename = uniqueImages[index]
        setMessage(`Enviando imagem ${index + 1} de ${uniqueImages.length}…`)
        const response = await fetch(getInitialAssetUrl(filename))
        if (!response.ok) throw new Error(`Não foi possível carregar ${filename}.`)
        const blob = await response.blob()
        const asset = await client.assets.upload('image', blob, {filename})
        assets.set(filename, asset._id)
      }

      for (let index = 0; index < initialProperties.length; index += 1) {
        const property = initialProperties[index]
        setMessage(`Cadastrando imóvel ${index + 1} de ${initialProperties.length}…`)
        await client.createOrReplace({
          _id: property.id,
          _type: 'property',
          title: property.title,
          slug: {_type: 'slug', current: property.slug},
          code: property.code,
          status: property.status,
          statusLabel: property.statusLabel,
          description: property.description,
          price: property.price,
          area: property.area,
          rooms: property.rooms,
          bathrooms: property.bathrooms,
          garage: property.garage,
          year: property.year,
          highlights: property.highlights,
          location: property.location,
          mapQuery: property.mapQuery,
          featured: property.featured,
          published: true,
          order: property.order,
          gallery: property.gallery.map((photo, photoIndex) => ({
            _key: `${property.slug}-${photoIndex + 1}`,
            _type: 'propertyPhoto',
            area: photo.area,
            label: photo.label,
            image: {
              _type: 'image',
              asset: {_type: 'reference', _ref: assets.get(photo.source)!},
            },
          })),
        })
      }

      setState('done')
      setMessage('Os seis imóveis e suas fotos foram importados. Abra “Imóveis” para revisar e editar.')
    } catch (error) {
      console.error(error)
      setState('error')
      setMessage(error instanceof Error ? error.message : 'Ocorreu um erro durante a importação.')
    }
  }

  return (
    <Card height="fill" padding={5} tone="transparent">
      <Container width={1}>
        <Stack space={5}>
          <Stack space={3}>
            <Text size={1} muted>CONFIGURAÇÃO INICIAL</Text>
            <Heading size={3}>Trazer os imóveis que já estão no site</Heading>
            <Text size={2} muted>
              Este processo cadastra os seis imóveis atuais e envia suas fotos para a biblioteca do Sanity. Depois disso, tudo poderá ser atualizado pelo menu Imóveis.
            </Text>
          </Stack>
          <Card border padding={4} radius={2} tone={state === 'error' ? 'critical' : state === 'done' ? 'positive' : 'default'}>
            <Stack space={4}>
              <Text size={2}>{message || 'A importação deve ser executada apenas uma vez.'}</Text>
              <Flex>
                <Button
                  text={state === 'working' ? 'Importando…' : state === 'done' ? 'Importar novamente' : 'Importar imóveis atuais'}
                  tone="primary"
                  disabled={state === 'working'}
                  onClick={importProperties}
                />
              </Flex>
            </Stack>
          </Card>
        </Stack>
      </Container>
    </Card>
  )
}
