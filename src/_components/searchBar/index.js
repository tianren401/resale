import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { Autocomplete } from './autocomplete';
import { Places } from '_components/places';
import { EventsDropdown } from './eventsDropdown';
import { Flex } from '_components';
import { SearchContainer, FiltersContainer } from './styledComponents';

import { setQuery, setResults } from '_store/search';
import { useAlgoliaSearch } from '_hooks';

import { CategoriesDropdown } from './categoriesDropdown';
import { DateRangeDropdown } from './dateRangeDropdown';

export const SearchBar = ({
  showLocation,
  showDate,
  showDropdown,
  showFilters,
  showAutocompleteIcon,
  placeholder,
  config,
  ...rest
}) => {
  const dispatch = useDispatch();

  const handleSetQuery = (query) => {
    dispatch(setQuery(query));
  };

  const handleSearchResults = useCallback(
    // eslint-disable-next-line
    ({ searchState, results }) => {
      // TODO: handle search state
      const organizedResults = results
        ? results.reduce((agg, data) => {
            agg[data?.index] = data?.hits;
            return agg;
          }, {})
        : {};
      dispatch(setResults(organizedResults));
    },
    [dispatch]
  );

  const searchQuery = useSelector(({ searchReducer }) => searchReducer.query);
  const searchLocation = useSelector(
    ({ searchReducer }) => searchReducer.location
  );

  const searchResults = useSelector(
    ({ searchReducer }) => searchReducer.results
  );

  const defaultLocation = {
    lat: 32.8203525,
    lng: -97.011731,
  };

  const { setSearchState } = useAlgoliaSearch({
    isMultiple: true,
    initialSearchState: {
      searchOptions: config,
    },
    onResults: handleSearchResults,
  });

  useEffect(() => {
    setSearchState((current) => ({
      ...current,
      searchOptions: {
        ...config,
        query: searchQuery,
      },
    }));
  }, [config, searchQuery, setSearchState]);

  return (
    <>
      <SearchContainer>
        <Flex flex={3}>
          <Autocomplete
            {...rest}
            value={searchQuery}
            placeholder={placeholder}
            onChange={handleSetQuery}
            renderList={({ results, dropdownEl, ...rest }) => (
              <EventsDropdown ref={dropdownEl} results={results} {...rest} />
            )}
            hasNext={showLocation || showDate}
            showDropdown={showDropdown}
            showAutocompleteIcon={showAutocompleteIcon}
            options={searchResults}
          />
        </Flex>
      </SearchContainer>
      {showFilters && (
        <FiltersContainer>
          <Flex flex={1} justify="center">
            <CategoriesDropdown />
          </Flex>
          <Flex flex={1} justify="center">
            <Places defaultRefinement={searchLocation || defaultLocation} />
          </Flex>
          <Flex flex={1} justify="center">
            <DateRangeDropdown />
          </Flex>
        </FiltersContainer>
      )}
    </>
  );
};

SearchBar.propTypes = {
  showLocation: PropTypes.bool,
  showDate: PropTypes.bool,
  showDropdown: PropTypes.bool,
  showAutocompleteIcon: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  showFilters: PropTypes.bool,
  config: PropTypes.object,
};

SearchBar.defaultProps = {
  showDate: false,
  showLocation: false,
  showDropdown: true,
  placeholder: '',
  showAutocompleteIcon: true,
  showFilters: false,
  config: {
    defaultIndex: 'events',
    indices: ['events', 'performers', 'venues'],
    hitsPerPage: 3,
    multiple: true,
    params: {
      category: 'any',
    },
  },
};
