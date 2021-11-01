import { useSelector } from 'react-redux';
// import Tilt from 'react-parallax-tilt';
import { AppState, useAppDispatch } from '../../Store/AppState';
import CloseIcon from '../../res/close_icon.svg';
// @ts-ignore
import './AboutModal.scss';

const AboutModal = () => {
  const dispatch = useAppDispatch();
  const showModal = useSelector((state: AppState) => state.showAboutModal);

  const modalCloseClick = () => {
    dispatch({ type: 'SHOW_ABOUT_MODAL', showAboutModal: false });
  };

  return showModal ? (
    <div className="about-modal-wrapper">
      <button className="close-modal-button" type="button" onClick={modalCloseClick}>
        <img src={CloseIcon} alt="" />
      </button>
      <div className="about-modal-content">About</div>
    </div>
  ) : null;
};

export default AboutModal;
