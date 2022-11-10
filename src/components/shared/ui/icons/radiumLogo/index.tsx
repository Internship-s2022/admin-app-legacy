import React from 'react';

import { LogoProps } from './types';

const RadiumLogo = (props: LogoProps): JSX.Element => {
  const { testId } = props;
  return (
    <div data-testid={testId} color="primary">
      <img src="assets/images/Logo.png" alt="radium logo" />
    </div>
  );
};

export default RadiumLogo;
