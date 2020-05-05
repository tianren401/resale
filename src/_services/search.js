import { getESResults } from '_helpers/api';

function searchLocation(query) {
  return getESResults('search/venues/_search', { q: query.trim() });
}

function searchQuery(query) {
  return getESResults('search/_search', { q: query.trim() });
}

export const searchService = {
  searchLocation,
  searchQuery,
};
