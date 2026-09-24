function EditAvatar() {
  return (
    <form className="popup__form" id="avatar-form" noValidate>
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_url"
          id="avatar-link-input"
          name="avatar"
          placeholder="Link da imagem"
          required
          type="url"
        />
        <span className="popup__error" id="avatar-link-input-error"></span>
      </label>

      <button className="button popup__button" type="submit">
        Salvar
      </button>
    </form>
  );
}

export default EditAvatar;
