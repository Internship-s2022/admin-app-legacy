import 'react-datepicker/dist/react-datepicker.css';
import './datepicker.css';
import React from 'react';
import DatePicker from 'react-datepicker';

import { DateIntervalProps } from './types';

const DateIntervalPicker = (props: DateIntervalProps) => {
  const { setStart, setEnd, startDate, endDate } = props;
  const onChange = (dates) => {
    const [start, end] = dates;
    setStart(start);
    setEnd(end);
  };

  return (
    <DatePicker
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
