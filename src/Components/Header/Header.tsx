import './Header.scss';

const Header = () => {
  const homeClick = () => {};

  return (
    <header>
      <div className="header-logo">LOGO</div>
      <div className="header-nav">
        <div className="header-nav-buttons">
          <button type="button" onClick={homeClick}>
            Home
          </button>
        </div>
        <div className="header-nav-buttons">
          <button type="button" onClick={homeClick}>
            Porfolio
          </button>
        </div>

        <div className="header-nav-buttons">
          <button type="button" onClick={homeClick}>
            About
          </button>
        </div>
        <div className="header-nav-buttons">
          <button type="button" onClick={homeClick}>
            Contact
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
