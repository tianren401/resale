import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  height: 9%;
  width: 100%;
  align-items: center;
  margin-bottom: 5px;
  padding: 10px 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
`;

export const FilterOptions = (props) => {
  const handleSortChange = (event) => {
    props.filterOptions.sortType =
      window.Seatics.SortOptions[event.target.value];
    window.Seatics.MapComponent.setFilterOptions(props.filterOptions);
  };

  return (
    <Container>
      Filters!
      <form>
        <select onChange={handleSortChange}>
          <option value={'PriceAsc'}>Price: Low to High</option>
          <option value={'PriceDesc'}>Price: High to Low</option>
        </select>
      </form>
    </Container>
  );
};

FilterOptions.propTypes = {
  filterOptions: PropTypes.objectOf(Object),
};
// FilterOptions.displayName = 'FilterOptions';
