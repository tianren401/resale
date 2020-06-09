export const formatTimeStamp = (timestamp) => {
  const date = new Date(timestamp);
  return date.toDateString().slice(0, 10);
};

export const formatPhoneNumber = (phoneNumberString) => {
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return ['(', match[2], ') ', match[3], '-', match[4]].join('');
  }
  return null;
};
