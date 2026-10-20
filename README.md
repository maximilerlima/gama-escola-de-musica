# Gama Escola de Música

Site estático da Gama Escola de Música, no Grajaú, Rio de Janeiro.

**Produção:** https://gamaescolademusica.com.br/

## Editar e publicar

- O HTML da home está em index.html.
- As páginas internas ficam em diretórios com index.html, por exemplo aulas-de-piano/index.html.
- Títulos, descrições, URLs públicas e imagem social são centralizados em seo.json.
- styles.css mantém o design da home e os estilos adicionais das páginas internas.
- script.js mantém carrosséis, animações, modais e agendamento da home.
- seo-page.js cuida do menu das páginas internas.
- CNAME preserva o domínio próprio. Não altere sem planejar a mudança de domínio.

Execute, a partir da raiz:

    python3 scripts/build.py --out site

O build gera HTML por rota, aplica os metadados de seo.json, copia os arquivos públicos e gera site/sitemap.xml. Ao criar uma página, registre sua rota e metadados em seo.json; o sitemap será atualizado no próximo build. Não há React, dependência npm ou renderização client-side necessária para o conteúdo das páginas.

A Action .github/workflows/deploy-pages.yml executa o build e publica site/ no GitHub Pages a cada atualização da main. site/, qa/ e .openai/ locais são artefatos de desenvolvimento; não são fontes a enviar para a branch.

## Agendamento e mensuração

O formulário continua preparando uma mensagem para o WhatsApp (21) 99770-7609. As páginas de curso usam, por exemplo, /?curso=Piano#contato para abrir o formulário com o instrumento selecionado. O visitante precisa enviar a mensagem no WhatsApp; uma aula não é confirmada pelo site.

Os hooks de eventos estão preparados, mas não há biblioteca do GA4 nem Measurement ID configurado. Não inclua dados pessoais nos eventos. submit_agendamento representa o encaminhamento do formulário ao WhatsApp, e não uma aula confirmada. Antes de ativar mensuração, definir a integração e o tratamento adequado de consentimento.

As fotos ilustrativas da equipe e os espaços de depoimentos continuam identificados. Substituí-los exige conteúdo real aprovado pela escola.

Leia [SEO-IMPLEMENTACAO.md](SEO-IMPLEMENTACAO.md) para o relatório, verificações e ações externas.
