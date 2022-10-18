export const capitalizeFirstLetter = (text: string) => {
  if (text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
  return '';
};

export const formattedTableData = (list: unknown[], field: string) => {
  let result = '-';
  if (list?.length > 1) {
    result = `${list[0]?.[field]} y ${list?.length - 1} mas`;
  } else if (list?.length == 1) {
    result = `${list[0]?.[field]}`;
  }
  return result;
};
