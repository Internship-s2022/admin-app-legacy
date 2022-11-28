import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { joiResolver } from '@hookform/resolvers/joi';

import styles from 'src/components/pages/clients/clientForm/clientsForm.module.css';
import validations from 'src/components/pages/clients/validations';
import {
  Button,
  ConfirmationMessage,
  DatePicker,
  Modal,
  SuccessErrorMessage,
  TextInput,
} from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/buttons/button/types';
import BellIcon from 'src/components/shared/ui/icons/bellIcon';
import EndDateCheckbox from 'src/components/shared/ui/inputs/endDateCheckbox';
import { UiRoutes } from 'src/constants';
import { clearSelectedClient } from 'src/redux/client/actions';
import { addClient, editClient, getClientsById } from 'src/redux/client/thunks';
import { RootState } from 'src/redux/store';
import { closeConfirmationModal, openConfirmationModal } from 'src/redux/ui/actions';
import { AppDispatch, Resources } from 'src/types';

import { FormValues } from '../types';
import { clientsProjectsHeaders } from './constants';

const ClientForm = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch: AppDispatch<null> = useDispatch();

  const selectedClient = useSelector((state: RootState) => state.client?.selectedClient);
  const clientError = useSelector((state: RootState) => state.client.error);
  const showAlert = useSelector((state: RootState) => state.ui.showSuccessErrorAlert);

  const operation = id ? 'editado' : 'agregado';
  const showConfirmModal = useSelector((state: RootState) => state.ui.showConfirmModal);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    id && dispatch(getClientsById(id));
    return () => {
      dispatch(clearSelectedClient());
    };
  }, []);

  useEffect(() => {
    if (Object.keys(selectedClient).length) {
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
  }, [selectedClient]);

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
      relationshipStart: null,
      relationshipEnd: null,
      notes: '',
      isActive: true,
    },
    mode: 'onBlur',
    resolver: joiResolver(validations.clientValidation),
  });

  const latestClientsList = selectedClient?.projects?.slice(-2);

  const formattedProjects = latestClientsList?.map((item) => ({
    id: item?._id ?? '-',
    name: item?.projectName ?? '-',
    isCritic: item?.isCritic ?? '-',
    startDate: item?.startDate ? format(new Date(item?.startDate), 'yyy/MM/dd') : '-', //TO DO: ESTA FECHA ME QUEDA UN DIA ANTES DE LO PENSADO
    endDate: item?.endDate ? format(new Date(item?.endDate), 'yyy/MM/dd') : '-', //TO DO: ESTA FECHA ME QUEDA UN DIA ANTES DE LO PENSADO
  }));

  const onSubmit = (data) => {
    id ? dispatch(editClient({ body: data, id: id })) : dispatch(addClient(data));
    dispatch(closeConfirmationModal());
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
        <div>{id ? `Editar ${selectedClient?.name}` : 'Nuevo Cliente'}</div>
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
                  placeholder="Nombre de la empresa"
                  name="name"
                  type={'text'}
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className={styles.inputs}>
                <TextInput
                  control={control}
                  testId={'clientContactInput'}
                  label="Contacto cliente"
                  placeholder="Nombre y apellido del contacto del cliente"
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
                  placeholder="Nombre y apellido del contacto de Radium Rocket"
                  name="localContact.name"
                  type={'text'}
                  variant="outlined"
                  fullWidth
                />
              </div>
            </div>
            <div className={styles.leftColumns}>
              <div className={styles.dateContainer}>
                <div className={styles.datePickers}>
                  <div>
                    <DatePicker
                      label={'Inicio'}
                      testId={'startDatePickerTestId'}
                      name="relationshipStart"
                      control={control}
                    />
                    <EndDateCheckbox
                      isDisabled={isDisabled}
                      setIsDisabled={setIsDisabled}
                      resource={Resources.Clientes}
                    />
                  </div>
                  <div>
                    <DatePicker
                      label={'Fin'}
                      testId={'endDatePickerTestId'}
                      name="relationshipEnd"
                      control={control}
                      disabled={isDisabled}
                      disableFuture={isDisabled}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.inputs}>
                <TextInput
                  control={control}
                  testId={'clientEmailInput'}
                  label="Email cliente"
                  name="clientContact.email"
                  type={'text'}
                  variant="outlined"
                  placeholder="Email del contacto del cliente"
                  fullWidth
                />
              </div>
              <div className={styles.inputs}>
                <TextInput
                  control={control}
                  testId={'localEmailInput'}
                  label="Email Radium Rocket"
                  name="localContact.email"
                  type={'text'}
                  variant="outlined"
                  placeholder="Email del contacto de Radium Rocket"
                  fullWidth
                />
              </div>
            </div>
          </div>
          <div className={styles.rightContainer}>
            {id && (
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
                <div className={styles.viewMore}>
                  <Button
                    testId="viewMoreButton"
                    materialVariant={Variant.TEXT}
                    onClick={() => undefined}
                    label="Ver más"
                  />
                </div>
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
              onClick={
                selectedClient._id
                  ? () => dispatch(openConfirmationModal())
                  : handleSubmit(onSubmit)
              }
              label="Confirmar"
            />
          </div>
        </div>
      </div>
      <SuccessErrorMessage
        open={showAlert}
        error={clientError}
        resource={Resources.Clientes}
        operation={operation}
      />
      <Modal
        testId="editClientModal"
        styles={styles.modal}
        isOpen={showConfirmModal}
        onClose={() => dispatch(closeConfirmationModal())}
      >
        <ConfirmationMessage
          description={`¿Desea editar al cliente ${selectedClient.name}?`}
          title={'Editar Cliente'}
          handleConfirm={handleSubmit(onSubmit)}
          handleClose={() => dispatch(closeConfirmationModal())}
        />
      </Modal>
    </div>
  );
};

export default ClientForm;
