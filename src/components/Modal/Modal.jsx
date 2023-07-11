import propTypes from 'prop-types';
import css from './Modal.module.css';

const Modal = ({src, alt, handleClose}) => (
  <div className={css.Overlay} onClick={handleClose}>
    <div className={css.Modal}>
      <img src={src} alt={alt} />
    </div>
  </div>
);

Modal.propTypes = {
  src: propTypes.string.isRequired,
  alt: propTypes.string.isRequired,
  handleClose: propTypes.func.isRequired,
};

export default Modal;