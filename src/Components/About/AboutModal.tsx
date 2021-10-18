import { useSelector } from 'react-redux';
import { AppState, useAppDispatch } from '../../Store/AppState';
import './AboutModal.scss';

const AboutModal = () => {
  const dispatch = useAppDispatch();
  const showModal = useSelector((state: AppState) => state.showAboutModal);

  const modalCloseClick = () => {
    dispatch({ type: 'SHOW_ABOUT_MODAL', showAboutModal: false });
  };

  return showModal ? (
    <div className="about-modal-wrapper">
      <button type="button" onClick={modalCloseClick}>
        AboutModal
      </button>
    </div>
  ) : null;
};

export default AboutModal;
