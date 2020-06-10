import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  StyledFilterOptions,
  ListDropdown,
  MobileFilterButton,
} from './styledComponents';
import { MobileFilterOptions } from './mobileFilterOptions';
import { RangeSliderDropdown } from './rangeSliderDropdown';
import mobileFilterButton from '_images/mobileFilterButton.svg';
import { isMobileDevice } from '_helpers';

export const FilterOptions = ({ filterOptions }) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const quanityOptionsList = (max) => {
    const resultList = [];
    const range = [...Array(max + 1).keys()];
    range.forEach((quantity) => {
      const keyString = quantity.toString();
      switch (quantity) {
        case 0:
          resultList.push({ label: 'Any Quantity', key: keyString });
          break;
        case 1:
          resultList.push({ label: `${quantity} Ticket`, key: keyString });
          break;
        case max:
          resultList.push({ label: `${quantity}+ Tickets`, key: keyString });
          break;
        default:
          resultList.push({ label: `${quantity} Tickets`, key: keyString });
      }
    });

    return resultList;
  };

  const handleSortFilterChange = (option) => {
    filterOptions.sortType = window.Seatics.SortOptions[option.key];
    window.Seatics.MapComponent.setFilterOptions(filterOptions);
  };

  const handleQuantityFilterChange = (option) => {
    const quantity = parseInt(option.key);
    if (quantity === 0 || quantity === 7) {
      filterOptions.quantityFilter = { value: quantity, exact: false };
    } else {
      filterOptions.quantityFilter = { value: quantity, exact: true };
    }

    window.Seatics.MapComponent.setFilterOptions(filterOptions);
  };

  const handlePriceFilterChange = (min, max) => {
    filterOptions.minPrice = min;
    filterOptions.maxPrice = max;
    window.Seatics.MapComponent.setFilterOptions(filterOptions);
  };

  return !isMobileDevice ? (
    <StyledFilterOptions>
      <ListDropdown
        options={[
          { label: 'Price: Low to High', key: 'PriceAsc' },
          { label: 'Price: High to Low', key: 'PriceDesc' },
        ]}
        defaultOption={'PriceAsc'}
        plain={false}
        handleChange={handleSortFilterChange}
        width={'185px'}
        title={'Price'}
      />
      <ListDropdown
        options={quanityOptionsList(7)}
        defaultOption={'0'}
        plain={false}
        handleChange={handleQuantityFilterChange}
        title={'Quantity'}
      />
      <RangeSliderDropdown
        minRange={0}
        maxRange={window.Seatics?.eventInfo?.maxEventTicketPrice}
        handleChange={handlePriceFilterChange}
      />
    </StyledFilterOptions>
  ) : (
    <StyledFilterOptions>
      <MobileFilterButton
        src={mobileFilterButton}
        onClick={() => setMobileFiltersOpen(true)}
      />
      <MobileFilterOptions
        mobileFiltersOpen={mobileFiltersOpen}
        setMobileFiltersOpen={setMobileFiltersOpen}
        filterHandlers={{
          handleSortFilterChange,
          handleQuantityFilterChange,
          handlePriceFilterChange,
          quanityOptionsList,
        }}
      />
    </StyledFilterOptions>
  );
};

FilterOptions.propTypes = {
  filterOptions: PropTypes.object,
};
