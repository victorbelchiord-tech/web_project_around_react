# Tripleten web_project_around_react

# 📸 Around The U.S. (React)

> Migração do projeto **Around The U.S.** de HTML/CSS/JS puro para **React**, dividindo a interface em componentes reutilizáveis, consumindo a API do TripleTen e compartilhando os dados do usuário via **Context API**.

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

O **Around The U.S.** é uma aplicação web interativa baseada em um modelo do Figma, que permite editar o perfil do usuário, gerenciar uma galeria de cartões (fotos de lugares) e visualizar imagens em detalhe. O projeto, que antes era construído com HTML, CSS e classes JavaScript (ES6) manipulando o DOM diretamente, foi migrado para **React**, com Vite como bundler.

A aplicação foi quebrada em componentes independentes e reutilizáveis (`Header`, `Main`, `Footer`, `Card`, `Popup`), substituindo a manipulação manual do DOM por estado controlado via hooks e renderização declarativa via JSX.

Nesta etapa, os dados fictícios (_mock data_) foram removidos: usuário e cartões agora vêm da **API do TripleTen** através da classe `Api` (`src/utils/api.js`). Os dados do usuário atual são distribuídos pela aplicação com **Context API**, e os estados compartilhados (usuário, cartões e pop-up ativo) ficam no componente raiz `App`.

---

## 🛠️ Tech Stack

| Camada          | Tecnologia             | Propósito                                                                                  |
| :-------------- | :--------------------- | :----------------------------------------------------------------------------------------- |
| **Estrutura**   | React 19               | Componentização da interface e gerenciamento de estado via hooks.                          |
| **Estado**      | Hooks + Context API    | `useState`, `useEffect`, `useContext` e `useRef`; `CurrentUserContext` para o usuário.     |
| **Dados**       | Fetch API              | Requisições à API do TripleTen encapsuladas na classe `Api`.                               |
| **Build Tool**  | Vite 8                 | Servidor de desenvolvimento com HMR e build de produção.                                   |
| **Estilização** | CSS3 (Metodologia BEM) | Um arquivo `.css` por bloco BEM em `src/blocks/`, mantendo as classes do projeto original. |
| **Lint**        | Oxlint                 | Regras de `react/rules-of-hooks` e `react/only-export-components`.                         |
| **Organização** | Componentes funcionais | Um componente por pasta, com props para comunicação entre pais e filhos.                   |

---

## ✨ Funcionalidades Principais

- **Perfil Vindo da API:** Nome, descrição e avatar são lidos do `CurrentUserContext` e atualizados automaticamente quando o usuário é alterado.
- **Galeria de Cartões:** Os cartões são buscados na API quando o `App` monta (`useEffect`) e renderizados dinamicamente com `.map()`, através do componente `Card`.
- **Curtir e Descurtir:** O botão de curtir chama `handleCardLike`, que envia a requisição à API e substitui o cartão atualizado no estado. A classe `card__like-button_is-active` é aplicada conforme `isLiked`.
- **Exclusão com Confirmação:** Ao clicar em excluir, abre-se o pop-up `RemoveCard` ("Você tem certeza?"). O cartão só é removido da API e do estado se o usuário confirmar com "Sim".
- **Edição de Perfil:** O formulário `EditProfile` usa componentes controlados (`name` e `description`), iniciados com os valores do usuário atual, e salva na API via `handleUpdateUser`.
- **Edição de Avatar:** O formulário `EditAvatar` usa `useRef` para ler o link da imagem e salva na API via `handleUpdateAvatar`.
- **Adição de Cartões:** O formulário `NewCard` (componentes controlados) envia título e link por `handleAddPlaceSubmit`; o novo cartão aparece no início da lista.
- **Pop-ups Orientados a Componentes:** Um único componente `Popup` genérico (recebe `title`, `className` e `children`) é reaproveitado para: editar perfil, novo local, editar avatar, confirmar exclusão e visualizar imagem.
- **Estado Centralizado do Pop-up:** O `App` guarda em `useState` qual pop-up está aberto (ou `null`). Após uma requisição bem-sucedida, o próprio handler fecha o pop-up.
- **Pop-up de Imagem:** Ao clicar em um cartão, o `Popup` é aberto sem título e exibe a imagem e a legenda em tamanho maior, via `ImagePopup`.

---

## 📐 Arquitetura de Arquivos

| Arquivo / Diretório                                                           | Tipo / Contexto      | Descrição e Responsabilidade Técnica                                                                                                                          |
| :---------------------------------------------------------------------------- | :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `src/main.jsx`                                                                | Ponto de Entrada     | Monta o componente `App` na `div#root`, dentro de `StrictMode`, e importa o CSS global.                                                                       |
| `src/index.css`                                                               | Escopo Global        | Importa `normalize.css`, as fontes e os blocos CSS da aplicação.                                                                                              |
| `src/App.jsx`                                                                 | Componente Raiz      | Guarda `currentUser`, `cards` e `popup`; busca usuário e cartões; define os handlers; fornece o `CurrentUserContext` e renderiza `Header`, `Main` e `Footer`. |
| `src/contexts/CurrentUserContext.js`                                          | Contexto             | Cria e exporta o objeto de contexto com o usuário atual e os handlers de atualização.                                                                         |
| `src/utils/api.js`                                                            | Serviço / API        | Classe `Api` (usuário, cartões, avatar, curtir e excluir) e instância exportada como padrão.                                                                  |
| `src/blocks/`                                                                 | Estilos BEM          | `page.css`, `header.css`, `content.css`, `footer.css`, `profile.css`, `cards.css`, `card.css` e `popup.css`.                                                  |
| `src/vendor/`                                                                 | Estilos de Terceiros | `normalize.css` e `fonts.css` (fonte Inter).                                                                                                                  |
| `src/components/Header/Header.jsx`                                            | Componente UI        | Exibe o logotipo da aplicação.                                                                                                                                |
| `src/components/Footer/Footer.jsx`                                            | Componente UI        | Exibe o texto de copyright.                                                                                                                                   |
| `src/components/Main/Main.jsx`                                                | Componente Central   | Lê o usuário do contexto, renderiza perfil e galeria, monta o conteúdo dos pop-ups e renderiza o `Popup` condicionalmente.                                    |
| `src/components/Main/components/Card/Card.jsx`                                | Componente / Cartão  | Recebe `card`, `onCardClick`, `onCardLike` e `onCardDelete`; exibe imagem, título e botões de curtir/excluir.                                                 |
| `src/components/Main/components/Popup/Popup.jsx`                              | Componente Genérico  | Recebe `title`, `className`, `children` e `onClose`; renderiza a estrutura comum de todo pop-up.                                                              |
| `src/components/Main/components/Popup/components/NewCard/NewCard.jsx`         | Conteúdo de Pop-up   | Formulário controlado para criação de um novo cartão (título + link).                                                                                         |
| `src/components/Main/components/Popup/components/EditProfile/EditProfile.jsx` | Conteúdo de Pop-up   | Formulário controlado para edição de nome e descrição do perfil.                                                                                              |
| `src/components/Main/components/Popup/components/EditAvatar/EditAvatar.jsx`   | Conteúdo de Pop-up   | Formulário para atualização do avatar via link, lendo o valor com `useRef`.                                                                                   |
| `src/components/Main/components/Popup/components/RemoveCard/RemoveCard.jsx`   | Conteúdo de Pop-up   | Botão "Sim" de confirmação de exclusão de um cartão.                                                                                                          |
| `src/components/Main/components/Popup/components/ImagePopup/ImagePopup.jsx`   | Conteúdo de Pop-up   | Exibe a imagem em tamanho maior e a legenda do cartão clicado.                                                                                                |
| `src/images/`                                                                 | Ativos Visuais       | Ícones (curtir, excluir, adicionar, editar, fechar), logotipo e avatar padrão.                                                                                |

---

## 🧩 Arquitetura de Componentes React

### `App`

Componente raiz e dono do estado compartilhado.

- **Estado:**
  - `currentUser` — dados do usuário (`name`, `about`, `avatar`, `_id`), vindos da API.
  - `cards` — lista de cartões, vinda da API.
  - `popup` — objeto `{ title, children, className }` do pop-up aberto, ou `null`.
- **Efeito:** ao montar, chama `api.getUserInfo()` e `api.getInitialCards()` e grava as respostas no estado.
- **Handlers:**
  - `handleOpenPopup(popupToOpen)` / `handleClosePopup()` — abrem e fecham o pop-up.
  - `handleUpdateUser(data)` — atualiza nome e descrição na API, atualiza `currentUser` e fecha o pop-up.
  - `handleUpdateAvatar(data)` — atualiza o avatar na API, atualiza `currentUser` e fecha o pop-up.
  - `handleCardLike(card)` — curte/descurte na API e substitui o cartão no estado (`map`).
  - `handleCardDelete(card)` — exclui na API, remove o cartão do estado (`filter`) e fecha o pop-up.
  - `handleAddPlaceSubmit(data)` — cria o cartão na API e o adiciona ao início de `cards`.
- **Contexto:** `CurrentUserContext.Provider` recebe `{ currentUser, handleUpdateUser, handleUpdateAvatar, handleAddPlaceSubmit }`.
- **Props repassadas a `Main`:** `cards`, `popup`, `onOpenPopup`, `onClosePopup`, `onCardLike` e `onCardDelete`.

### `Header` / `Footer`

Componentes de apresentação puros, sem props e sem estado.

### `Main`

Componente central da interface, sem estado próprio.

- **Contexto:** `useContext(CurrentUserContext)` para exibir nome, descrição e avatar.
- **Props:** `cards`, `popup`, `onOpenPopup`, `onClosePopup`, `onCardLike`, `onCardDelete`.
- **Funções internas:**
  - `handleCardClick(card)` — abre o `ImagePopup` do cartão clicado.
  - `handleCardDeleteClick(card)` — abre o `RemoveCard`; ao confirmar, chama `onCardDelete(card)`.
- Renderiza a seção de perfil, a lista de `Card` (via `.map`) e o `Popup`, condicionado a `popup` não ser `null`.

### `Card`

- **Props:** `card` (objeto com `name`, `link`, `isLiked`, `_id`...), `onCardClick`, `onCardLike` e `onCardDelete`.
- Define `cardLikeButtonClassName` a partir de `isLiked` e chama os callbacks em `handleClick`, `handleLikeClick` e `handleDeleteClick`.

### `Popup`

- **Props:** `title`, `className`, `children` e `onClose`.
- Renderiza o título apenas se `title` existir (`{title && <h3>...}`), permitindo reaproveitar o mesmo componente para o pop-up de imagem (sem título).
- `className` permite variações de estilo, como a do pop-up de confirmação (`popup__content_content_confirm`).
- O botão de fechar chama `onClose`, recebido do `Main`.

### `EditProfile`, `NewCard`

Formulários com **componentes controlados** (`useState` + `onChange`). Consomem os handlers do `CurrentUserContext` no `onSubmit`. O `EditProfile` inicia os campos com `currentUser.name` e `currentUser.about`.

### `EditAvatar`

Formulário com **`useRef`** para acessar o valor do campo de link. Chama `handleUpdateAvatar` do contexto no `onSubmit`.

### `RemoveCard`

- **Props:** `onConfirm`.
- Formulário com o botão "Sim"; ao enviar, chama `onConfirm()`.

### `ImagePopup`

- **Props:** `card`.
- Desestrutura `link` e `name` para exibir a imagem ampliada e a legenda.

---

## 🚀 Como Rodar o Projeto

```bash
# Instalar as dependências
npm install

# Iniciar o servidor de desenvolvimento (http://localhost:3000)
npm run dev

# Gerar o build de produção
npm run build
```

> Requer Node.js `^20.19.0` ou `>=22.12.0` (exigência do Vite 8).

---

## 🔭 Próximos Passos

- Fechar pop-ups com a tecla `Esc` e com clique no overlay.
- Validar os formulários e exibir as mensagens de erro nos campos.
- Exibir o estado de carregamento nos botões de envio ("Salvando...").
- Mostrar o botão de excluir apenas nos cartões do usuário atual (`card.owner === currentUser._id`).
- Mover o token da API para variáveis de ambiente (`.env`).
