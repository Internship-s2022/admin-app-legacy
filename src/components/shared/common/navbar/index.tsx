import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import { navbarItems } from 'src/constants';

import { tabTheme } from './themes';
import { LinkTabProps } from './types';

const Navbar = () => {
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
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, value: number) => {
    setValue(value);
  };
  return (
    <Box>
      <ThemeProvider theme={tabTheme}>
        <Tabs
          textColor="primary"
          indicatorColor="secondary"
          value={value}
          onChange={handleChange}
          aria-label="lab API tabs example"
        >
          {navbarItems.map((item) => {
            return <LinkTab key={item.name} label={item.name} href={item.path}></LinkTab>;
          })}
        </Tabs>
      </ThemeProvider>
    </Box>
  );
};

export default Navbar;
