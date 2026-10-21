# 🛠️ Operação MangueTech 2077 — SENAI Areias (Recife/PE)

Projeto prático gamificado para ensino de **CSS3 Moderno** voltado às turmas de Informática do **SENAI Areias**.

---

## 📂 Estrutura de Arquivos na Pasta

1. **`index.html`**: Estrutura HTML completa contendo os componentes das **8 fases**. **Regra:** Os alunos não devem alterar o HTML (apenas o `href` no `<head>` caso queiram testar o gabarito).
2. **`style-aluno.css`**: Folha de estilo em branco contendo toda a explicação passo a passo de cada fase comentada no próprio código. É aqui que a dupla de alunos vai programar.
3. **`style-gabarito-professor.css`**: Folha de estilo finalizada com o gabarito completo de todas as 8 fases para o professor projetar no quadro e validar as entregas.

---

## 🚀 Como Usar em Sala de Aula

1. **Demonstrar o Objetivo Final (Gabarito):**
   No arquivo `index.html` (linha 12), altere temporariamente o `<link>` para:
   ```html
   <link rel="stylesheet" href="style-gabarito-professor.css">
   ```
   Abra no navegador e mostre para a turma como o sistema da fábrica deve ficar quando eles terminarem.

2. **Iniciar a Missão dos Alunos:**
   Volte o `<link>` do `index.html` para `style-aluno.css` e distribua a pasta para as máquinas do laboratório.

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
