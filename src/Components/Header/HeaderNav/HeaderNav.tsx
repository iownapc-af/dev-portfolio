import { useDispatch } from 'react-redux';
import { Tab } from '../../../types/Tab';
import './HeaderNav.scss';

export const HeaderNav = () => {
  const dispatch = useDispatch();

  const tabSelection = (tab: Tab) => {
    dispatch({ type: 'SET_TAB_SELECTED', tabSelected: tab });
    dispatch({ type: 'SET_SELECTED_PROJECT', selectedProject: null });
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
        <button type="button" onClick={() => {}}>
          About
        </button>
      </div>
      <div className="header-nav-buttons">
        <button type="button" onClick={() => {}}>
          Contact
        </button>
      </div>
    </div>
  );
};
