import { format } from 'date-fns';

export const capitalizeFirstLetter = (text: string) => {
  if (text.length) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
  return '';
};

export const formattedTableData = <T>(list: any[], firstField: string, secondField?: string) => {
  const listilla = list.filter((item) =>
    secondField
      ? item[firstField]?.isActive || item[firstField]?.active
      : item?.active || item?.isActive,
  );
  let result = ' - ';
  if (listilla?.length > 1) {
    result = `${
      secondField ? listilla[0]?.[firstField][secondField] : listilla[0]?.[firstField]
    } y ${listilla?.length - 1} más`;
  } else if (listilla?.length == 1) {
    result = `${secondField ? listilla[0]?.[firstField][secondField] : listilla[0]?.[firstField]} `;
  } else if (listilla?.length == 0) {
    return result;
  }
  return result;
};

export const dateFormatter = (startDate, endDate) => {
  if (!startDate) {
    return 'No hay datos';
  } else if (!endDate) {
    return `Desde ${format(new Date(startDate), 'dd/MM/yy')}`;
  } else {
    return `${startDate && format(new Date(startDate), 'dd/MM/yy')} a ${format(
      new Date(endDate),
      'dd/MM/yy',
    )}`;
  }
};

export const cutLastLetter = (string) => string.slice(0, string.length - 1);
