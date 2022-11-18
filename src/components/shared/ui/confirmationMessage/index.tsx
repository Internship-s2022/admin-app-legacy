import * as React from 'react';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';

import { cutLastLetter } from 'src/utils/formatters';

import { ConfirmationMessageProps } from './types';

const AlertMsg = (props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
};
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(AlertMsg);

const ConfirmationMessage = (props: ConfirmationMessageProps) => {
  const { error, open, setOpen, resource, operation } = props;

  const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const message = error ? error.message : `${cutLastLetter(resource)} ${operation} con éxito.`;

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={error ? 'error' : 'success'} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default ConfirmationMessage;
