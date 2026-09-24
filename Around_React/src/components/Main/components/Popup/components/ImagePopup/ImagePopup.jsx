function ImagePopup(props) {
  // recebe o card que foi clicado
  const { card } = props;
  const { link, name } = card;

  return (
    <>
      <img alt={name} className="popup__image" src={link} />
      <p className="popup__caption">{name}</p>
    </>
  );
}

export default ImagePopup;
