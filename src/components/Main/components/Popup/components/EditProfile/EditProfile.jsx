import { useState, useContext } from "react";
import CurrentUserContext from "../../../../../../contexts/CurrentUserContext.js";

function EditProfile() {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser.name ?? "");
  const [description, setDescription] = useState(currentUser.about ?? "");

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    handleUpdateUser({ name, about: description });
  }

  return (
    <form
      className="popup__form"
      id="edit-profile-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_name"
          id="profile-name-input"
          name="name"
          placeholder="Nome"
          type="text"
          required
          minLength="2"
          maxLength="40"
          value={name}
          onChange={handleNameChange}
        />
        <span className="popup__error" id="profile-name-input-error"></span>
      </label>

      <label className="popup__field">
        <input
          className="popup__input popup__input_type_description"
          id="profile-about-input"
          name="description"
          placeholder="Sobre mim"
          type="text"
          required
          minLength="2"
          maxLength="200"
          value={description}
          onChange={handleDescriptionChange}
        />
        <span className="popup__error" id="profile-about-input-error"></span>
      </label>

      <button className="button popup__button" type="submit">
        Salvar
      </button>
    </form>
  );
}

export default EditProfile;
