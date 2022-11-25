import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { joiResolver } from '@hookform/resolvers/joi';

import { Button, DatePicker, Dropdown, TextInput } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/buttons/button/types';
import ConfirmationMessage from 'src/components/shared/ui/confirmationMessage';
import { getEmployees } from 'src/redux/employee/thunk';
import { addMember } from 'src/redux/member/thunk';
import { RootState } from 'src/redux/store';
import { closeModal } from 'src/redux/ui/actions';
import { AppDispatch, Resources } from 'src/types';

import { roles } from './constants';
import styles from './memberForm.module.css';
import { AddMemberFormProps, FormValues, Role } from './types';
import { memberValidations } from './validations';

const AddMemberForm = (props: AddMemberFormProps) => {
  const { projectId } = props;
  const employeeList = useSelector((state: RootState) => state.employee.list);
  const memberError = useSelector((state: RootState) => state.member.error);

  const dispatch: AppDispatch<null> = useDispatch();
  const [openConfirmationMsg, setConfirmationMsgOpen] = React.useState(false);

  const employeeDropdown = employeeList.reduce((acc, item) => {
    if (item.user.isActive) {
      acc.push({ value: item._id, label: `${item.user.firstName} ${item.user.lastName}` });
    }
    return acc;
  }, []);

  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      employee: '',
      role: Role.DEV,
      memberDedication: 0,
      helper: {
        helperReference: '',
        dependency: 0,
        dedication: 0,
        isActive: true,
      },
      startDate: null,
      endDate: null,
      isActive: true,
    },
    mode: 'onBlur',
    resolver: joiResolver(memberValidations),
  });

  const onSubmit = (data) => {
    const { helper, ...rest } = data;
    const formattedData = {
      ...rest,
      project: projectId,
      helper: helper,
    };
    dispatch(addMember(formattedData));
    dispatch(closeModal());
    setConfirmationMsgOpen(true);
  };

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  return (
    <div className={styles.modalContainer}>
      <div className={styles.headerAddMember} data-testid={'headerMessage'}>
        Agregar miembro al proyecto
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.memberForm}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputsContainer}>
              <div className={styles.memberData}>
                <div className={styles.topContainer}>
                  <Dropdown
                    control={control}
                    testId={'employeeDropdown'}
                    label={'Empleado'}
                    name="employee"
                    options={employeeDropdown}
                    fullWidth
                  />
                </div>
                <div className={styles.bottomContainer}>
                  <Dropdown
                    control={control}
                    testId={'rolesDropdown'}
                    label={'Rol'}
                    name="role"
                    options={roles}
                    fullWidth
                  />
                  <TextInput
                    control={control}
                    testId={'memberDedication'}
                    label="Dedicacion"
                    name="memberDedication"
                    type={'number'}
                    variant="outlined"
                    fullWidth
                  />
                </div>
              </div>
              <div className={styles.helperData}>
                <div className={styles.topContainer}>
                  <Dropdown
                    control={control}
                    testId={'helper'}
                    label={'Ayudante'}
                    name="helper.helperReference"
                    options={employeeDropdown}
                    fullWidth
                  />
                </div>
                <div className={styles.bottomContainer}>
                  <TextInput
                    control={control}
                    testId={'dependency'}
                    label="Dependencia"
                    name="helper.dependency"
                    type={'number'}
                    variant="outlined"
                    fullWidth
                  />
                  <TextInput
                    control={control}
                    testId={'helperDedication'}
                    label="Dedicacion"
                    name="helper.dedication"
                    type={'number'}
                    variant="outlined"
                    fullWidth
                  />
                </div>
              </div>
            </div>
            <div className={styles.datePickers}>
              <DatePicker
                label={'Inicio'}
                testId={'startDate'}
                name="startDate"
                control={control}
              />
              <DatePicker label={'Fin'} testId={'endDate'} name="endDate" control={control} />
            </div>
            <div className={styles.buttonsContainer}>
              <div>
                <Button
                  testId="cancelButton"
                  materialVariant={Variant.OUTLINED}
                  onClick={() => dispatch(closeModal())}
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
            <ConfirmationMessage
              open={openConfirmationMsg}
              setOpen={setConfirmationMsgOpen}
              error={memberError}
              resource={Resources.Miembros}
              operation={'agregado'}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMemberForm;
