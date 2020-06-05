import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Dropdown } from '_components/dropdown';
import { setCategory } from '_store/search';

const categories = [
  { key: 'any', label: 'Any Category' },
  { key: 'SPORT', label: 'Sport' },
  { key: 'CONCERT', label: 'Concert' },
  { key: 'THEATER', label: 'Theater' },
  { key: 'FESTIVAL', label: 'Festival' },
  { key: 'OTHER', label: 'Other' },
];

export const CategoriesDropdown = () => {
  const dispatch = useDispatch();

  const handleSetCategory = ({ key }) => {
    dispatch(setCategory(key));
  };

  const searchCategory = useSelector(
    ({ searchReducer }) => searchReducer.category
  );

  return (
    <Dropdown
      options={categories}
      defaultOption={searchCategory}
      handleChange={handleSetCategory}
      title="Select Category"
    />
  );
};
