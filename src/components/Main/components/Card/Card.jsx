import "../../../../blocks/card.css";

function Card(props) {
  const { card, onCardClick, onCardLike, onCardDelete } = props;
  const { name, link, isLiked } = card;

  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_is-active" : ""
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={handleClick}
      />
      <button
        aria-label="Excluir cartão"
        className="card__delete-button"
        type="button"
        onClick={handleDeleteClick}
      />
      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <button
          aria-label="Botão de curtir"
          type="button"
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
        />
      </div>
    </li>
  );
}

export default Card;
