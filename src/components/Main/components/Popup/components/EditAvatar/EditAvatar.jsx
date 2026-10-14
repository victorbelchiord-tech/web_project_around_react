import { useContext, useRef } from "react";
import CurrentUserContext from "../../../../../../contexts/CurrentUserContext.js";

function EditAvatar() {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  const avatarRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    handleUpdateAvatar({ avatar: avatarRef.current.value });
  }

  return (
    <form
      className="popup__form"
      id="avatar-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_url"
          id="avatar-link-input"
          name="avatar"
          placeholder="Link da imagem"
          required
          type="url"
          ref={avatarRef}
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
