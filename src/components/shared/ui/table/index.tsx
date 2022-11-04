import React from 'react';
import {
  Avatar,
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
  const { showButtons, headers, value, testId, buttons, profileIcon } = props;
  return (
    <TableContainer id={testId}>
      <BasicTable className={styles.table}>
        <TableHead>
          <TableRow className={styles.headers}>
            {profileIcon && <TableCell align="center"></TableCell>}
            {headers.map((row) => (
              <TableCell align="center" key={row.key}>
                {row.header}
              </TableCell>
            ))}
            {showButtons && <TableCell></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {value?.map((row) => (
            <TableRow className={styles.rows} key={row['id']} hover={true}>
              {profileIcon && <Avatar className={styles.icon}></Avatar>}
              {headers.map((header, index) => (
                <TableCell align="center" key={index} scope="row">
                  {row[header.key]}
                </TableCell>
              ))}
              {buttons?.length && (
                <TableCell align="right" className={styles.buttonCell}>
                  {buttons.map(
                    (button, index) =>
                      button.active && (
                        <Button
                          key={index}
                          materialVariant={button.variant}
                          onClick={() => button.onClick(row)}
                          label={button.label}
                          testId={button.testId}
                        />
                      ),
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </BasicTable>
    </TableContainer>
  );
};

export default Table;
