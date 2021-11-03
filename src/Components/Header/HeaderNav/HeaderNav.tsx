import { useDispatch } from 'react-redux';
import { Tab } from '../../../types/Tab';
import './HeaderNav.scss';

export const HeaderNav = () => {
  const dispatch = useDispatch();

  const tabSelection = (tab: Tab) => {
    dispatch({ type: 'SET_TAB_SELECTED', tabSelected: tab });
    dispatch({ type: 'SET_SELECTED_PROJECT', selectedProject: null });
  };

  const aboutButtonClick = () => {
    dispatch({ type: 'SHOW_ABOUT_MODAL', showAboutModal: true });
  };

  const contactButtonClick = () => {
    dispatch({ type: 'SHOW_CONTACT_MODAL', showContactModal: true });
  };

  return (
    <div className="header-nav">
      <div className="header-nav-buttons">
        <button
          type="button"
          onClick={() => {
            tabSelection('home');
          }}
        >
          Home
        </button>
      </div>
      <div className="header-nav-buttons">
        <button
          type="button"
          onClick={() => {
            tabSelection('portfolio');
          }}
        >
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
  );
};
