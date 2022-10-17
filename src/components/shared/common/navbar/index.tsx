import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Tabs } from '@mui/material';

import { navbarItems } from 'src/constants';

import LinkTab from './linkTab';

const Navbar = () => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState<number>(0);

  const handleChange = (_: React.SyntheticEvent, value: number) => {
    setValue(value);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  useEffect(() => {
    handleNavigation('/');
  }, []);

  return (
    <Box>
      <Tabs textColor="secondary" indicatorColor="primary" value={value} onChange={handleChange}>
        {navbarItems.map((item) => {
          return (
            <LinkTab
              handleNavigation={handleNavigation}
              key={item.name}
              label={item.name}
              href={item.path}
            ></LinkTab>
          );
        })}
      </Tabs>
    </Box>
  );
};

export default Navbar;
