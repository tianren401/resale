import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { MainContainer, LoadMoreButton } from '_components';
import { ListItem } from './listItem';
import { ItemList, SectionHeader, SectionContainer } from './styledComponents';
import { PerformerCarousel } from '_components/performerCarousel';

export const ResultsList = ({ onLoadMore }) => {
  // fetch search resutls from reducer
  const results = useSelector(({ searchReducer }) => searchReducer.results);
  const performersMeta = useSelector(
    ({ searchReducer }) => searchReducer.performersMeta
  );

  // event handlers
  const handleItemClick = () => {};

  const orders = ['performers', 'events', 'venues'];
  const categories = Object.keys(results).sort(
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
              {results[category]?.length > 0 ? (
                <>
                  {results[category].map((hit) => (
                    <ListItem
                      key={`${category}-${hit.objectID}`}
                      data={hit}
                      indexName={category}
                      handleItemClick={handleItemClick}
                    />
                  ))}
                  {category === 'events' && (
                    <SectionContainer>
                      <LoadMoreButton onClick={onLoadMore}>
                        Load More
                      </LoadMoreButton>
                    </SectionContainer>
                  )}
                </>
              ) : (
                <SectionContainer>
                  <h3>No {category} found</h3>
                </SectionContainer>
              )}
            </>
          </ItemList>
        ) : (
          <PerformerCarousel
            key="performerCarousel"
            title="Performers"
            performers={results[category]}
            performersMeta={performersMeta}
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
  onLoadMore: PropTypes.func,
};
