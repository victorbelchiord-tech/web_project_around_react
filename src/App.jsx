import { useEffect, useState } from "react";
import Header from "./components/Header/Header.jsx";
import Main from "./components/Main/Main.jsx";
import Footer from "./components/Footer/Footer.jsx";
import api from "./utils/api.js";
import CurrentUserContext from "./contexts/CurrentUserContext.js";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState(null);

  // Busca usuário e cartões ao montar o componente
  useEffect(() => {
    api.getUserInfo().then(setCurrentUser).catch(console.error);
    api.getInitialCards().then(setCards).catch(console.error);
  }, []);

  function handleOpenPopup(popupToOpen) {
    setPopup(popupToOpen);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  function handleUpdateUser(data) {
    return api
      .updateUserInfo(data)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch(console.error);
  }

  function handleUpdateAvatar(data) {
    return api
      .updateAvatar(data.avatar)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch(console.error);
  }

  function handleCardLike(card) {
    return api
      .changeLikeCardStatus(card._id, !card.isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard,
          ),
        );
      })
      .catch(console.error);
  }

  function handleCardDelete(card) {
    return api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id),
        );
        handleClosePopup();
      })
      .catch(console.error);
  }

  function handleAddPlaceSubmit(data) {
    return api
      .addCard(data)
      .then((newCard) => {
        setCards((state) => [newCard, ...state]);
        handleClosePopup();
      })
      .catch(console.error);
  }

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar,
        handleAddPlaceSubmit,
      }}
    >
      <div className="page">
        <div className="page__content">
          <Header />
          <Main
            cards={cards}
            popup={popup}
            onOpenPopup={handleOpenPopup}
            onClosePopup={handleClosePopup}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
