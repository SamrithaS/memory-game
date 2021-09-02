export const getTimerMinutes = (counter: number): string => {
  let minuteCounter = Math.floor(counter / 60);
  return minuteCounter < 10 ? `0${minuteCounter}` : `${minuteCounter}`;
};

export const getTimerSeconds = (counter: number): string => {
  let secondCounter = counter % 60;
  return secondCounter < 10 ? `0${secondCounter}` : `${secondCounter}`;
};
