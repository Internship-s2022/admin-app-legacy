import React from 'react';
import { Box, Tabs } from '@mui/material';

import { navbarItems } from 'src/constants';

import LinkTab from './linkTab';

const Navbar = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (_: React.SyntheticEvent, value: number) => {
    setValue(value);
  };

  return (
    <Box>
      <Tabs
        textColor="secondary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        aria-label="lab API tabs example"
      >
        {navbarItems.map((item) => {
          return <LinkTab key={item.name} label={item.name} href={item.path}></LinkTab>;
        })}
      </Tabs>
    </Box>
  );
};

export default Navbar;
