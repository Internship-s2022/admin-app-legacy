import React, { useEffect, useState } from 'react';

import SearchIcon from 'src/components/shared/ui/icons/searchIcon';

import styles from './searchbar.module.css';
import { SearchBarProps, SearchData } from './types';

const SearchBar = <T extends SearchData>(props: SearchBarProps<T>): JSX.Element => {
  const { setFilter, filter } = props;
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (filter === '') {
      setInputValue('');
    }
  }, [filter]);
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setFilter(inputValue);
        }}
      >
        <div className={styles.searchInputContainer}>
          <div className={styles.iconContainer}>
            <SearchIcon />
          </div>
          <input
            className={styles.searchInput}
            placeholder="Búsqueda por palabra clave"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
