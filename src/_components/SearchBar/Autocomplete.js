import React, { useState, useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';
/* Styled Components */
import { SearchInput } from './StyledComponents';

import { FlexItem } from '_components';

const Autocomplete = ({
  value,
  fetchData,
  placeholder,
  onChange,
  renderList,
  ...rest
}) => {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [activeOption, setActiveOption] = useState(0);

  const dropdownEl = useRef(null);
  const inputEl = useRef(null);

  const handleChange = (event) => {
    setInputValue(event.target.value);
    onChange(event.target.value);
  };

  const resetSearch = () => {
    setShowOptions(false);
    setActiveOption(0);
    setOptions([]);
    setLoading(false);
  };

  const handleItemClick = (event) => {
    setActiveOption(0);
    setShowOptions(false);
    // setInputValue(options[activeOption]);
  };

  const handleKeyDown = (event) => {
    const { key } = event;
    if (key === 'Enter') {
      setActiveOption(0);
      setShowOptions(false);
      setInputValue(options[activeOption]);
    } else if (key === 'ArrowUp') {
      if (activeOption === 0) {
        return;
      }
      setActiveOption(Math.max(0, activeOption - 1));
    } else if (key === 'ArrowDown') {
      if (activeOption === options.length - 1) {
        return;
      }
      setActiveOption(activeOption + 1);
    } else if (key === 'Escape') {
      resetSearch();
    }
  };

  const handleDocumentClick = (event) => {
    const dropdownArea = dropdownEl.current;
    const searchInput = inputEl.current;

    if (
      dropdownArea &&
      !dropdownArea.contains(event.target) &&
      searchInput &&
      !searchInput.contains(event.target)
    ) {
      resetSearch();
    }
  };

  const fetch = useMemo(() => throttle(fetchData, 200), [fetchData]);

  useEffect(() => {
    let active = true;

    if (inputValue.length <= 1) {
      setOptions([]);
      return undefined;
    }

    setLoading(true);

    fetch(inputValue).then((results) => {
      setLoading(false);
      if (active) {
        setShowOptions(true);
        setActiveOption(0);
        setOptions(results || []);
      }
    });

    document.addEventListener('click', handleDocumentClick);

    return () => {
      active = false;
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [inputValue, fetch]);

  return (
    <FlexItem position="relative">
      <SearchInput
        type="text"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={inputValue}
        placeholder={placeholder}
        ref={inputEl}
      />
      {showOptions &&
        inputValue &&
        renderList({
          results: options,
          dropdownEl,
          handleItemClick,
          onChange: (value) => {
            setInputValue(value);
            onChange(value);
          },
        })}
    </FlexItem>
  );
};

Autocomplete.propTypes = {
  placeholder: PropTypes.string,
  fetchData: PropTypes.func.isRequired,
  onChange: PropTypes.func,
};

export default Autocomplete;
