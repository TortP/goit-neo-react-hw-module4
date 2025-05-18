import { useState } from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSubmit, icon }) => {
  const [input, setInput] = useState('');

  const handleChange = (e) => setInput(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(input);
    setInput('');
  };

  return (
    <header className={styles.header}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <button type="submit" className={styles.iconButton}>
          {icon}
        </button>
        <input
          className={styles.input}
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Search images and photos"
          autoFocus
          autoComplete="off"
        />
      </form>
    </header>
  );
};

export default SearchBar;
