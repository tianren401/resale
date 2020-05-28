import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { Header } from './components/header';
import { SearchRowContainer, connectedSearch as SearchBar } from '_components';
import { Footer } from '_pages/home/footer';
import { ResultsList } from './components';
import { HomeLayout } from '_components';
import { loadMoreEvents, setQuery, setResults } from '_store/search';

const Container = styled(HomeLayout)`
  width: 100%;
`;

export const Results = () => {
  const events = [];

  const searchCategory = useSelector(
    ({ searchReducer }) => searchReducer.category
  );
  const searchDate = useSelector(({ searchReducer }) => searchReducer.date);
  const searchDateRange = useSelector(
    ({ searchReducer }) => searchReducer.dateRange
  );
  const searchLocation = useSelector(
    ({ searchReducer }) => searchReducer.location
  );

  const searchEventPageSize = useSelector(
    ({ searchReducer }) => searchReducer.eventPageSize
  );

  const dispatch = useDispatch();
  const handleLoadMoreEvents = () => {
    dispatch(loadMoreEvents());
  };

  const handleSetQuery = useCallback(
    (query) => {
      dispatch(setQuery(query));
    },
    [dispatch]
  );

  const handleSearchResults = useCallback(
    (results) => {
      dispatch(setResults(results));
    },
    [dispatch]
  );

  const defaultLocation = {
    lat: 32.8203525,
    lng: -97.011731,
  };

  const resultsSearchConfig = {
    defaultIndex: 'events',
    indices: ['events', 'performers', 'venues'],
    hitsPerPage: 10,
    multiple: true,
    params: {
      category: searchCategory,
      date: searchDate,
      dateRange: searchDateRange,
      location: searchLocation
        ? Object.values(searchLocation).join(', ')
        : Object.values(defaultLocation).join(', '),
      eventPageSize: searchEventPageSize,
    },
  };

  // clear search stage on unmount
  useEffect(() => {
    return () => {
      handleSetQuery('');
      handleSearchResults([]);
    };
  }, [handleSetQuery, handleSearchResults]);

  return (
    <Container>
      <Header events={events.content} />
      <SearchRowContainer>
        <SearchBar
          showDropdown={false}
          showAutocompleteIcon={false}
          showFilters
          config={resultsSearchConfig}
        />
      </SearchRowContainer>
      <ResultsList onLoadMore={handleLoadMoreEvents} />
      <Footer />
    </Container>
  );
};