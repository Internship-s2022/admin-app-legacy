import { format } from 'date-fns';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { joiResolver } from '@hookform/resolvers/joi';

import styles from 'src/components/pages/clients/clientForm/clientsForm.module.css';
import validations from 'src/components/pages/clients/validations';
import { Button, DatePicker, TextInput } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/buttons/button/types';
import BellIcon from 'src/components/shared/ui/icons/bellIcon';
import { UiRoutes } from 'src/constants';
import { addClient, editClient } from 'src/redux/client/thunks';
import { RootState } from 'src/redux/store';
import { AppDispatch } from 'src/types';

import { FormValues } from '../types';
import { clientsProjectsHeaders } from './constants';

const ClientForm = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch<null> = useDispatch();
  const selectedClientId = useSelector((state: RootState) => state.client?.selectedClientId);
  const selectedClient = useSelector((state: RootState) =>
    state.client?.list.find((item) => item?._id === selectedClientId),
  );

  useEffect(() => {
    if (selectedClient) {
      reset({
        name: selectedClient.name,
        localContact: {
          name: selectedClient.localContact.name,
          email: selectedClient.localContact.email,
        },
        clientContact: {
          name: selectedClient.clientContact.name,
          email: selectedClient.clientContact.email,
        },
        relationshipStart: selectedClient.relationshipStart,
        relationshipEnd: selectedClient.relationshipEnd,
        notes: selectedClient.notes,
        isActive: true,
      });
    }
  }, []);

  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: {
      name: '',
      localContact: {
        name: '',
        email: '',
      },
      clientContact: {
        name: '',
        email: '',
      },
      relationshipStart: new Date(Date.now()),
      notes: '',
      isActive: true,
    },
    mode: 'onBlur',
    resolver: joiResolver(validations.clientValidation),
  });

  const projectsList = selectedClient?.projects;

  const formattedProjects = projectsList?.map((item) => ({
    id: item?._id ?? '-',
    name: item?.projectName ?? '-',
    isCritic: item?.isCritic ?? '-',
    startDate: item?.startDate ? format(new Date(item?.startDate), 'yyy/MM/dd') : '-', //ESTA FECHA ME QUEDA UN DIA ANTES DE LO PENSADO
    endDate: item?.endDate ? format(new Date(item?.endDate), 'yyy/MM/dd') : '-', //ESTA FECHA ME QUEDA UN DIA ANTES DE LO PENSADO
  }));

  const onSubmit = (data) => {
    selectedClient
      ? dispatch(editClient({ body: data, id: selectedClient?._id }))
      : dispatch(addClient(data));
    onClose();
  };

  const onClose = () => {
    handleNavigation(`${UiRoutes.ADMIN}${UiRoutes.CLIENTS}`);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className={styles.container}>
      <div className={styles.welcomeMessage}>
        <div>{selectedClient ? `Update ${selectedClient.name}'s data` : 'Add Client'}</div>
        <div className={styles.bellIcon}>
          <BellIcon />
        </div>
      </div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.leftContainer}>
            <div className={styles.leftColumns}>
              <div className={styles.inputs}>
                <TextInput
                  control={control}
                  testId={'clientNameInput'}
                  label="Cliente"
                  placeholder="Nombre del ciente"
                  name="name"
                  type={'text'}
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className={styles.inputs}>
                <TextInput
                  control={control}
                  testId={'clientEmailInput'}
                  label="Email contacto cliente"
                  name="clientContact.email"
                  type={'text'}
                  variant="outlined"
                  placeholder="Email de contacto de cliente"
                  fullWidth
                />
              </div>
              <div className={styles.inputs}>
                <TextInput
                  control={control}
                  testId={'localEmailInput'}
                  label="Email contacto Radium Rocket"
                  name="localContact.email"
                  type={'text'}
                  variant="outlined"
                  placeholder="Email de contacto de Radium Rocket"
                  fullWidth
                />
              </div>
            </div>
            <div className={styles.leftColumns}>
              <div className={styles.inputs}>
                <TextInput
                  control={control}
                  testId={'clientContactInput'}
                  label="Contacto cliente"
                  placeholder="Nombre del contacto del ciente"
                  name="clientContact.name"
                  type={'text'}
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className={styles.inputs}>
                <TextInput
                  control={control}
                  testId={'localContactInput'}
                  label="Contacto Radium Rocket"
                  placeholder="Nombre del contacto del Radium Rocket"
                  name="localContact.name"
                  type={'text'}
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className={styles.dateContainer}>
                <div className={styles.inputs}>
                  <DatePicker
                    label={'Inicio'}
                    testId={'startDatePickerTestId'}
                    name="relationshipStart"
                    control={control}
                  />
                </div>
                <div className={styles.inputs}>
                  <DatePicker
                    label={'Fin'}
                    testId={'endDatePickerTestId'}
                    name="relationshipEnd"
                    control={control}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.rightContainer}>
            {selectedClient && (
              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      {clientsProjectsHeaders?.map((header, index) => {
                        return (
                          <th className={styles.header} key={index}>
                            {header.header}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {formattedProjects?.map((data) => {
                      return (
                        <tr key={data.id}>
                          {clientsProjectsHeaders.map((header, index) => {
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
              </div>
            )}
            <TextInput
              control={control}
              testId={'notesInput'}
              label="Notas"
              name="notes"
              type={'text'}
              variant="outlined"
              fullWidth
              multiline
              rows={5}
            />
          </div>
        </form>
        <div className={styles.buttonContainer}>
          <div>
            <Button
              testId="cancelButton"
              materialVariant={Variant.OUTLINED}
              onClick={() => onClose()}
              label="Cancelar"
            />
          </div>
          <div>
            <Button
              testId="confirmButton"
              materialVariant={Variant.CONTAINED}
              onClick={handleSubmit(onSubmit)}
              label="Confirmar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientForm;
