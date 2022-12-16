import React from 'react';

import { Button } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/buttons/button/types';

import { projectHeadersEmp } from '../constants';
import styles from './tableProject.module.css';
import { TableProjectProps } from './types';

const TableProject = (props: TableProjectProps) => {
  const { projectList } = props;
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            {projectHeadersEmp?.map((header, index) => {
              return (
                <th className={styles.header} key={index}>
                  {header.header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {projectList?.map((data) => {
            return (
              <tr key={data.id}>
                {projectHeadersEmp.map((header, index) => {
                  return (
                    <td className={styles.rows} key={index}>
                      {data[header.key]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={styles.viewMore}>
        <Button
          testId="viewMoreButton"
          materialVariant={Variant.TEXT}
          onClick={() => undefined}
          label="Ver más"
        />
      </div>
    </div>
  );
};

export default TableProject;
