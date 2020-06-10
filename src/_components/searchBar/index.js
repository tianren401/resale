import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { Autocomplete } from './autocomplete';
import { Places } from '_components/places';
import { EventsDropdown } from './eventsDropdown';
import { Flex } from '_components';
import {
  SearchContainer,
  FiltersContainer,
  FilterIconContainer,
} from './styledComponents';

import { setQuery, setResults } from '_store/search';
import { useAlgoliaSearch, useViewport } from '_hooks';
import { CategoriesDropdown } from './categoriesDropdown';
import { DateRangeDropdown } from '_components/dateRangeDropdown';
import { SearchFilterIcon } from '_components/icon/svgIcons';
import { deviceSize } from '_constants';
import { searchService } from '_services/search';

export const SearchBar = ({
  showDropdown,
  showAutocompleteIcon,
  isResultsPage,
  placeholder,
  config,
  navbarSearch,
  ...rest
}) => {
  const windowSize = useViewport();
  const isMobileDevice = windowSize.width < deviceSize.tablet;

  const [showFilters, setShowFilters] = useState(
    isResultsPage && !isMobileDevice
  );

  const onToggleFilters = () => {
    setShowFilters(!showFilters);
  };

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

  const { setSearchState } = useAlgoliaSearch({
    isMultiple: true,
    initialSearchState: {
      searchOptions: config,
    },
    isResultsPage: handleSearchResults,
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
      <SearchContainer isHome={!isResultsPage} navbarSearch={navbarSearch}>
        <Flex flex={3}>
          <Autocomplete
            {...rest}
            value={searchQuery}
            placeholder={placeholder}
            onChange={handleSetQuery}
            navbarSearch={navbarSearch}
            renderList={({ results, dropdownEl, ...rest }) => (
              <EventsDropdown ref={dropdownEl} results={results} {...rest} />
            )}
            hasNext={false}
            showDropdown={showDropdown}
            showAutocompleteIcon={showAutocompleteIcon}
            options={searchResults}
            isResultsPage={isResultsPage}
          />
        </Flex>
        <Flex>
          {isMobileDevice && isResultsPage && (
            <FilterIconContainer onClick={onToggleFilters}>
              <SearchFilterIcon />
            </FilterIconContainer>
          )}
        </Flex>
      </SearchContainer>
      {showFilters && (
        <FiltersContainer>
          <Flex flex={1} justify="center">
            <CategoriesDropdown />
          </Flex>
          <Flex flex={1} justify="center">
            <Places
              defaultRefinement={
                searchLocation || searchService.defaultLocation
              }
            />
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
  isResultsPage: PropTypes.bool,
  showDropdown: PropTypes.bool,
  showAutocompleteIcon: PropTypes.bool,
  navbarSearch: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  config: PropTypes.object,
};

SearchBar.defaultProps = {
  isResultsPage: false,
  showDropdown: true,
  placeholder: '',
  showAutocompleteIcon: true,
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
