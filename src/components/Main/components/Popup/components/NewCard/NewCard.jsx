import { useState, useContext } from "react";
import CurrentUserContext from "../../../../../../contexts/CurrentUserContext.js";

function NewCard() {
  const { handleAddPlaceSubmit } = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    handleAddPlaceSubmit({ name, link });
  }

  return (
    <form
      className="popup__form"
      name="card-form"
      id="new-card-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_card-name"
          id="card-name"
          maxLength="30"
          minLength="1"
          name="card-name"
          placeholder="Título"
          required
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <span className="popup__error" id="card-name-error"></span>
      </label>
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_url"
          id="card-link"
          name="link"
          placeholder="Link de Imagem"
          required
          type="url"
          value={link}
          onChange={(event) => setLink(event.target.value)}
        />
        <span className="popup__error" id="card-link-error"></span>
      </label>

      <button className="button popup__button" type="submit">
        Criar
      </button>
    </form>
  );
}

export default NewCard;
