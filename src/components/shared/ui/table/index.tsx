import React, { useEffect } from 'react';
import {
  Avatar,
  Table as BasicTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';

import { Button } from '../index';
import styles from './table.module.css';
import { RowData, SortBy, TableProps } from './types';

const Table = <T extends RowData>(props: TableProps<T>) => {
  const { showButtons, headers, value, testId, buttons, profileIcon } = props;

  useEffect(() => {
    setData(value);
  }, [value]);

  const [data, setData] = React.useState(value);
  const [order, setOrder] = React.useState<SortBy>({ dir: 'asc' });

  const sorting = (col) => {
    if (order.dir === 'asc') {
      const sorted = [...data].sort((a, b) =>
        a[col]?.toLowerCase() > b[col]?.toLowerCase() ? 1 : -1,
      );
      setData(sorted);
      setOrder({ dir: 'desc' });
    }
    if (order.dir === 'desc') {
      const sorted = [...data].sort((a, b) =>
        a[col]?.toLowerCase() < b[col]?.toLowerCase() ? 1 : -1,
      );
      setData(sorted);
      setOrder({ dir: 'asc' });
    }

    return 0;
  };

  return (
    <TableContainer id={testId}>
      <BasicTable className={styles.table}>
        <TableHead>
          <TableRow className={styles.headers}>
            {profileIcon && <TableCell align="center"></TableCell>}
            {headers.map((row) => (
              <TableCell align="center" key={row.key}>
                <TableSortLabel onClick={() => sorting(row.key)} direction={order.dir}>
                  {row.header}
                </TableSortLabel>
              </TableCell>
            ))}
            {showButtons && <TableCell></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
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
