import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { Header } from './components/header';
import { SearchRowContainer, connectedSearch as SearchBar } from '_components';
import { Footer } from '_pages/home/footer';
import { ResultsList } from './components';
import { HomeLayout } from '_components';

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
        : null,
    },
  };

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
      <ResultsList />
      <Footer />
    </Container>
  );
};
