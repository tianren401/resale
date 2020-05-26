export const formatTimeStamp = (timestamp) => {
  const date = new Date(timestamp);
  return date.toDateString().slice(0, 10);
};
