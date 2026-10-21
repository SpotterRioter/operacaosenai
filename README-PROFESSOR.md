# 🛠️ Operação MangueTech 2077 — SENAI Areias (Recife/PE)

Projeto prático gamificado para ensino de **CSS3 Moderno** voltado às turmas de Informática do **SENAI Areias**.

---

## 📂 Estrutura de Arquivos na Pasta

1. **`index.html`**: Estrutura HTML completa contendo os componentes das **8 fases**. **Regra:** Os alunos não devem alterar o HTML (apenas o `href` no `<head>` caso queiram testar o gabarito).
2. **`style-aluno.css`**: Folha de estilo inicial com as instruções das fases. O editor web carrega este arquivo para os alunos completarem o CSS no navegador.
3. **`style-gabarito-professor.css`**: Folha de estilo finalizada com o gabarito completo de todas as 8 fases para o professor projetar no quadro e validar as entregas.
4. **`css-game.js`** e **`style-editor.css`**: Lógica e aparência do editor de missões, da pontuação e da prévia ao vivo.

---

## 🚀 Como Usar em Sala de Aula

1. **Abrir o jogo:** Acesse a URL publicada no Vercel. Para uso local, sirva a pasta com um servidor HTTP local.
2. **Jogar as fases:** Selecione a missão, edite o CSS no painel central e confira o resultado na prévia. Use **Validar fase** para ganhar XP e liberar a próxima missão.
3. **Reiniciar:** O botão **Restaurar** recupera o conteúdo original de `style-aluno.css` e zera a pontuação da sessão.

### Publicação e armazenamento

O editor funciona inteiramente no navegador: o CSS digitado e a pontuação não são enviados nem salvos no Vercel e são perdidos ao recarregar a página. Para alterar permanentemente a versão publicada, edite `style-aluno.css` no projeto, envie o commit para o GitHub e deixe o Vercel fazer um novo deploy.

O arquivo `style-gabarito-professor.css` continua disponível para consulta do professor e contém a solução completa das fases.

---

## 🏆 Tabela de Pontuação das 8 Fases (Total: 2000 XP)

| Fase | Tópico Técnico Principal | Atributos-Chave Avaliados | XP |
| :--- | :--- | :--- | :---: |
| **Fase 1** | Variáveis CSS & Reset | `:root`, `--variaveis`, `box-sizing: border-box` | **150 XP** |
| **Fase 2** | Flexbox Unidimensional | `display: flex`, `justify-content`, `align-items`, `gap`, `:hover` | **200 XP** |
| **Fase 3** | Box Model, Position & Atributos | `position: relative/absolute`, `[data-status="..."]`, `border-left` | **250 XP** |
| **Fase 4** | CSS Grid Layout 2D | `display: grid`, `grid-template-columns`, `grid-template-areas` | **300 XP** |
| **Fase 5** | Cards Responsivos (Flex Wrap) | `flex-wrap: wrap`, `flex: 1 1 200px`, `flex-direction: column` | **250 XP** |
| **Fase 6** | Tabelas Industriais | `border-collapse`, `:nth-child(even)`, `tbody tr:hover` | **200 XP** |
| **Fase 7** | Formulários e Acessibilidade Visual | `input:focus`, `outline: none`, `box-shadow`, `accent-color` | **200 XP** |
| **Fase 8** | **BOSS FIGHT:** Animação & Mobile | `@keyframes`, `animation: infinite alternate`, `@media (max-width: 900px)` | **450 XP** |
