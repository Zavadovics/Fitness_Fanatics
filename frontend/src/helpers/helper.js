export const meterToKilometers = data => {
  return (data / 1000).toFixed(1);
};

export const minsToHoursAndMins = num => {
  const hours = Math.floor(num / 60);
  const minutes = num % 60;
  return hours + ' óra ' + minutes + ' perc';
};
