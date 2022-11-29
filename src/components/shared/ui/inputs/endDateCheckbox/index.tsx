import React from 'react';

import { cutLastLetter } from 'src/utils/formatters';

import styles from './EndDateCheckbox.module.css';
import { EndDateCheckboxProps } from './types';

const EndDateCheckbox = (props: EndDateCheckboxProps) => {
  const { setIsDisabled, isDisabled, resource } = props;
  return (
    <div className={styles.container}>
      <input type="checkbox" onClick={() => setIsDisabled(!isDisabled)} />
      <span className={styles.checkboxMsg}>{cutLastLetter(resource)} long term</span>
    </div>
  );
};

export default EndDateCheckbox;
