import React from 'react';
import {
  IconButton,
  Table as BasicTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';

import { Button } from '../index';
import styles from './table.module.css';
import { RowData, TableProps } from './types';

const Table = <T extends RowData>(props: TableProps<T>) => {
  const { showButtons, headers, value, testId } = props;
  return (
    <>
      <TableContainer id={testId}>
        <BasicTable>
          <TableHead>
            <TableRow className={styles.headers}>
              {headers.map((row) => (
                <TableCell key={row.key}>{row.header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {value.map((row) => (
              <TableRow key={row['id']} hover={true}>
                {headers.map((header, index) => (
                  <TableCell key={index} scope="row" className={styles.cell}>
                    {row[header.key]}
                  </TableCell>
                ))}
                {showButtons && (
                  <TableCell className={styles.cell}>
                    {props.buttons.map(
                      (btn, index) =>
                        btn.active && (
                          <Tooltip key={index} title={btn.title}>
                            <IconButton onClick={btn.onClick}>{btn.icon}</IconButton>
                          </Tooltip>
                        ),
                    )}
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
