import "../../blocks/header.css";
import Logo from "../../images/logo.svg";

function Header() {
  return (
    <header className="header page__section">
      <img
        alt="Logotipo Around The U.S."
        className="logo header__logo"
        src={Logo}
      />
    </header>
  );
}

export default Header;
