// components/LoadMoreBtn.jsx
import styles from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onClick }) => {
  return (
    <div className={styles.loadMore}>
      <button className={styles.button} onClick={onClick}>Load more</button>
    </div>
  );
};

export default LoadMoreBtn;
