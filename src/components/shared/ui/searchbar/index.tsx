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

  const handleSubmit = (e, value) => {
    e.preventDefault();
    setFilter(value);
  };

  const handleChange = (e, value) => {
    setInputValue(e.target.value);
    value.length >= 3 ? setFilter(inputValue.trim()) : setFilter('');
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          handleSubmit(e, inputValue);
        }}
      >
        <div className={styles.searchInputContainer}>
          <div className={styles.iconContainer}>
            <SearchIcon />
          </div>
          <input
            className={styles.searchInput}
            placeholder="Búsqueda por palabra clave"
            onChange={(e) => {
              handleChange(e, inputValue);
            }}
            value={inputValue}
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
