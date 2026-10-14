import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import Card from "./components/Card/Card.jsx";
import Popup from "./components/Popup/Popup.jsx";
import NewCard from "./components/Popup/components/NewCard/NewCard.jsx";
import EditProfile from "./components/Popup/components/EditProfile/EditProfile.jsx";
import EditAvatar from "./components/Popup/components/EditAvatar/EditAvatar.jsx";
import ImagePopup from "./components/Popup/components/ImagePopup/ImagePopup.jsx";
import RemoveCard from "./components/Popup/components/RemoveCard/RemoveCard.jsx";

function Main(props) {
  const { cards, popup, onOpenPopup, onClosePopup, onCardLike, onCardDelete } =
    props;
  const { currentUser } = useContext(CurrentUserContext);

  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile />,
  };

  const newCardPopup = {
    title: "Novo local",
    children: <NewCard />,
  };

  const editAvatarPopup = {
    title: "Atualizar foto de perfil",
    children: <EditAvatar />,
  };

  function handleCardClick(card) {
    onOpenPopup({
      title: null,
      children: <ImagePopup card={card} />,
    });
  }

  // Abre a confirmação; o cartão só é excluído se o usuário clicar em "Sim"
  function handleCardDeleteClick(card) {
    onOpenPopup({
      title: "Você tem certeza?",
      className: "popup__content_content_confirm",
      children: <RemoveCard onConfirm={() => onCardDelete(card)} />,
    });
  }

  return (
    <main className="content">
      <section className="profile page__section">
        <div className="profile__avatar-wrap">
          <img
            className="profile__image"
            src={currentUser.avatar}
            alt="Avatar"
          />
          <button
            aria-label="Editar avatar"
            className="profile__avatar-edit-button"
            type="button"
            onClick={() => onOpenPopup(editAvatarPopup)}
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            aria-label="Editar perfil"
            className="profile__edit-button"
            type="button"
            onClick={() => onOpenPopup(editProfilePopup)}
          />
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          aria-label="Adicionar cartão"
          className="profile__add-button"
          type="button"
          onClick={() => onOpenPopup(newCardPopup)}
        />
      </section>

      <section className="cards page__section">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={handleCardClick}
              onCardLike={onCardLike}
              onCardDelete={handleCardDeleteClick}
            />
          ))}
        </ul>
      </section>

      {popup && (
        <Popup
          onClose={onClosePopup}
          title={popup.title}
          className={popup.className}
        >
          {popup.children}
        </Popup>
      )}
    </main>
  );
}

export default Main;
