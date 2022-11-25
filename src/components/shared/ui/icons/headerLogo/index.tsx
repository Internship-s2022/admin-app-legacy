import React from 'react';

import { HeaderLogoProps } from './types';
const HeaderLogo = (props: HeaderLogoProps): JSX.Element => {
  const { testId } = props;
  return (
    <div data-testid={testId} color="primary">
      <img src={`${process.env.PUBLIC_URL}/assets/images/headerLogo.png`} alt="radium logo" />
    </div>
  );
};

export default HeaderLogo;
