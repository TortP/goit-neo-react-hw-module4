// components/ImageModal/ImageModal.jsx
import Modal from 'react-modal';
import styles from './ImageModal.module.css';

Modal.setAppElement('#root');

const ImageModal = ({ image, onClose }) => {
  if (!image || !image.urls) return null;

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      className={styles.content}
      overlayClassName={styles.overlay}
    >
      <img
        className={styles.image}
        src={image.urls.regular || image.urls.small}
        alt={image.alt_description || 'image'}
      />
    </Modal>
  );
};

export default ImageModal;
