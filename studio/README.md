# Painel administrativo Jastelo

Este diretório contém o Sanity Studio usado para administrar os imóveis do site. Ele deve ser publicado como um projeto Vercel separado, apontando o **Root Directory** para `studio`.

O projeto Sanity conectado é `99xajzxf`, com o dataset `production`.

## Variáveis necessárias

- `SANITY_STUDIO_PROJECT_ID`: identificador do projeto criado em sanity.io/manage.
- `SANITY_STUDIO_DATASET`: use `production`.

## Segurança

O painel usa a autenticação e as permissões de projeto do Sanity. Somente membros convidados no projeto podem entrar e publicar. Não coloque tokens administrativos no código ou no GitHub.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Publicação na Vercel

1. Importe novamente o mesmo repositório como um novo projeto.
2. Defina `studio` como Root Directory.
3. Cadastre as duas variáveis de ambiente.
4. Faça o deploy.
5. Adicione o domínio do painel aos CORS Origins do projeto Sanity com credenciais habilitadas.

## Primeiro acesso

Abra **Importar imóveis atuais** no menu do Studio e clique no botão de importação. O processo envia as imagens e cria os seis imóveis existentes usando a sessão autenticada do editor, sem expor tokens no código.
