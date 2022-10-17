import React from 'react';
import { Tab } from '@mui/material';

import styles from './linkTab.module.css';
import { LinkTabProps } from './types';

const LinkTab = (props: LinkTabProps) => {
  const { handleNavigation, href } = props;

  return (
    <Tab
      className={styles.unselectedTab}
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        handleNavigation(href);
      }}
      {...props}
    ></Tab>
  );
};

export default LinkTab;
