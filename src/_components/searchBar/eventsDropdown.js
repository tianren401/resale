import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { Flex, FlexItem } from '_components';
import { formatTimeStamp } from '_helpers';
import {
  AutocompleteItem,
  AutocompleteList,
  EmptyListContainer,
  SectionHeader,
  SectionContainer,
  AvatarImage,
  ShowAllResults,
} from './styledComponents';

const ListItem = ({ data, indexName, ...rest }) => {
  if (!data) {
    return null;
  }
  const { className, handleItemClick } = rest;
  let child = null;
  const venueLocation = `${data?.city}, ${data?.state}`;
  const eventMeta = `${formatTimeStamp(data?.timestamp)},  ${data?.venue}`;
  switch (indexName) {
    case 'events':
      child = (
        <Link to={`/event/${data.objectID}`}>
          <SectionContainer column>
            <FlexItem>
              <h2>{data.name}</h2>
            </FlexItem>
            <FlexItem>
              <h3>{eventMeta}</h3>
            </FlexItem>
          </SectionContainer>
        </Link>
      );
      break;
    case 'venues':
      child = (
        <Link to={`/venue/${data.objectID}`}>
          <SectionContainer>
            <FlexItem flex={3}>
              <Flex column>
                <FlexItem>
                  <h2>{data.name}</h2>
                </FlexItem>
                <FlexItem>
                  <h3>{venueLocation}</h3>
                </FlexItem>
              </Flex>
            </FlexItem>
            <FlexItem>
              <Flex justify="flex-end">
                <h3 className="brand-color">
                  Next: {formatTimeStamp(Date.now())}
                </h3>
              </Flex>
            </FlexItem>
          </SectionContainer>
        </Link>
      );
      break;
    case 'performers':
    default:
      child = (
        <Link to={`/performer/${data.objectID}`}>
          <SectionContainer align="center">
            <FlexItem flex={0}>
              <AvatarImage />
            </FlexItem>
            <FlexItem>
              <h2>{data.name}</h2>
            </FlexItem>
          </SectionContainer>
        </Link>
      );
      break;
  }

  return (
    <AutocompleteItem
      className={className}
      key={data.objectID}
      onClick={handleItemClick}
    >
      {child}
    </AutocompleteItem>
  );
};

ListItem.propTypes = {
  data: PropTypes.any,
  indexName: PropTypes.string.isRequired,
};

export const EventsDropdown = React.forwardRef((props, ref) => {
  const { results, activeOption, handleItemClick } = props;
  // map data
  const options = _.chain(results).slice(0, 10).groupBy('index').value();

  let optionList = null;

  const orders = ['performers', 'events', 'venues'];
  const categories = Object.keys(options).sort(
    (a, b) => orders.indexOf(a) - orders.indexOf(b)
  );

  const total = Object.keys(options).reduce((total, category) => {
    return total + options[category][0]?.hits.length;
  }, 0);

  if (total > 0) {
    let className = '';
    optionList = (
      <AutocompleteList ref={ref}>
        {categories.map((category) => (
          <React.Fragment key={category}>
            <SectionHeader>
              <h1>{category}</h1>
            </SectionHeader>
            {(options[category][0]?.hits || [])
              .slice(0, 3)
              .map((hit, index) => {
                if (index === activeOption) {
                  className = 'active';
                }

                return (
                  <ListItem
                    key={hit.objectID}
                    data={hit}
                    indexName={category}
                    className={className}
                    handleItemClick={handleItemClick}
                  />
                );
              })}
          </React.Fragment>
        ))}
        <Link to={'/results'}>
          <ShowAllResults>Show All Results</ShowAllResults>
        </Link>
      </AutocompleteList>
    );
  } else {
    optionList = (
      <AutocompleteList ref={ref} empty>
        <AutocompleteItem>
          <EmptyListContainer>
            <em>No Results...</em>
          </EmptyListContainer>
        </AutocompleteItem>
      </AutocompleteList>
    );
  }

  return optionList;
});

EventsDropdown.displayName = 'EventsDropdown';

EventsDropdown.propTypes = {
  data: PropTypes.any,
  results: PropTypes.arrayOf(PropTypes.any),
  activeOption: PropTypes.number,
  handleItemClick: PropTypes.func,
};
