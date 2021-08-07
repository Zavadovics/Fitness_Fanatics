export const meterToKilometers = data => {
  return (data / 1000).toFixed(1);
};

export const minsToHoursAndMins = num => {
  const hours = Math.floor(num / 60);
  const minutes = num % 60;
  return hours + ' óra ' + minutes + ' perc';
};

export const calorieCounter = (durationInMins, weight) => {
  const MET = 10; /* metabolic equivalent for task */
  const caloriesBurned = (durationInMins * (MET * 3.5 * weight)) / 200;
  // if (weight === 0) {
  //   weight = 70;
  //   return caloriesBurned;
  // }
  return caloriesBurned;
};
