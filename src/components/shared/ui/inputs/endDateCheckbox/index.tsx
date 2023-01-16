import React from 'react';

import { cutLastLetter } from 'src/utils/formatters';

import styles from './EndDateCheckbox.module.css';
import { EndDateCheckboxProps } from './types';

const EndDateCheckbox = (props: EndDateCheckboxProps) => {
  const { handleEndDateDisable, endDateDisabled, resource, setChanged, changed } = props;

  return (
    <div className={styles.container}>
      <input
        onChange={() => setChanged(!changed)}
        type="checkbox"
        checked={endDateDisabled}
        onClick={() => handleEndDateDisable(!endDateDisabled)}
      />
      <span className={styles.checkboxMsg}>{cutLastLetter(resource)} long term</span>
    </div>
  );
};

export default EndDateCheckbox;
