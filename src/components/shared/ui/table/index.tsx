import React from 'react';
import {
  Avatar,
  IconButton,
  Table as BasicTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';

import Button from '../buttons/button';
import styles from './table.module.css';
import { RowData, SortBy, TableProps } from './types';

const Table = <T extends RowData>(props: TableProps<T>) => {
  const { showButtons, headers, value, testId, buttons, profileIcon, setDataList, isActive } =
    props;

  const [order, setOrder] = React.useState<SortBy>({ dir: 'asc' });

  const sorting = (col) => {
    if (order.dir === 'asc') {
      const sorted = [...value].sort((a, b) =>
        a[col]?.toLowerCase() > b[col]?.toLowerCase() ? 1 : -1,
      );
      setDataList(sorted);
      setOrder({ dir: 'desc' });
    }
    if (order.dir === 'desc') {
      const sorted = [...value].sort((a, b) =>
        a[col]?.toLowerCase() < b[col]?.toLowerCase() ? 1 : -1,
      );
      setDataList(sorted);
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
                <TableSortLabel
                  data-testid={row.header}
                  onClick={() => sorting(row.key)}
                  direction={order.dir}
                >
                  {row.header}
                </TableSortLabel>
              </TableCell>
            ))}
            {showButtons && <TableCell></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {value?.map((row) => (
            <TableRow className={styles.rows} key={row['id'] || row['_id']} hover={true}>
              {profileIcon && (
                <TableCell>
                  <Avatar className={styles.icon}></Avatar>
                </TableCell>
              )}
              {headers.map((header, index) => (
                <TableCell
                  align="center"
                  key={index}
                  scope="row"
                  className={!isActive && styles.inactiveRows}
                >
                  {row[header.key]}
                </TableCell>
              ))}
              {buttons?.length && (
                <TableCell align="right" className={styles.buttonCell}>
                  {buttons.map((button, index) =>
                    button.active && button.icon ? (
                      <IconButton key={index} onClick={() => button.onClick(row)}>
                        {button.icon}
                      </IconButton>
                    ) : (
                      <Button
                        materialVariant={button.variant}
                        testId={button.testId}
                        onClick={() => button.onClick(row)}
                        label={button.label}
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
