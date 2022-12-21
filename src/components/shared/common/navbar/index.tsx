import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Tabs } from '@mui/material';

import { navbarItems } from 'src/constants';
import { RootState } from 'src/redux/store';
import { closeMessageAlert } from 'src/redux/ui/actions';
import { AppDispatch } from 'src/types';

import LinkTab from './linkTab';

const Navbar = () => {
  const navigate = useNavigate();
  const pathValue = useLocation().pathname;
  const userRole = useSelector((state: RootState) => state.auth.authUser.accessRoleType);
  const [value, setValue] = React.useState<number>(null);
  const dispatch: AppDispatch<null> = useDispatch();

  useEffect(() => {
    const initialValue = navbarItems[userRole]?.findIndex((route) =>
      pathValue.includes(route.path),
    );

    setValue(initialValue);
  }, []);

  const handleChange = (_: React.SyntheticEvent, value: number) => {
    setValue(value);
  };

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
