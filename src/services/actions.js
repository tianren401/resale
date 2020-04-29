const mockData = [
  'Billy Joel. Madison Square Garden, New York (NYC), NY, US',
  'JoJo Siwa, The Belles Official',
  'Sturgill Simpson, Tyler Childers',
  'The 1975, Phoebe Bridgers and Beabadoobee',
  'Slipknot, A Day to Remember and Underoath',
  'Ozzy Osbourne, Marilyn Manson',
  'Lauren Daigle, JOHNNYSWIM',
  'Harry Styles,Jenny Lewis',
];

export const fetchSearch = (query) => {
  return new Promise((resolve, reject) => {
    resolve(mockData);
  });
};
