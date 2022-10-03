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
import { RowData, TableProps } from './types';

const Table = <T extends RowData>(props: TableProps<T>) => {
  const { showButtons, headers, value, testId, buttonTestId, buttonLabel, onClick, buttonVariant } =
    props;
  return (
    <>
      <TableContainer id={testId}>
        <BasicTable className={styles.table}>
          <TableHead>
            <TableRow className={styles.headers}>
              {headers.map((row) => (
                <TableCell align="center" key={row.key}>
                  {row.header}
                </TableCell>
              ))}
              {showButtons && <TableCell></TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {value.map((row) => (
              <TableRow className={styles.rows} key={row['id']} hover={true}>
                {headers.map((header, index) => (
                  <TableCell align="center" key={index} scope="row">
                    {row[header.key]}
                  </TableCell>
                ))}
                {showButtons && (
                  <TableCell align="right" className={styles.buttonCell}>
                    <Button
                      materialVariant={buttonVariant}
                      onClick={onClick}
                      label={buttonLabel}
                      testId={buttonTestId}
                    />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </BasicTable>
      </TableContainer>
    </>
  );
};

export default Table;
