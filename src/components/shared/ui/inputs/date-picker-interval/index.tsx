import 'react-datepicker/dist/react-datepicker.css';
import './datepicker.css';
import React from 'react';
import DatePicker from 'react-datepicker';
import { FieldValues, useController } from 'react-hook-form';

import { DateIntervalProps } from './types';

const DateIntervalPicker = <Form extends FieldValues>(
  props: DateIntervalProps<Form>,
): JSX.Element => {
  const { setStart, setEnd, startDate, endDate } = props;
  const {
    field: { value },
  } = useController(props);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStart(start);
    setEnd(end);
  };

  return (
    <DatePicker
      value={value}
      selected={startDate}
      onChange={onChange}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      inline
    />
  );
};

export default DateIntervalPicker;
