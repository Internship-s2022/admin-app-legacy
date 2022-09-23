import React, { FC } from 'react';
import { Button } from '@mui/material';

interface BtnProps {
  onClick: () => void;
  label: string;
  disabled: boolean;
}

const Buttons: FC<BtnProps> = (props) => {
  const { onClick, label, disabled } = props;
  return (
    <Button variant="contained" onClick={onClick} disabled={disabled}>
      {label}
    </Button>
  );
};

export default Buttons;
