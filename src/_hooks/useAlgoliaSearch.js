import { useState, useEffect, useRef } from 'react';
import algoliasearch from 'algoliasearch/lite';
import throttle from 'lodash/throttle';

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APPLICATION_ID,
  process.env.REACT_APP_ALGOLIA_API_KEY
);

const SHOW_LOADING_AFTER_MS = 300;

export const useAlgoliaSearch = ({
  isMultiple = true,
  initialSearchState = {},
  initialResults = null,
  onResults,
}) => {
  if (!isMultiple && !initialSearchState.index)
    throw new Error('initialSearchState with index is required');

  const skip = useRef(!!initialResults);

  // The search query and options
  const [searchState, setSearchState] = useState({
    ...initialSearchState,
    context: initialSearchState.context || {}, // Put additional custom data in searchState.context - the search lib will keep it in state and won't touch it
    getRankingInfo: true,
  });
  const [results, setResults] = useState(initialResults);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const { index, searchOptions } = searchState; // Algolia errors on unknown parameters so filter them out

    const getResults = throttle(async () => {
      // Show loading after a while to prevent jumpyness
      const loadingTimeout = setTimeout(
        () => setLoading(true),
        SHOW_LOADING_AFTER_MS
      );

      let res = null;
      // Get results
      try {
        if (!isMultiple) {
          const searchIndex = searchClient.initIndex(index);
          res = await searchIndex.search(searchOptions);
        } else {
          const { indices, hitsPerPage, params, query } = searchOptions;

          // facet filters
          const eventFilters = [];
          if (params?.category !== 'any') {
            eventFilters.push(`eventType:${params?.category}`);
          }

          if (params?.date === 'weekendsOnly') {
            eventFilters.push('weekend:true');
          }

          if (params?.dateRange && params?.date === 'date') {
            eventFilters.push(
              `timestamp:${params?.dateRange?.start} TO ${params?.dateRange?.end}`
            );
          }

          const queries = indices.map((index) => {
            let searchParams = {
              hitsPerPage,
            };

            if (index === 'events') {
              searchParams = {
                ...searchParams,
                hitsPerPage: params?.eventPageSize || hitsPerPage,
              };
              if (eventFilters?.length > 0) {
                searchParams = {
                  ...searchParams,
                  filters: eventFilters.join(' AND '),
                };
              }
              if (params?.location) {
                searchParams = {
                  ...searchParams,
                  aroundLatLng: params?.location,
                };
              }
            } else if (index === 'venues') {
              if (params?.location) {
                searchParams = {
                  ...searchParams,
                  aroundLatLng: params?.location,
                };
              }
            }

            return {
              indexName: index,
              query,
              params: searchParams,
            };
          });
          res = await searchClient.multipleQueries(queries);
        }
        setResults(res.results);
        clearTimeout(loadingTimeout);
        setLoading(false);

        if (onResults) {
          onResults({ searchState, results: res.results });
        }
      } catch (error) {
        if (error.message.toLowerCase().includes('unknown parameter')) {
          error.message = `${error.message} - if you want to add custom (non-Algolia) parameters, use searchState.context`;
        }
        console.error(`useAlgoliaSearch error: ${error.message}`);

        clearTimeout(loadingTimeout);
        setLoading(false);
      }
    }, 500);

    // If initialResults is provided we can skip once
    if (skip.current) {
      skip.current = false;
      return;
    }
    getResults();
  }, [searchState, onResults, isMultiple]);

  return {
    searchState,
    setSearchState,
    results,
    isLoading,
  };
};
