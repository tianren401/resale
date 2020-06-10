import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  StyledMobileFilterOptions,
  ListDropdown,
  CloseMobileFilterOptions,
  MobileFilterContainer,
  PriceSortButton,
  MobileFilterTitle,
} from './styledComponents';
import { RangeSlider, PrimaryButton } from '_components';

export const MobileFilterOptions = ({
  filterHandlers,
  mobileFiltersOpen,
  setMobileFiltersOpen,
}) => {
  const [priceAscActive, setpriceAscActive] = useState(true);

  const handlePriceSortButton = (e) => {
    e.preventDefault();
    console.log('hi');
    e.target.value === 'PriceAsc'
      ? setpriceAscActive(true)
      : setpriceAscActive(false);
    const options = { key: e.target.value };
    filterHandlers.handleSortFilterChange(options);
  };

  const handleCloseFilters = (event) => {
    event.preventDefault();
    setMobileFiltersOpen(false);
  };

  return (
    <StyledMobileFilterOptions
      mobileFiltersOpen={mobileFiltersOpen}
      setFiltersOpen={setMobileFiltersOpen}
    >
      <CloseMobileFilterOptions onClick={handleCloseFilters}>
        Close
      </CloseMobileFilterOptions>
      <MobileFilterContainer>
        <MobileFilterTitle>Quantity</MobileFilterTitle>
        <ListDropdown
          options={filterHandlers.quanityOptionsList(7)}
          defaultOption={'0'}
          plain={false}
          handleChange={filterHandlers.handleQuantityFilterChange}
          width={'185px'}
          title={'Quantity'}
        />
      </MobileFilterContainer>
      <MobileFilterContainer>
        <MobileFilterTitle>Price Sort</MobileFilterTitle>
        <PriceSortButton
          className={priceAscActive ? 'active' : ''}
          value={'PriceAsc'}
          onClick={(e) => handlePriceSortButton(e)}
        >
          Low to High
        </PriceSortButton>
        <PriceSortButton
          value={'PriceDesc'}
          className={priceAscActive ? '' : 'active'}
          onClick={(e) => handlePriceSortButton(e)}
        >
          High to Low
        </PriceSortButton>
      </MobileFilterContainer>
      <MobileFilterContainer>
        <MobileFilterTitle>Price Range</MobileFilterTitle>
        {window.Seatics?.eventInfo && (
          <RangeSlider
            minRange={0}
            maxRange={window.Seatics.eventInfo.maxEventTicketPrice}
            handleClickAway={() => null}
            handleChange={filterHandlers.handlePriceFilterChange}
            height={'100px'}
          />
        )}
      </MobileFilterContainer>
      <PrimaryButton buttonSize={'large'} onClick={handleCloseFilters}>
        Done
      </PrimaryButton>
    </StyledMobileFilterOptions>
  );
};

MobileFilterOptions.propTypes = {
  filterHandlers: PropTypes.object,
  mobileFiltersOpen: PropTypes.bool,
  setMobileFiltersOpen: PropTypes.func,
};
