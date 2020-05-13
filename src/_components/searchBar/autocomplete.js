import React, { useState, useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { connectAutoComplete } from 'react-instantsearch-dom';
import throttle from 'lodash/throttle';

/* Styled Components */
import { SearchInput, SearechInputContainer } from './styledComponents';
import { FlexItem } from '_components';
import { Icon } from '_components/icon';
import { colors } from '_constants';
const SearchIcon = <Icon size={24} color={colors.brand} name="search" />;

const Autocomplete = ({
  placeholder,
  onChange,
  renderList,
  hits,
  refine,
  ...rest
}) => {
  // eslint-disable-next-line
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

  const handleItemClick = () => {
    setActiveOption(0);
    setShowOptions(false);
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
      !dropdownArea?.contains(event.target) &&
      !searchInput?.contains(event.target)
    ) {
      resetSearch();
    }
  };

  const fetch = useMemo(() => throttle(refine, 500), [refine]);

  useEffect(() => {
    if (inputValue.length <= 1) {
      setOptions([]);
      return undefined;
    }

    setLoading(true);
    if (inputValue.length >= 3) {
      fetch(inputValue);
    }
  }, [inputValue, fetch]);

  useEffect(() => {
    const active = true;

    if (active) {
      setShowOptions(true);
      setActiveOption(0);
      setOptions(hits);
    }
  }, [hits]);

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  });

  return (
    <FlexItem>
      <SearechInputContainer
        position="relative"
        align="center"
        justify="flex-start"
      >
        {SearchIcon}
        <SearchInput
          type="text"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={inputValue}
          placeholder={placeholder}
          ref={inputEl}
          {...rest}
        />
        {showOptions &&
          inputValue?.length >= 3 &&
          renderList({
            results: options,
            dropdownEl,
            handleItemClick,
            onChange: (value) => {
              setInputValue(value);
              onChange(value);
            },
          })}
      </SearechInputContainer>
    </FlexItem>
  );
};

Autocomplete.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  renderList: PropTypes.func,
  hits: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentRefinement: PropTypes.string,
  refine: PropTypes.func.isRequired,
};

export const connectedAutocomplete = connectAutoComplete(Autocomplete);
