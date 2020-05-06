import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { FlexItem } from '_components';
import {
  AutocompleteItem,
  AutocompleteList,
  EmptyListContainer,
  SectionHeader,
  SectionContainer,
  AvatarImage,
  ShowAllResults,
} from './StyledComponents';

const ListItem = ({ data, ...rest }) => {
  if (!data) {
    return null;
  }
  const { className, handleItemClick } = rest;
  let child = null;

  switch (data._index) {
    case 'events':
      child = (
        <Link to={`/events/${data._id}`}>
          <SectionContainer border>
            <FlexItem>
              <h2>{data._source.name}</h2>
            </FlexItem>
            <FlexItem>
              <h3>{data._source.timestamp}</h3>
            </FlexItem>
          </SectionContainer>
        </Link>
      );
      break;
    case 'venues':
      child = (
        <Link to={`/venues/${data._id}`}>
          <SectionContainer border>
            <FlexItem>
              <h2>{data._source.name}</h2>
            </FlexItem>
            <FlexItem>
              <h3>{data._source.timestamp}</h3>
            </FlexItem>
          </SectionContainer>
        </Link>
      );
      break;
    case 'performers':
    default:
      child = (
        <Link to={`/performers/${data._id}`}>
          <SectionContainer align="center">
            <FlexItem flex={0}>
              <AvatarImage />
            </FlexItem>
            <FlexItem>
              <h2>{data._source.name}</h2>
            </FlexItem>
          </SectionContainer>
        </Link>
      );
      break;
  }

  return (
    <AutocompleteItem
      className={className}
      key={data._id}
      onClick={handleItemClick}
    >
      {child}
    </AutocompleteItem>
  );
};

const EventsDropdown = React.forwardRef((props, ref) => {
  const { results, activeOption, handleItemClick } = props;
  // map data
  const options = _.chain(results)
    .get('hits.hits', [])
    .slice(0, 10)
    .groupBy('_index')
    .value();

  let optionList = null;

  const orders = ['performers', 'events', 'venues'];
  const categories = Object.keys(options).sort(
    (a, b) => orders.indexOf(a) - orders.indexOf(b)
  );
  if (categories.length > 0) {
    const topResult = _.chain(results).get('hits.hits', []).head().value();
    let className = '';
    optionList = (
      <AutocompleteList ref={ref}>
        <SectionHeader>
          <h1>Top Result</h1>
        </SectionHeader>
        <ListItem
          data={topResult}
          className={className}
          handleItemClick={handleItemClick}
        />
        {categories.map((category) => (
          <>
            <SectionHeader>
              <h1>{category}</h1>
            </SectionHeader>
            {(options[category] || []).slice(0, 3).map((hit, index) => {
              if (index === activeOption) {
                className = 'active';
              }

              return (
                <ListItem
                  key={hit._id}
                  data={hit}
                  className={className}
                  handleItemClick={handleItemClick}
                />
              );
            })}
          </>
        ))}
        <Link to={'/results'}>
          <ShowAllResults>Show All Results</ShowAllResults>
        </Link>
      </AutocompleteList>
    );
  } else {
    optionList = (
      <AutocompleteList ref={ref}>
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

export default EventsDropdown;
