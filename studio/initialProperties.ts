export type InitialProperty = {
  id: string
  slug: string
  code: string
  title: string
  status: 'pronto' | 'lancamento' | 'planta' | 'vendido'
  statusLabel: string
  area: string
  rooms: string
  bathrooms: string
  garage: string
  year: string
  price: string
  location: string
  mapQuery: string
  description: string
  highlights: string[]
  featured: boolean
  order: number
  gallery: Array<{source: string; area: string; label: string}>
}

const ASSET_BASE = 'https://raw.githubusercontent.com/iafeoficial/jastelo-construcoes-e-empreendimentos/main/assets/'

export const initialProperties: InitialProperty[] = [
  {
    id: 'property.turu', slug: 'turu', code: 'JA-001 · ALTO DO TURU', title: 'Residência Térrea Alto do Turu',
    status: 'pronto', statusLabel: 'Pronta para morar', area: '117,62 m²', rooms: '3 quartos', bathrooms: '3 banheiros', garage: '2 vagas', year: '2024', price: 'R$ 530.000',
    location: 'Alto do Turu, São José de Ribamar — MA', mapQuery: 'R. 19, 10, Novo Cohatrac, São José de Ribamar, MA', featured: true, order: 1,
    description: 'Projetada com traços retos e volumes marcantes, esta residência combina integração, funcionalidade e sofisticação. Os ambientes foram planejados para oferecer conforto no dia a dia, iluminação natural e uma relação agradável entre o interior e a área de lazer.',
    highlights: ['Piscina privativa', 'Área gourmet com churrasqueira', 'Jardim de inverno', 'Sala de estar integrada', 'Arquitetura contemporânea', 'Acabamento de alto padrão'],
    gallery: [
      {source: 'jastelo-40.png', area: 'Fachada', label: 'Fachada e piscina'},
      {source: 'jastelo-38.png', area: 'Sala', label: 'Ambientes internos integrados'},
      {source: 'jastelo-36.png', area: 'Piscina', label: 'Área gourmet e piscina'},
    ],
  },
  {
    id: 'property.turu-sem-piscina', slug: 'turu-sem-piscina', code: 'JA-002 · ALTO DO TURU', title: 'Residência Térrea Alto do Turu',
    status: 'pronto', statusLabel: 'Pronta para morar · sem piscina', area: '117,62 m²', rooms: '3 quartos', bathrooms: '3 banheiros', garage: '2 vagas', year: '2024', price: 'R$ 500.000',
    location: 'Alto do Turu, São José de Ribamar — MA', mapQuery: 'R. 19, 10, Novo Cohatrac, São José de Ribamar, MA', featured: true, order: 2,
    description: 'Uma casa térrea contemporânea para quem valoriza espaços integrados, praticidade e elegância. A planta aproveita cada metro quadrado com circulação fluida, ambientes bem iluminados e acabamento cuidadosamente selecionado.',
    highlights: ['Jardim de inverno', 'Área gourmet com churrasqueira', 'Sala de estar integrada', 'Cozinha funcional', 'Arquitetura contemporânea', 'Garagem para 2 veículos'],
    gallery: [
      {source: 'jastelo-28.png', area: 'Fachada', label: 'Fachada principal'},
      {source: 'jastelo-38.png', area: 'Sala', label: 'Ambientes internos integrados'},
      {source: 'jastelo-12.png', area: 'Área gourmet', label: 'Área gourmet'},
    ],
  },
  {
    id: 'property.aracagy', slug: 'aracagy', code: 'JA-003 · ARAÇAGY', title: 'Residência Térrea Araçagy',
    status: 'lancamento', statusLabel: 'Lançamento', area: '156,67 m²', rooms: '4 suítes', bathrooms: '5 banheiros', garage: '2 vagas', year: 'Em construção', price: 'R$ 999.000',
    location: 'Araçagy, São José de Ribamar — MA', mapQuery: 'Araçagy, São José de Ribamar, MA', featured: true, order: 3,
    description: 'Com estilo contemporâneo marcado por linhas retas, volumes imponentes e integração total dos ambientes, esta residência reúne sofisticação, funcionalidade e alto padrão construtivo em uma localização valorizada.',
    highlights: ['4 suítes', 'Piscina privativa', 'Varanda coberta', 'Área gourmet', 'Pé-direito alto', 'Ambientes integrados'],
    gallery: [
      {source: 'aracagy-lancamento-capa.jpg', area: 'Fachada', label: 'Fachada do lançamento'},
      {source: 'aracagy-lazer.jpg', area: 'Lazer', label: 'Deck integrado à área de lazer'},
      {source: 'aracagy-planta.jpg', area: 'Planta', label: 'Planta do empreendimento'},
    ],
  },
  {
    id: 'property.planta-sem-piscina', slug: 'planta-sem-piscina', code: 'JA-004 · ALTO DO TURU', title: 'Residência Alto do Turu na planta',
    status: 'planta', statusLabel: 'Venda na planta · sem piscina', area: '117,62 m²', rooms: '3 quartos', bathrooms: '3 banheiros', garage: '2 vagas', year: 'Projeto em lançamento', price: 'R$ 500.000',
    location: 'Alto do Turu, São José de Ribamar — MA', mapQuery: 'Alto do Turu, São José de Ribamar, MA', featured: false, order: 4,
    description: 'Um projeto térreo contemporâneo para comprar ainda na planta, com distribuição inteligente e o padrão de acabamento Jastelo. Uma oportunidade para acompanhar a evolução da obra e preparar o novo lar com antecedência.',
    highlights: ['Compra na planta', '3 quartos', 'Jardim de inverno', 'Área gourmet', 'Sala integrada', '2 vagas de garagem'],
    gallery: [
      {source: 'alto-turu-planta-sem-piscina.jpg', area: 'Fachada', label: 'Perspectiva da fachada'},
      {source: 'jastelo-28.png', area: 'Fachada', label: 'Referência da fachada construída'},
      {source: 'jastelo-38.png', area: 'Sala', label: 'Referência dos ambientes internos'},
    ],
  },
  {
    id: 'property.planta-com-piscina', slug: 'planta-com-piscina', code: 'JA-005 · ALTO DO TURU', title: 'Residência Alto do Turu na planta',
    status: 'planta', statusLabel: 'Venda na planta · com piscina', area: '117,62 m²', rooms: '3 quartos', bathrooms: '3 banheiros', garage: '2 vagas', year: 'Projeto em lançamento', price: 'R$ 530.000',
    location: 'Alto do Turu, São José de Ribamar — MA', mapQuery: 'Alto do Turu, São José de Ribamar, MA', featured: false, order: 5,
    description: 'A versão com piscina combina o projeto térreo funcional da Jastelo com uma área externa preparada para receber, descansar e viver bons momentos. Disponível para aquisição ainda na planta.',
    highlights: ['Compra na planta', 'Piscina privativa', '3 quartos', 'Jardim de inverno', 'Área gourmet', '2 vagas de garagem'],
    gallery: [
      {source: 'alto-turu-planta-com-piscina.jpg', area: 'Fachada', label: 'Perspectiva da fachada'},
      {source: 'jastelo-40.png', area: 'Piscina', label: 'Referência da piscina privativa'},
      {source: 'jastelo-36.png', area: 'Área gourmet', label: 'Referência da área gourmet'},
    ],
  },
  {
    id: 'property.duplex', slug: 'duplex', code: 'PORTFÓLIO · ARAÇAGY PRAIA AZUL', title: 'Duplex Araçagy Praia Azul',
    status: 'vendido', statusLabel: 'Todas as unidades vendidas', area: 'Casa duplex', rooms: '4 suítes', bathrooms: 'Alto padrão', garage: 'Garagem ampla', year: 'Concluído', price: 'R$ 899.000',
    location: 'Araçagy Praia Azul — MA', mapQuery: 'Praia do Araçagy, São José de Ribamar, MA', featured: false, order: 6,
    description: 'Com fachada imponente, linhas retas e volumetria marcante, este empreendimento residencial expressa o equilíbrio entre funcionalidade e alto padrão que orienta os projetos da Jastelo. Todas as unidades foram comercializadas.',
    highlights: ['Empreendimento concluído', '4 suítes', 'Casa duplex', 'Garagem ampla', 'Fachada contemporânea', 'Todas as unidades vendidas'],
    gallery: [
      {source: 'jastelo-03.png', area: 'Fachada', label: 'Fachada do duplex'},
      {source: 'jastelo-15.png', area: 'Fachada', label: 'Conjunto residencial concluído'},
      {source: 'jastelo-18.jpg', area: 'Obra', label: 'Execução do empreendimento'},
      {source: 'jastelo-25.jpg', area: 'Obra', label: 'Etapa construtiva'},
    ],
  },
]

export const getInitialAssetUrl = (filename: string) => `${ASSET_BASE}${encodeURIComponent(filename)}`
