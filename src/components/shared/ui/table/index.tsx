import React from 'react';
import {
  Table as BasicTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import { TableProps } from './types';

const Table = (props: TableProps): JSX.Element => {
  const { headers, value, testId } = props;
  return (
    <TableContainer id={testId}>
      <BasicTable>
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell key={index}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {value.map((cell, index) => (
              <TableCell key={index}>{cell}</TableCell>
            ))}
          </TableRow>
        </TableBody>
      </BasicTable>
    </TableContainer>
  );
};

export default Table;
