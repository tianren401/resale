import React from 'react';
import PropTypes from 'prop-types';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Configure, Index } from 'react-instantsearch-dom';

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APPLICATION_ID,
  process.env.REACT_APP_ALGOLIA_API_KEY
);

export const withInstantSearch = (WrappedComponent) => {
  const displayName = WrappedComponent.displayName || WrappedComponent.name;

  const InstantSearchComponent = ({ config, ...props }) => {
    const { defaultIndex, indices, hitsPerPage, multiple, params } = config;

    // facet filters
    const eventFilters = [];
    if (params?.category !== 'any') {
      eventFilters.push(`eventType:${params.category}`);
    }

    if (params?.date === 'weekendsOnly') {
      eventFilters.push('weekend:true');
    }

    if (params?.dateRange && params?.date === 'date') {
      eventFilters.push(
        `timestamp:${params?.dateRange?.start} TO ${params?.dateRange?.end}`
      );
    }

    const onChangeState = () => {};

    return (
      <InstantSearch
        indexName={defaultIndex}
        searchClient={searchClient}
        onSearchStateChange={onChangeState}
      >
        <Configure hitsPerPage={hitsPerPage} />

        {multiple &&
          indices.length > 0 &&
          indices.map((indexName, index) => (
            <Index indexName={indexName} key={index}>
              {indexName === 'events' && (
                <Configure
                  filters={eventFilters.join(' AND ')}
                  aroundLatLng={params?.location}
                  hitsPerPage={params?.eventPageSize || hitsPerPage}
                />
              )}
              {indexName === 'venues' && (
                <Configure aroundLatLng={params?.location} />
              )}
            </Index>
          ))}

        <WrappedComponent {...props} />
      </InstantSearch>
    );
  };

  InstantSearchComponent.propTypes = {
    config: PropTypes.shape({
      defaultIndex: PropTypes.string,
      indices: PropTypes.arrayOf(PropTypes.string),
      hitsPerPage: PropTypes.number,
      multiple: PropTypes.bool,
      params: PropTypes.shape({
        category: PropTypes.string,
        date: PropTypes.string,
      }),
    }),
  };

  InstantSearchComponent.defaultProps = {
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

  InstantSearchComponent.displayName = displayName;

  return InstantSearchComponent;
};
