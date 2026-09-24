import "../../../../blocks/card.css";

function Card(props) {
  const { card, onCardClick } = props;
  const { name, link, isLiked } = card;

  function handleClick() {
    onCardClick(card);
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
      />
      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <button
          aria-label="Botão de curtir"
          type="button"
          className={`card__like-button ${
            isLiked ? "card__like-button_is-active" : ""
          }`}
        />
      </div>
    </li>
  );
}

export default Card;
