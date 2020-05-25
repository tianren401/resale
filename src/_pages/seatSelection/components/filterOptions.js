import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.form`
  display: flex;
  justify-content: flex-end;
  height: 8%;
  width: 100%;
  margin-bottom: 5px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
`;

const DropDown = styled.select`
  height: 40px;
  width: 150px;
  margin: auto 10px;
  text-align-last: center;
  background: #ffffff;
  border: 1px solid #e6e6eb;
  border-radius: 6px;
  -webkit-appearance: none;
  -moz-appearance: none;

  &:hover {
    color: #6726f1;
    border: 1px solid #6726f1;
  }
`;

export const FilterOptions = (props) => {
  const handleSortChange = (event) => {
    props.filterOptions.sortType =
      window.Seatics.SortOptions[event.target.value];
    window.Seatics.MapComponent.setFilterOptions(props.filterOptions);
  };

  return (
    <Container>
      <DropDown onChange={null}>
        <option value={''}>Any Section</option>
      </DropDown>
      <DropDown onChange={handleSortChange}>
        <option value={'PriceAsc'}>Price: Low to High</option>
        <option value={'PriceDesc'}>Price: High to Low</option>
      </DropDown>
      <DropDown onChange={null}>
        <option value={''}>Any Quantity</option>
      </DropDown>
      <DropDown onChange={null}>
        <option value={''}>$$$</option>
      </DropDown>
    </Container>
  );
};

FilterOptions.propTypes = {
  filterOptions: PropTypes.objectOf(Object),
};
// FilterOptions.displayName = 'FilterOptions';
