import React from 'react';
import { Tab } from '@mui/material';

import { LinkTabProps } from './types';

const LinkTab = (props: LinkTabProps) => {
  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
};

export default LinkTab;
