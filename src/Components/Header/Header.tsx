import { useDispatch } from 'react-redux';
import './Header.scss';

const Header = () => {
  const dispatch = useDispatch();

  const homeClick = () => {};
  const aboutButtonClick = () => {
    dispatch({ type: 'SHOW_ABOUT_MODAL', showAboutModal: true });
  };

  const contactButtonClick = () => {
    dispatch({ type: 'SHOW_CONTACT_MODAL', showContactModal: true });
  };

  return (
    <header>
      <div className="header-logo">LOGO</div>

      {/* put navigation into a component at some point */}
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
          <button type="button" onClick={aboutButtonClick}>
            About
          </button>
        </div>
        <div className="header-nav-buttons">
          <button type="button" onClick={contactButtonClick}>
            Contact
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
