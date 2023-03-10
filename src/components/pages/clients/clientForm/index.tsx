import { format } from 'date-fns';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { joiResolver } from '@hookform/resolvers/joi';

import styles from 'src/components/pages/clients/clientForm/clientsForm.module.css';
import validations from 'src/components/pages/clients/validations';
import CustomNotifications from 'src/components/shared/common/customNotificationForm';
import { Resource } from 'src/components/shared/common/customNotificationForm/types';
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
import { getByFilterResourceRequest } from 'src/config/api';
import { UiRoutes } from 'src/constants';
import { clearSelectedClient } from 'src/redux/client/actions';
import { addClient, editClient, getClientsById } from 'src/redux/client/thunks';
import { RootState, useAppSelector } from 'src/redux/store';
import {
  closeConfirmationModal,
  closeFormModal,
  openConfirmationModal,
  openFormModal,
  setSnackbarOperation,
} from 'src/redux/ui/actions';
import { AppDispatch, Resources } from 'src/types';
import { capitalizeFirstLetter } from 'src/utils/formatters';

import { FormValues } from '../types';
import { clientsProjectsHeaders } from './constants';

const ClientForm = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch: AppDispatch<null> = useDispatch();

  const showNotificationModal = useAppSelector((state: RootState) => state.ui.showFormModal);
  const selectedClient = useAppSelector((state: RootState) => state.client?.selectedClient);
  const showConfirmModal = useAppSelector((state: RootState) => state.ui.showConfirmModal);
  const snackbarOperation = useAppSelector((state: RootState) => state.ui.snackbarOperation);
  const showAlert = useAppSelector((state: RootState) => state.ui.showSuccessErrorAlert);
  const notificationError = useAppSelector((state: RootState) => state.notification.error);

  const [endDateDisabled, setEndDateDisabled] = useState(false);
  const [changed, setChanged] = useState(false);
  const [clientNameValidation, setClientNameValidation] = useState(false);

  const nameValidationTrigger = async () => {
    await trigger('name');
  };

  const endDateValidationTrigger = async () => {
    await trigger('relationshipEnd');
  };

  useEffect(() => {
    if (getValues('name')) {
      nameValidationTrigger();
    }
  }, [clientNameValidation]);

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
      setEndDateDisabled(!selectedClient.relationshipEnd);
    }
  }, [selectedClient]);

  const {
    formState: { isDirty },
    handleSubmit,
    control,
    reset,
    trigger,
    getValues,
    watch,
  } = useForm<FormValues>({
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
    resolver: joiResolver(validations.clientValidation(clientNameValidation)),
  });

  const startDate = watch('relationshipStart');

  useEffect(() => {
    endDateValidationTrigger();
  }, [startDate]);

  const nameChangeHandler = useCallback(
    debounce(async (e, client) => {
      const inputValue = e.target.value.trim();
      if (id && inputValue.toLowerCase() === client.name.toLowerCase()) {
        return;
      }
      try {
        const response = await getByFilterResourceRequest('/clients/clientExists', {
          name: inputValue,
        });

        if (!response.error) {
          setClientNameValidation(false);
        }
      } catch (error: any) {
        setClientNameValidation(true);
      }
    }, 500),
    [],
  );

  const latestClientsActiveProjects = selectedClient?.projects
    ?.filter((item) => item.isActive)
    .reverse()
    .slice(-2);

  const formattedProjects = latestClientsActiveProjects?.map((item) => ({
    id: item?._id ?? '-',
    name: item?.projectName ?? '-',
    isCritic: item?.isCritic ?? '-',
    startDate: item?.startDate ? format(new Date(item?.startDate), 'yyy/MM/dd') : '-',
    endDate: item?.endDate ? format(new Date(item?.endDate), 'yyy/MM/dd') : '-',
  }));

  const showProjectTable = Boolean(latestClientsActiveProjects?.length && id);

  const onSubmit = async (data) => {
    const options = {
      id: id,
      body: JSON.stringify({
        name:
          !id || !data.name
            ? capitalizeFirstLetter(getValues('name')).trim()
            : capitalizeFirstLetter(data.name).trim(),
        localContact: {
          name: data.localContact.name,
          email: data.localContact.email,
        },
        clientContact: {
          name: data.clientContact.name,
          email: data.clientContact.email,
        },
        relationshipStart: data.relationshipStart,
        relationshipEnd: endDateDisabled ? null : data.relationshipEnd,
        notes: data.notes,
        isActive: true,
      }),
    };
    if (id) {
      await dispatch(editClient(options));
      dispatch(setSnackbarOperation('editado'));
    } else {
      await dispatch(addClient(options));
      dispatch(setSnackbarOperation('agregado'));
    }
    dispatch(closeConfirmationModal());
    onClose();
  };

  const onClose = () => {
    handleNavigation(`${UiRoutes.ADMIN}${UiRoutes.CLIENTS}`);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleEndDateDisable = (data) => {
    setEndDateDisabled(data);
  };

  const formChanged = Boolean(!isDirty && id && !changed);

  return (
    <div className={styles.container}>
      <div className={styles.welcomeMessage}>
        <div>{id ? `Editar ${selectedClient?.name}` : 'Nuevo Cliente'}</div>
        <div
          className={id && styles.bellIcon}
          onClick={() => (id ? dispatch(openFormModal()) : undefined)}
        >
          <BellIcon color={id ? '#373867' : '#CBCBD7'} />
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
                  handleOnChange={(e) => nameChangeHandler(e, selectedClient)}
                />
              </div>
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
                      changed={changed}
                      setChanged={() => setChanged(!changed)}
                      endDateDisabled={endDateDisabled}
                      handleEndDateDisable={handleEndDateDisable}
                      resource={Resources.Clientes}
                    />
                  </div>
                  <div>
                    <DatePicker
                      label={'Fin'}
                      testId={'endDatePickerTestId'}
                      name="relationshipEnd"
                      minDate={startDate}
                      control={control}
                      disabled={endDateDisabled}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.secondWrapperInputs}>
              <div>
                <div className={`${styles.inputs} ${styles.leftInput}`}>
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
                    testId={'clientEmailInput'}
                    label="Email cliente"
                    name="clientContact.email"
                    type={'text'}
                    variant="outlined"
                    placeholder="Email del contacto del cliente"
                    fullWidth
                  />
                </div>
              </div>
              <div>
                <div className={`${styles.inputs} ${styles.leftInput}`}>
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
          </div>
          <div className={styles.rightContainer}>
            {showProjectTable && (
              <div className={styles.tableContainer}>
                <span>??ltimos proyectos</span>
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
                    label="Ver m??s"
                  />
                </div>
              </div>
            )}
            <div className={styles.notes}>
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
              disabled={formChanged}
            />
          </div>
        </div>
      </div>
      <div>
        <Modal
          testId={'client-custom-notification'}
          isOpen={showNotificationModal}
          onClose={() => dispatch(closeFormModal())}
        >
          <CustomNotifications resource={Resource.CLIENT} id={id} />
        </Modal>
      </div>
      <Modal
        testId="editClientModal"
        styles={styles.modal}
        isOpen={!showNotificationModal && showConfirmModal}
        onClose={() => dispatch(closeConfirmationModal())}
      >
        <ConfirmationMessage
          description={`??Desea editar al cliente ${selectedClient.name}?`}
          title={'Editar Cliente'}
          handleConfirm={handleSubmit(onSubmit)}
          handleClose={() => dispatch(closeConfirmationModal())}
        />
      </Modal>
      <SuccessErrorMessage
        open={showAlert}
        error={notificationError}
        resource={Resources.Notificaciones}
        operation={snackbarOperation}
      />
    </div>
  );
};

export default ClientForm;
