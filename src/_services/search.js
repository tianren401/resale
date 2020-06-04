import { getESResults } from '_helpers/api';

function searchLocation(query) {
  return getESResults({
    path: 'search/venues/_search',
    parameters: { q: query.trim() },
  });
}

function searchQuery(query) {
  return getESResults({
    path: 'search/_search',
    parameters: { q: query.trim() },
  });
}

export const searchService = {
  searchLocation,
  searchQuery,
};
