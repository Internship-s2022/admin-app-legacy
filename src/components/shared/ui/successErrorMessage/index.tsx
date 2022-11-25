import * as React from 'react';
import { useDispatch } from 'react-redux';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';

import { closeMessageAlert } from 'src/redux/ui/actions';
import { AppDispatch } from 'src/types';
import { cutLastLetter } from 'src/utils/formatters';

import { SuccessErrorMessageProps } from './types';

const AlertMsg = (props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(AlertMsg);

const SuccessErrorMessage = (props: SuccessErrorMessageProps) => {
  const { error, open, resource, operation } = props;

  const dispatch: AppDispatch<null> = useDispatch();

  const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    dispatch(closeMessageAlert());
    if (reason === 'clickaway') {
      return;
    }
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

export default SuccessErrorMessage;
