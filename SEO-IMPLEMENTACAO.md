# Implementação de SEO — Gama Escola de Música

Data: 20/10/2026. Repositório: maximilerlima/gama-escola-de-musica. Domínio canônico: https://gamaescolademusica.com.br/.

## A. Auditoria e alterações

A versão inspecionada era HTML, CSS e JavaScript estáticos, sem framework ou sistema de build. A Action copiava somente a home, CSS, JS e imagens. O site estava acessível no domínio próprio, mas o canonical e o JSON-LD ainda apontavam para maximilerlima.github.io/gama-escola-de-musica/. Não havia robots.txt, sitemap ou páginas internas no repositório.

Foram implementados:

- Metadados locais e sociais centralizados em seo.json, aplicados por scripts/build.py.
- Canonical específico por URL, robots index,follow, Open Graph e Twitter Card no HTML inicial.
- robots.txt público e sitemap XML gerado a partir das rotas publicadas, sem datas artificiais de alteração.
- Catálogo e sete páginas de cursos, cada uma com apresentação, conteúdo próprio, perguntas e respostas, contato, breadcrumbs e cursos relacionados.
- Cards da home entregues no HTML inicial, com links reais para as páginas. A prévia em modal e seu botão de agendamento foram preservados.
- Seção local visível, FAQ com os cursos informados, CEP, público e informação sobre a aula experimental gratuita.
- Correção da opção de piano no formulário; inclusão dos demais instrumentos e atividades informados.
- Entrada nas páginas de curso para o formulário existente com o instrumento selecionado.
- Mensagem de WhatsApp com aula gratuita e consulta de disponibilidade, preparada somente após submissão do formulário.
- Hooks de eventos sem biblioteca de Analytics e sem envio de dados pessoais.
- Workflow existente preservado, com substituição da cópia fixa pelo build estático. CNAME incluído no artefato, sem alteração de conteúdo.

Arquivos principais: index.html, styles.css, script.js, seo-page.js, seo.json, robots.txt, scripts/build.py, .github/workflows/deploy-pages.yml, páginas internas e documentação.

## B. URLs do artefato publicado

- https://gamaescolademusica.com.br/
- https://gamaescolademusica.com.br/cursos/
- https://gamaescolademusica.com.br/aulas-de-piano/
- https://gamaescolademusica.com.br/aulas-de-violao/
- https://gamaescolademusica.com.br/aulas-de-guitarra/
- https://gamaescolademusica.com.br/aulas-de-canto/
- https://gamaescolademusica.com.br/aulas-de-bateria/
- https://gamaescolademusica.com.br/aulas-de-teclado/
- https://gamaescolademusica.com.br/musicalizacao-infantil/

O catálogo também lista baixo elétrico, violino, ukulele, cavaquinho, trompete, saxofone, teoria musical e prática de banda, com contato para consulta. Não foram criadas páginas repetidas ou vazias para esses cursos nem páginas artificiais por bairro.

## C. SEO técnico e local

A home tem o título “Escola de Música no Grajaú, RJ | Gama Escola de Música”. Cada rota tem título e descrição exclusivos, canonical absoluto com barra final, um H1, navegação real e HTML relevante antes da execução de JavaScript.

O JSON-LD usa os tipos Schema.org School e LocalBusiness, no lugar do tipo anterior MusicSchool, com identificador estável, nome, domínio, telefone, endereço/CEP, imagem da fachada, Instagram e link de Maps existente. As páginas internas incluem BreadcrumbList. Não foram adicionados avaliações, estrelas, horários, preços ou coordenadas sem confirmação. Não foi usado CourseInstance sem os dados necessários.

O Maps mantém a busca/rota já associada ao endereço do site. O proprietário deve fornecer o link exato do Perfil da Empresa para substituir a busca por um vínculo inequívoco ao estabelecimento, se desejado.

Referências de vocabulário e validação:

- https://schema.org/School
- https://schema.org/LocalBusiness
- https://developers.google.com/search/docs/appearance/structured-data/local-business
- https://search.google.com/test/rich-results
- https://validator.schema.org/

## D. Performance e imagens

As 63 imagens existentes foram preservadas byte a byte. A home mantém imagens WebP responsivas, dimensões, lazy loading e prioridade do hero. Foi acrescentada somente uma versão técnica de compartilhamento, recortada da imagem já existente do hero, em WebP de 1200 × 630 (102.680 bytes). Nenhuma cena ou fotografia nova foi gerada.

As páginas internas usam as variantes 480/960/alta resolução existentes, dimensões explícitas e conteúdo estático. O JavaScript adicional trata somente navegação e hooks de eventos; não foi introduzido framework.

Não foram executados Lighthouse ou PageSpeed Insights nem obtidos dados de campo p75. Não há pontuações ou valores de LCP, INP e CLS reivindicados nesta entrega. A avaliação real deve ser feita no domínio publicado e acompanhada no Search Console/CrUX quando houver amostra.

## E. Verificação executada

- Build de produção com Python 3: passou, com nove páginas HTML.
- Sintaxe de script.js e seo-page.js por node --check: passou.
- Validação estática das nove páginas: títulos/descrições únicos, canonical, robots, um H1, conteúdo principal, IDs, JSON-LD, links, fragmentos, imagens e srcsets: sem falhas encontradas.
- Sitemap XML: nove URLs, todas correspondentes às rotas canônicas do build.
- CNAME do artefato: idêntico ao arquivo de origem.
- Prévia no navegador: nove rotas abertas diretamente e atualizadas, com título e H1 corretos.
- Revisão responsiva de home, catálogo e piano em viewports de iframe de 1280, 768 e 390 px: sem rolagem horizontal; revisão visual e menu mobile funcionando.
- CTA da página de piano: abriu o formulário atual com Piano selecionado.
- Prévia de curso em modal: abriu e encaminhou para o agendamento com Piano selecionado.
- Mensagem de WhatsApp: teste isolado da submissão confirmou destino, texto da aula gratuita, instrumento, necessidade de ação do visitante e ausência de dados pessoais nos parâmetros de Analytics. Nenhuma mensagem real foi enviada.
- Console da prévia: não foram observados erros originados pelo código do site. Havia mensagens da extensão do navegador de QA, externas ao projeto.

A tentativa de instalar um navegador headless local recebeu um arquivo de download inválido; a revisão visual foi realizada pela prévia supervisionada do Sites. Rich Results Test e Schema Markup Validator não foram executados remotamente; o JSON foi validado sintaticamente e os tipos foram ajustados ao vocabulário oficial.

## F. Pendências externas

1. **Search Console:** adicionar a propriedade de domínio gamaescolademusica.com.br, copiar o TXT fornecido pelo Google para o provedor DNS e concluir a verificação. Nenhum código foi inventado ou inserido.
2. Enviar https://gamaescolademusica.com.br/sitemap.xml. Inspecionar a home e as páginas prioritárias e solicitar indexação quando apropriado. Monitorar os relatórios de páginas e desempenho.
3. **Perfil da Empresa:** conferir nome, endereço, telefone, domínio, categoria e horários; cadastrar cursos reais; usar fotos reais atualizadas; pedir avaliações espontâneas e responder aos alunos. O perfil não foi alterado.
4. Confirmar o link exato do perfil no Maps, horários e coordenadas antes de acrescentá-los ao schema.
5. **GA4:** fornecer Measurement ID e definir consentimento/privacidade antes de ativar coleta. Não há rastreamento externo novo ativo.
6. Executar os validadores oficiais de dados estruturados e PageSpeed no site publicado.
7. Conferir no provedor/GitHub as variantes HTTP e www. O domínio HTTPS principal foi observado funcionando antes das alterações. Não foram alterados DNS, regras de CDN ou configuração de redirecionamento. GitHub Pages não permite regras arbitrárias de redirecionamento por arquivo; canonical não substitui redirecionamento HTTP.

Indexação e posição de busca dependem de rastreamento e avaliação do Google. Publicar estes arquivos não comprova indexação nem garante uma posição específica.

## G. Acompanhamento

**Até 30 dias:** concluir Search Console/TXT, enviar sitemap, inspecionar rotas, conferir dados do Perfil da Empresa, obter material real da equipe e avaliações, medir a versão publicada.

**Até 60 dias:** analisar consultas, impressões, CTR e páginas com problemas de indexação. Ajustar títulos e conteúdo com base nos dados. Criar páginas adicionais somente com informações específicas confirmadas pela escola.

**Até 90 dias:** comparar cliques, consultas locais e contatos; avaliar desempenho em dispositivos reais; aprofundar conteúdos que respondam a dúvidas frequentes de alunos e responsáveis. Evitar publicação em massa de textos genéricos ou páginas por bairro.
