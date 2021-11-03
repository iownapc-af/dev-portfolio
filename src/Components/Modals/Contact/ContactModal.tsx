import { useSelector } from 'react-redux';
import { AppState, useAppDispatch } from '../../../Store/AppState';
import CloseIcon from '../../../res/close_icon.svg';
import './ContactModal.scss';
import '../ModalStyle.scss';

const ContactModal = () => {
  const dispatch = useAppDispatch();
  const showModal = useSelector((state: AppState) => state.showContactModal);

  const modalCloseClick = () => {
    dispatch({ type: 'SHOW_CONTACT_MODAL', showContactModal: false });
  };

  return showModal ? (
    <div className="modal-wrapper">
      <button className="close-modal-button" type="button" onClick={modalCloseClick}>
        <img src={CloseIcon} alt="" />
      </button>

      <div className="about-modal-content">Contact</div>
    </div>
  ) : null;
};

export default ContactModal;
