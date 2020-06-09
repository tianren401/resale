import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { Header } from './components/header';
import { ResultsSearchRowContainer, SearchBar } from '_components';
import { Footer } from '_pages/home/footer';
import { ResultsList } from './components';
import { HomeLayout } from '_components';
import { loadMoreEvents, setQuery, setResults } from '_store/search';
import { deviceSize } from '_constants';
import { searchService } from '_services';

const Container = styled(HomeLayout)`
  width: 100%;

  @media (max-width: ${deviceSize.tablet}px) {
  }
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
        ? [searchLocation.latitude, searchLocation.longitude].join(', ')
        : Object.values(searchService.defaultLocation).join(', '),
      eventPageSize: searchEventPageSize,
    },
  };

  // clear search stage on unmount
  useEffect(() => {
    return () => {
      handleSetQuery('');
      handleSearchResults({});
    };
  }, [handleSetQuery, handleSearchResults]);

  return (
    <Container>
      <Header events={events.content} />
      <ResultsSearchRowContainer>
        <SearchBar
          showDropdown={false}
          showAutocompleteIcon={false}
          config={resultsSearchConfig}
          isResultsPage
        />
      </ResultsSearchRowContainer>
      <ResultsList onLoadMore={handleLoadMoreEvents} />
      <Footer />
    </Container>
  );
};
