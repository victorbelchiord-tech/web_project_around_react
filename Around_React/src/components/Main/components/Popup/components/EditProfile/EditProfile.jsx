function EditProfile() {
  return (
    <form className="popup__form" id="edit-profile-form" noValidate>
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
