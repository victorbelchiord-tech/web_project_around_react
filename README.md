# Tripleten web_project_around_react

# 📸 Around The U.S. (React)

> Migração do projeto **Around The U.S.** de HTML/CSS/JS puro para **React**, dividindo a interface em componentes reutilizáveis e adotando `useState` para o controle de pop-ups.

---

## 📌 Índice

1. [Sobre o Projeto](#-sobre-o-projeto)
2. [Tech Stack](#%EF%B8%8F-tech-stack)
3. [Funcionalidades Principais](#-funcionalidades-principais)
4. [Arquitetura de Arquivos](#-arquitetura-de-arquivos)
5. [Arquitetura de Componentes React](#-arquitetura-de-componentes-react)
6. [Como Rodar o Projeto](#-como-rodar-o-projeto)
7. [Próximos Passos](#-próximos-passos)

---

## 📖 Sobre o Projeto

O **Around The U.S.** é uma aplicação web interativa baseada em um modelo do Figma, que permite editar o perfil do usuário, gerenciar uma galeria de cartões (fotos de lugares) e visualizar imagens em detalhe. Nesta etapa, o projeto — que antes era construído com HTML, CSS e classes JavaScript (ES6) manipulando o DOM diretamente — foi migrado para **React**, com Vite como bundler.

A aplicação foi quebrada em componentes independentes e reutilizáveis (`Header`, `Main`, `Footer`, `Card`, `Popup`), substituindo a manipulação manual do DOM por estado controlado via `useState` e renderização declarativa via JSX. Os dados dos cartões, por enquanto, são dados fictícios (_mock data_) definidos diretamente no componente `Main`, já que a integração com uma API real ainda não faz parte desta etapa.

---

## 🛠️ Tech Stack

| Camada          | Tecnologia             | Propósito                                                                         |
| :-------------- | :--------------------- | :-------------------------------------------------------------------------------- |
| **Estrutura**   | React 19               | Componentização da interface e gerenciamento de estado via hooks.                 |
| **Build Tool**  | Vite 8                 | Servidor de desenvolvimento com HMR e build de produção.                          |
| **Estilização** | CSS3 (Metodologia BEM) | Um arquivo `.css` por componente, mantendo classes já usadas no projeto original. |
| **Lint**        | Oxlint                 | Regras de `react/rules-of-hooks` e `react/only-export-components`.                |
| **Organização** | Componentes funcionais | Um componente por pasta, com props para comunicação entre pais e filhos.          |

---

## ✨ Funcionalidades Principais

- **Perfil na Tela:** Nome, descrição e avatar são renderizados a partir de dados fixos no componente `Main`, prontos para futuramente vir de uma API.
- **Galeria de Cartões:** Lista de cartões (dado fictício) renderizada dinamicamente com `.map()`, através do componente `Card`.
- **Pop-ups Orientados a Componentes:** Um único componente `Popup` genérico (recebe `title` e `children`) é reaproveitado para os quatro tipos de conteúdo: editar perfil, novo local, editar avatar e visualização de imagem.
- **Estado Centralizado do Pop-up:** O componente `Main` guarda em `useState` qual pop-up está aberto (ou `null`), evitando manipulação manual de classes CSS para exibir/esconder modais.
- **Pop-up de Imagem:** Ao clicar em um cartão, o `Popup` é aberto sem título e exibe a imagem e a legenda em tamanho maior, via `ImagePopup`.
- **Fechamento de Pop-up:** Um clique no botão "×" chama `handleClosePopup`, que zera o estado e desmonta o pop-up.

---

## 📐 Arquitetura de Arquivos

| Arquivo / Diretório                                                           | Tipo / Contexto     | Descrição e Responsabilidade Técnica                                                                                    |
| :---------------------------------------------------------------------------- | :------------------ | :---------------------------------------------------------------------------------------------------------------------- |
| `src/main.jsx`                                                                | Ponto de Entrada    | Monta o componente `App` na `div#root`, dentro de `StrictMode`, e importa o CSS global.                                 |
| `src/index.css`                                                               | Escopo Global       | Reset básico (`box-sizing`, margens) e definição da fonte padrão da aplicação.                                          |
| `src/components/App/App.jsx`                                                  | Componente Raiz     | Monta a estrutura `page` / `page__content` e renderiza `Header`, `Main` e `Footer`.                                     |
| `src/components/App/App.css`                                                  | Componente Layout   | Estilos globais da página (fundo, largura máxima, `page__section`).                                                     |
| `src/components/Header/Header.jsx`                                            | Componente UI       | Exibe o logotipo da aplicação.                                                                                          |
| `src/components/Header/Header.css`                                            | Componente UI       | Alinhamento do logotipo e altura flexível do cabeçalho.                                                                 |
| `src/components/Footer/Footer.jsx`                                            | Componente UI       | Exibe o texto de copyright.                                                                                             |
| `src/components/Footer/Footer.css`                                            | Componente UI       | Estilização do rodapé.                                                                                                  |
| `src/components/Main/Main.jsx`                                                | Componente Central  | Guarda o dado fictício dos cartões, o estado do pop-up ativo, e renderiza perfil, galeria e o `Popup` condicionalmente. |
| `src/components/Main/Main.css`                                                | Componente UI       | Estilos do perfil (`profile`) e da grade de cartões (`cards`).                                                          |
| `src/components/Main/components/Card/Card.jsx`                                | Componente / Cartão | Recebe `card` e `onCardClick` via props; exibe imagem, título e botões de curtir/excluir.                               |
| `src/components/Main/components/Card/Card.css`                                | Componente UI       | Estilização individual de cada cartão.                                                                                  |
| `src/components/Main/components/Popup/Popup.jsx`                              | Componente Genérico | Recebe `title`, `children` e `onClose`; renderiza a estrutura comum de todo pop-up.                                     |
| `src/components/Main/components/Popup/Popup.css`                              | Componente Feedback | Estilos de overlay, conteúdo, botão de fechar e variação sem título (imagem).                                           |
| `src/components/Main/components/Popup/components/NewCard/NewCard.jsx`         | Conteúdo de Pop-up  | Formulário para criação de um novo cartão (título + link).                                                              |
| `src/components/Main/components/Popup/components/EditProfile/EditProfile.jsx` | Conteúdo de Pop-up  | Formulário para edição de nome e descrição do perfil.                                                                   |
| `src/components/Main/components/Popup/components/EditAvatar/EditAvatar.jsx`   | Conteúdo de Pop-up  | Formulário para atualização do avatar via link de imagem.                                                               |
| `src/components/Main/components/Popup/components/ImagePopup/ImagePopup.jsx`   | Conteúdo de Pop-up  | Exibe a imagem em tamanho maior e a legenda do cartão clicado.                                                          |
| `public/images/`                                                              | Ativos Visuais      | Ícones (curtir, excluir, adicionar, editar, fechar), logotipo e avatar — servidos como arquivos estáticos pelo Vite.    |

---

## 🧩 Arquitetura de Componentes React

### `App`

Componente raiz. Não recebe props nem mantém estado — apenas organiza o layout e monta `Header`, `Main` e `Footer`.

### `Header` / `Footer`

Componentes de apresentação puros, sem props e sem estado.

### `Main`

Componente central da aplicação.

- **Estado:**
  - `popup` — objeto `{ title, children }` do pop-up atualmente aberto, ou `null` quando nenhum está aberto.
- **Dados:**
  - `cards` — array de dados fictícios dos cartões, definido no próprio arquivo.
- **Funções internas:**
  - `handleOpenPopup(popupToOpen)` — define `popup` com o conteúdo recebido.
  - `handleClosePopup()` — zera `popup` (`null`), desmontando o `Popup`.
  - `handleCardClick(card)` — monta o `ImagePopup` do cartão clicado e o abre.
- Renderiza a seção de perfil, a lista de `Card` (via `.map`) e o `Popup`, condicionado a `popup` não ser `null`.

### `Card`

- **Props:** `card` (objeto com `name`, `link`, `isLiked`, `_id`...) e `onCardClick` (callback).
- Desestrutura `name`, `link` e `isLiked` de `card` e chama `onCardClick(card)` ao clicar na imagem.

### `Popup`

- **Props:** `title`, `children` e `onClose`.
- Renderiza o título apenas se `title` existir (`{title && <h3>...}`), permitindo reaproveitar o mesmo componente para o pop-up de imagem (sem título).
- O botão de fechar chama `onClose`, recebido do `Main`.

### `NewCard`, `EditProfile`, `EditAvatar`

Componentes de formulário, sem lógica própria — são passados como `children` do `Popup` a partir do `Main`. Ainda não possuem tratamento de `submit` nem validação.

### `ImagePopup`

- **Props:** `card`.
- Desestrutura `link` e `name` para exibir a imagem ampliada e a legenda.
