interface UseConvert {
  convertToPercentage: (value: string) => string;
}

export const useConvert = (): UseConvert => {
  const collectFloatNumber = (value: string): string => {
    const splittedValue = value.split('.');

    return `${splittedValue[0]}.${splittedValue[1].slice(0, 2)}`;
  };

  const convertToPercentage = (value: string): string => {
    if (!value || isNaN(parseFloat(value))) {
      return '0';
    }

    let formattedValue = value.toString().replace(',', '.');
    const parsedValue = parseFloat(formattedValue);

    // If the number is without a dot, add a dot and 0 to the right
    if (!formattedValue.includes('.')) {
      formattedValue = parsedValue.toFixed(2);
    }

    // Collecting a float number
    return collectFloatNumber(formattedValue);
  };

  return { convertToPercentage };
};
