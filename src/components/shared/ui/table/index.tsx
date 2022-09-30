import React from 'react';
import {
  Table as BasicTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import { Button } from '../index';
import styles from './table.module.css';
import { TableProps } from './types';

const Table = (props: TableProps): JSX.Element => {
  const { buttonLabel, buttonVariant, buttonTestId, onClick, applyButton, headers, value, testId } =
    props;
  return (
    <>
      <TableContainer id={testId}>
        <BasicTable>
          <TableHead>
            <TableRow className={styles.headers}>
              {headers.map((header, index) => (
                <TableCell key={index}>{header[index]}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className={styles.body}>
            {value.map((row, index) => {
              if (row)
                return (
                  <TableRow key={index} className={styles.row}>
                    {headers.map((header, index) => {
                      return <TableCell key={index}>{row[header]}</TableCell>;
                    })}
                    {applyButton && (
                      <TableCell>
                        <Button
                          materialVariant={buttonVariant}
                          onClick={onClick}
                          label={buttonLabel}
                          testId={buttonTestId}
                        />
                      </TableCell>
                    )}
                  </TableRow>
                );
            })}
          </TableBody>
        </BasicTable>
      </TableContainer>
    </>
  );
};

export default Table;

// {value.map((cell, index) => (
//   <TableRow className={styles.row} key={index}>
//     <TableCell>{cell.prop}</TableCell>
//     {/* <TableCell>{cell.role}</TableCell> */}
//
//   </TableRow>
// ))}
