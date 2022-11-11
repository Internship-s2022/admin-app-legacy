import React, { useMemo, useState } from 'react';

import SearchIcon from '../icons/searchIcon/searchIcon';
import { SearchBarProps } from './constants';
import styles from './searchbar.module.css';

const SearchBar = (props: SearchBarProps): JSX.Element => {
  const { details, setFilteredList, mainArray } = props;
  const [filter, setFilter] = useState('');
  const [inputValue, setInputValue] = useState('');

  useMemo(() => {
    const filterList = details.filter((d) =>
      mainArray.some((field) => d[field]?.toLowerCase().includes(filter.toLowerCase())),
    );
    console.log('filteredList', filterList);
    setFilteredList(filterList);
  }, [filter]);

  return (
    <>
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
    </>
  );
};

export default SearchBar;
