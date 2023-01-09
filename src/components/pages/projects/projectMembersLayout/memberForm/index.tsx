import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { joiResolver } from '@hookform/resolvers/joi';

import {
  AutocompleteInput,
  Button,
  DatePicker,
  Dropdown,
  TextInput,
} from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/buttons/button/types';
import EndDateCheckbox from 'src/components/shared/ui/inputs/endDateCheckbox';
import { getEmployees } from 'src/redux/employee/thunk';
import { addMember, editMember } from 'src/redux/member/thunk';
import { RootState } from 'src/redux/store';
import { closeModal, setSnackbarOperation } from 'src/redux/ui/actions';
import { AppDispatch, Resources } from 'src/types';

import { roles } from './constants';
import styles from './memberForm.module.css';
import { FormValues, MemberFormProps, Role } from './types';
import { memberValidations } from './validations';

const MemberForm = (props: MemberFormProps) => {
  const { projectId, memberData, dropdownData } = props;

  const employeeList = useSelector((state: RootState) => state.employee.list);
  const [endDateDisabled, setEndDateDisabled] = useState(false);

  const dispatch: AppDispatch<null> = useDispatch();

  const {
    formState: { isDirty },
    handleSubmit,
    control,
    reset,
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      employee: { label: '', value: '' },
      role: Role.DEV,
      memberDedication: 0,
      helper: {
        helperReference: { label: 'Sin ayudante', value: undefined },
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

  const selectedMember = watch('employee');
  const formChanged = Boolean(!isDirty && memberData);

  const employeeDropdownList = dropdownData.map((employee) => {
    return {
      value: employee._id,
      label: `${employee.user?.firstName} ${employee.user?.lastName}`,
    };
  });

  const currentHelperIndex = memberData?.helper?.findIndex((helper) => helper.isActive);

  const filterDropdownList = () => {
    const helperDropdownList = employeeList.reduce((acc, employee) => {
      if (
        employee._id !== selectedMember.value &&
        employee?.user?.isActive &&
        employee?.availability
      ) {
        acc.push({
          value: employee._id,
          label: `${employee.user?.firstName} ${employee.user?.lastName}`,
        });
      }
      return acc;
    }, []);

    helperDropdownList.unshift({ value: undefined, label: 'Sin ayudante' });
    return helperDropdownList;
  };

  useEffect(() => {
    memberData &&
      reset({
        employee: {
          value: memberData.employee.value,
          label: employeeDropdownList?.find((item) => item.value === memberData?.employee.value)
            ?.label,
        },
        role: memberData.role,
        memberDedication: memberData.memberDedication,
        helper: {
          helperReference: {
            value: memberData.helper[currentHelperIndex]?.helperReference.value,
            label: filterDropdownList()?.find(
              (item) =>
                item.value === memberData.helper[currentHelperIndex]?.helperReference?.value,
            )?.label,
          },
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
  }, [memberData]);

  const onSubmit = (data) => {
    const { helper, employee, ...rest } = data;

    const memberDataHelper = memberData?.helper?.map((item) => {
      return {
        ...item,
        helperReference: item.helperReference.value,
      };
    });

    const helperData = {
      ...helper,
      helperReference: helper?.helperReference?.value,
    };

    if (currentHelperIndex !== undefined && currentHelperIndex !== -1) {
      memberDataHelper[currentHelperIndex].isActive = false;
    }

    if (memberDataHelper && helperData?.helperReference) {
      const helperIndex = memberDataHelper?.findIndex(
        (item) => item?.helperReference === helperData?.helperReference,
      );

      helperIndex !== -1
        ? (memberDataHelper[helperIndex] = helperData)
        : memberDataHelper?.push(helperData);
    }

    const formattedData = helperData?.helperReference
      ? {
          ...rest,
          employee: employee.value,
          project: projectId,
          helper: [helperData],
          endDate: endDateDisabled ? null : data.endDate,
        }
      : {
          ...rest,
          employee: employee.value,
          endDate: endDateDisabled ? null : data.endDate,
          project: projectId,
        };

    const formattedDataEdit = {
      ...rest,
      helper: memberDataHelper,
      endDate: endDateDisabled ? null : data.endDate,
    };

    if (memberDataHelper) {
      dispatch(editMember({ id: memberData._id, body: formattedDataEdit }));
      dispatch(setSnackbarOperation('editado'));
    } else {
      dispatch(addMember(formattedData));
      dispatch(setSnackbarOperation('agregado'));
    }
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
        <p>{memberData ? 'Editar miembro' : 'Agregar miembro al proyecto'}</p>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.memberForm}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputsContainer}>
              <div className={styles.memberData}>
                <div className={styles.topContainer}>
                  <AutocompleteInput
                    name={'employee'}
                    control={control}
                    options={employeeDropdownList}
                    label={'Empleado'}
                    disable={memberData ? true : false}
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
                  <AutocompleteInput
                    control={control}
                    label={'Ayudante'}
                    name="helper.helperReference"
                    options={filterDropdownList()}
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
                    disabled={watch('helper.helperReference').value === undefined}
                  />
                  <TextInput
                    control={control}
                    testId={'helperDedication'}
                    label="Dedicacion"
                    name="helper.dedication"
                    type={'number'}
                    variant="outlined"
                    fullWidth
                    disabled={watch('helper.helperReference').value === undefined}
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
                  disabled={formChanged}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MemberForm;
