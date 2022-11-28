import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Tabs } from '@mui/material';

import { navbarItems } from 'src/constants';
import { closeMessageAlert } from 'src/redux/ui/actions';
import { AppDispatch } from 'src/types';

import LinkTab from './linkTab';

const Navbar = () => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState<number>(0);

  const dispatch: AppDispatch<null> = useDispatch();

  const handleChange = (_: React.SyntheticEvent, value: number) => {
    setValue(value);
  };

  const userRole = localStorage.getItem('role');

  const handleNavigation = (path) => {
    navigate(path);
    dispatch(closeMessageAlert());
  };

  return (
    <Box>
      <Tabs textColor="secondary" indicatorColor="primary" value={value} onChange={handleChange}>
        {navbarItems[userRole]?.map((item) => {
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
