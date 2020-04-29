import React from 'react';
import SearchBar from 'components/SearchBar';
import { fetchSearch } from 'services/actions';
export const Home = () => (
  <div>
    <SearchBar fetchData={fetchSearch} onChange={() => {}} />
  </div>
);
