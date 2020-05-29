import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Dropdown } from '_components';
import { SliderDropdown } from './rangeSlider';

const Container = styled.form`
  display: flex;
  justify-content: flex-end;
  height: 70px;
  width: 100%;
  margin-bottom: 5px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
`;

const FilterItem = styled.div`
  display: flex;
  padding: 15px 20px;
`;

export const FilterOptions = ({ filterOptions }) => {
  const ticketData = useSelector((state) => state.ticketGroupListReducer);
  const [maxPrice, setMaxPrice] = useState(0);

  const quanityOptionsList = (max) => {
    const resultList = [{ label: 'Any Quantity', key: 0 }];
    const range = [...Array(max + 1).keys()].slice(1);
    range.forEach((quantity) => {
      if (quantity === max) {
        resultList.push({ label: `${quantity}+ Tickets`, key: quantity });
      } else if (quantity === 1) {
        resultList.push({ label: `${quantity} Ticket`, key: quantity });
      } else {
        resultList.push({ label: `${quantity} Tickets`, key: quantity });
      }
    });

    return resultList;
  };

  const handleSortChange = (option) => {
    filterOptions.sortType = window.Seatics.SortOptions[option.key];
    window.Seatics.MapComponent.setFilterOptions(filterOptions);
  };

  const handleQuantityChange = (option) => {
    if (option.key === 0 || option.key === 7) {
      filterOptions.quantityFilter = { value: option.key, exact: false };
    } else {
      filterOptions.quantityFilter = { value: option.key, exact: true };
    }

    window.Seatics.MapComponent.setFilterOptions(filterOptions);
  };

  const handlePriceChange = (min, max) => {
    filterOptions.minPrice = min;
    filterOptions.maxPrice = max;
    window.Seatics.MapComponent.setFilterOptions(filterOptions);
  };

  useEffect(() => {
    const getMaxAvailablePrice = () => {
      let max = 0;

      if (ticketData.ticketGroupListFormatted)
        ticketData.ticketGroupListFormatted.forEach((ticket) => {
          if (ticket.tgPrice > max) {
            max = ticket.tgPrice;
          }
        });

      return max;
    };

    setMaxPrice(getMaxAvailablePrice());
  }, [ticketData, ticketData.ticketGroupListFormatted]);

  return (
    <Container>
      <FilterItem>
        <Dropdown
          options={[
            { label: 'Price: Low to High', key: 'PriceAsc' },
            { label: 'Price: High to Low', key: 'PriceDesc' },
          ]}
          defaultOption={'PriceAsc'}
          plain={false}
          handleChange={handleSortChange}
        />
      </FilterItem>
      <FilterItem>
        <Dropdown
          options={quanityOptionsList(7)}
          defaultOption={'Any Quantity'}
          plain={false}
          handleChange={handleQuantityChange}
        />
      </FilterItem>
      <FilterItem>
        <SliderDropdown
          minRange={0}
          maxRange={maxPrice}
          handleChange={handlePriceChange}
        />
      </FilterItem>
    </Container>
  );
};

FilterOptions.propTypes = {
  filterOptions: PropTypes.objectOf(Object),
};
