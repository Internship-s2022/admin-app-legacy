import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { joiResolver } from '@hookform/resolvers/joi';

import {
  Button,
  DatePicker,
  Dropdown,
  SuccessErrorMessage,
  TextInput,
} from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/buttons/button/types';
import EndDateCheckbox from 'src/components/shared/ui/inputs/endDateCheckbox';
import { getEmployees } from 'src/redux/employee/thunk';
import { addMember, editMember } from 'src/redux/member/thunk';
import { RootState } from 'src/redux/store';
import { closeModal } from 'src/redux/ui/actions';
import { AppDispatch, Resources } from 'src/types';

import { roles } from './constants';
import styles from './memberForm.module.css';
import { FormValues, MemberFormProps, Role } from './types';
import { memberValidations } from './validations';

const MemberForm = (props: MemberFormProps) => {
  const { projectId, memberData } = props;

  const employeeList = useSelector((state: RootState) => state.employee.list);
  const memberError = useSelector((state: RootState) => state.member.error);
  const showAlert = useSelector((state: RootState) => state.ui.showSuccessErrorAlert);
  const [endDateDisabled, setEndDateDisabled] = useState(false);

  const dispatch: AppDispatch<null> = useDispatch();

  const employeeDropdownList = employeeList.reduce((acc, item) => {
    if (item?.user?.isActive) {
      acc.push({ value: item._id, label: `${item.user.firstName} ${item.user.lastName}` });
    }
    return acc;
  }, []);

  const { handleSubmit, control, reset, watch, setValue } = useForm<FormValues>({
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
      startDate: new Date(Date.now()),
      active: true,
    },
    mode: 'onBlur',
    resolver: joiResolver(memberValidations),
  });

  const currentHelperIndex = memberData?.helper?.findIndex((helper) => helper.isActive);

  useEffect(() => {
    memberData &&
      reset({
        employee: memberData.employee,
        role: memberData.role,
        memberDedication: memberData.memberDedication,
        helper: {
          helperReference:
            currentHelperIndex !== -1 ? memberData.helper[currentHelperIndex].helperReference : '',
          dependency:
            currentHelperIndex !== -1 ? memberData.helper[currentHelperIndex].dependency : 0,
          dedication:
            currentHelperIndex !== -1 ? memberData.helper[currentHelperIndex].dedication : 0,
          isActive: true,
        },
        startDate: memberData.startDate,
        endDate: memberData.endDate,
      });
    setEndDateDisabled(!memberData?.endDate);
  }, []);

  const selectedMember = watch('employee');
  const selectedHelper = watch('helper.helperReference');

  !selectedHelper && (setValue('helper.dedication', 0), setValue('helper.dependency', 0));

  const filterDropdownList = () => {
    const helperDropdownList = employeeDropdownList.filter(
      (employee) => employee.value !== selectedMember,
    );
    helperDropdownList.unshift({ value: '', label: 'Sin ayudante' });
    return helperDropdownList;
  };

  const onSubmit = (data) => {
    const { helper, employee, ...rest } = data;

    if (currentHelperIndex !== undefined && currentHelperIndex !== -1) {
      memberData.helper[currentHelperIndex].isActive = false;
    }
    if (memberData && helper.helperReference) {
      const helperIndex = memberData.helper?.findIndex(
        (item) => item?.helperReference === helper?.helperReference,
      );

      helperIndex !== -1
        ? (memberData.helper[helperIndex] = helper)
        : memberData.helper?.push(helper);
    }

    const formattedData = helper.helperReference
      ? {
          ...rest,
          employee: employee,
          project: projectId,
          helper: [helper],
          endDate: endDateDisabled ? null : data.endDate,
        }
      : {
          ...rest,
          employee: employee,
          endDate: endDateDisabled ? null : data.endDate,
          project: projectId,
        };

    const formattedDataEdit = {
      ...rest,
      helper: memberData?.helper,
      endDate: endDateDisabled ? null : data.endDate,
    };

    memberData
      ? dispatch(editMember({ id: memberData._id, body: formattedDataEdit }))
      : dispatch(addMember(formattedData));
    dispatch(closeModal());
  };

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  const handleEndDateDisable = (data) => {
    setEndDateDisabled(data);
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.headerAddMember} data-testid={'headerMessage'}>
        {memberData ? 'Editar miembro' : 'Agregar miembro al proyecto'}
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
                    options={employeeDropdownList}
                    fullWidth
                    disabled={memberData ? true : false}
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
                    options={filterDropdownList()}
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
              <div>
                <DatePicker
                  label={'Inicio'}
                  testId={'startDate'}
                  name="startDate"
                  control={control}
                />
                <EndDateCheckbox
                  endDateDisabled={endDateDisabled}
                  handleEndDateDisable={handleEndDateDisable}
                  resource={Resources.Miembros}
                />
              </div>
              <div>
                <DatePicker
                  disabled={endDateDisabled}
                  label={'Fin'}
                  testId={'endDate'}
                  name="endDate"
                  control={control}
                />
              </div>
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
            <SuccessErrorMessage
              open={showAlert}
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

export default MemberForm;
