import "./Popup.css";

function Popup(props) {
  // title e children vêm de quem abre o popup (ver Main.jsx)
  const { onClose, title, children } = props;

  return (
    <div className="popup popup_is-opened">
      <div
        className={`popup__content ${
          !title ? "popup__content_content_image" : ""
        }`}
      >
        <button
          aria-label="Fechar pop-up"
          className="popup__close"
          type="button"
          onClick={onClose}
        />

        {title && <h3 className="popup__title">{title}</h3>}

        {children}
      </div>
    </div>
  );
}

export default Popup;
