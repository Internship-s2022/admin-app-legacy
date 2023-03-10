import { addDays, areIntervalsOverlapping, format } from 'date-fns';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { joiResolver } from '@hookform/resolvers/joi';

import { Button, Dropdown, TextInput } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/buttons/button/types';
import DateIntervalPicker from 'src/components/shared/ui/inputs/date-picker-interval';
import { closeModal } from 'src/redux/ui/actions';
import { AppDispatch } from 'src/types';

import styles from './absences.module.css';
import { motiveOptions } from './constants';
import { AbsencesModalProps, FormAbsencesValue, Motives } from './types';
import { absencesValidations } from './validations';

const AbsencesModal = (props: AbsencesModalProps) => {
  const { setAbsence, absences } = props;

  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(addDays(new Date(), 1));
  const [error, setError] = React.useState(false);
  const [excludeStartDate, setExcludeStartDate] = React.useState(false);

  const dispatch: AppDispatch<null> = useDispatch();

  const { handleSubmit, control, reset, getValues } = useForm<FormAbsencesValue>({
    defaultValues: {
      motive: '' as Motives,
      startDate: '',
      endDate: '',
    },
    mode: 'onBlur',
    resolver: joiResolver(absencesValidations),
  });

  useEffect(() => {
    reset({
      motive: getValues('motive'),
      startDate: format(new Date(startDate), 'dd/MM/yyyy'),
      endDate: endDate ? format(new Date(endDate), 'dd/MM/yyyy') : undefined,
    });
  }, [startDate, endDate]);

  const handleStartDate = (date) => {
    setStartDate(date);
    setExcludeStartDate(true);
  };

  const handleEndDate = (date) => {
    setEndDate(date);
  };

  const onClose = () => {
    reset();
    dispatch(closeModal());
  };

  const onSubmit = (data) => {
    const body = {
      ...data,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    };
    const absenceOverlap = absences.some((item) =>
      areIntervalsOverlapping(
        { start: new Date(startDate), end: new Date(endDate) },
        { start: new Date(item.startDate), end: new Date(item.endDate) },
      ),
    );
    if (absenceOverlap) {
      setError(true);
    } else {
      setAbsence([...absences, { ...body }]);
      onClose();
    }
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.titleContainer}>
        <p>Agregar Ausencia</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputContainer}>
          <div className={styles.input}>
            <Dropdown
              control={control}
              testId={'motive-dropdown'}
              label="Motivo"
              name="motive"
              options={motiveOptions}
              error
              fullWidth
            />
          </div>
          <div className={styles.input}>
            <TextInput
              control={control}
              testId={'start-input'}
              name="startDate"
              type={'text'}
              variant="outlined"
              error
              label={'Fecha de inicio'}
              disabled
              fullWidth
            />
          </div>
          <div className={styles.input}>
            <TextInput
              control={control}
              testId={'end-input'}
              name="endDate"
              type={'text'}
              variant="outlined"
              error
              disabled
              label={'Fecha de reintegro'}
              fullWidth
            />
          </div>
        </div>
        <div className={styles.datePicker}>
          <DateIntervalPicker
            control={control}
            name="startDate"
            setStart={handleStartDate}
            setEnd={handleEndDate}
            startDate={startDate}
            endDate={endDate}
            excludeStartDate={excludeStartDate}
          />
        </div>
        {error && (
          <div className={styles.absenceError}>
            <span>Error: Ausencia registrada en el per??odo indicado</span>
          </div>
        )}
      </form>
      <div className={styles.buttonsContainer}>
        <div>
          <Button
            testId="reset-btn"
            materialVariant={Variant.OUTLINED}
            label="Cancelar"
            onClick={() => onClose()}
          />
        </div>
        <div>
          <Button
            testId="submit-btn"
            materialVariant={Variant.CONTAINED}
            label="Confirmar"
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      </div>
    </div>
  );
};

export default AbsencesModal;
