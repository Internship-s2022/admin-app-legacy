import React from 'react';

import { cutLastLetter } from 'src/utils/formatters';

import { EndDateCheckboxProps } from './types';

const EndDateCheckbox = (props: EndDateCheckboxProps) => {
  const { setIsDisabled, isDisabled, resource } = props;
  return (
    <div>
      <input type="checkbox" onClick={() => setIsDisabled(!isDisabled)} />
      <span>{cutLastLetter(resource)} long term</span>
    </div>
  );
};

export default EndDateCheckbox;
