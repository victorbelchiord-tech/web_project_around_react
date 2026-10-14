function RemoveCard({ onConfirm }) {
  function handleSubmit(event) {
    event.preventDefault();
    onConfirm();
  }

  return (
    <form
      className="popup__form"
      name="remove-card-form"
      onSubmit={handleSubmit}
    >
      <button className="button popup__button" type="submit">
        Sim
      </button>
    </form>
  );
}

export default RemoveCard;
