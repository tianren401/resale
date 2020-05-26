import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { MainContainer, LoadMoreButton } from '_components';
import { ListItem } from './listItem';
import { ItemList, SectionHeader, SectionContainer } from './styledComponents';
import { PerformerCarousel } from '_components/performerCarousel';

export const ResultsList = () => {
  // fetch search resutls from reducer
  const results = useSelector(({ searchReducer }) => searchReducer.results);

  // event handlers
  const handleItemClick = () => {};

  // map data
  const options = results.reduce((agg, value) => {
    agg[value?.index] = value?.hits;
    return agg;
  }, {});

  const orders = ['performers', 'events', 'venues'];
  const categories = Object.keys(options).sort(
    (a, b) => orders.indexOf(a) - orders.indexOf(b)
  );

  return (
    <MainContainer>
      {categories.map((category) => {
        return category !== 'performers' ? (
          <ItemList key={category}>
            <>
              <SectionHeader>
                <h1>{category}</h1>
              </SectionHeader>
              {(options[category] || []).map((hit) => {
                return (
                  <ListItem
                    key={`${category}-${hit.objectID}`}
                    data={hit}
                    indexName={category}
                    handleItemClick={handleItemClick}
                  />
                );
              })}

              {category === 'events' && (
                <SectionContainer>
                  <LoadMoreButton>Load More</LoadMoreButton>
                </SectionContainer>
              )}
            </>
          </ItemList>
        ) : (
          <PerformerCarousel
            title="Performers"
            performers={options[category]}
          />
        );
      })}
    </MainContainer>
  );
};

ResultsList.displayName = 'ResultsList';

ResultsList.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object),
  handleItemClick: PropTypes.func,
};
