import React from 'react';

import { LogoProps } from './types';

const LoginLogo = (props: LogoProps): JSX.Element => {
  const { testId } = props;
  return (
    <div data-testid={testId} color="primary">
      <img src={`${process.env.PUBLIC_URL}/assets/images/Logo.png`} alt="radium logo" />
    </div>
  );
};

export default LoginLogo;
