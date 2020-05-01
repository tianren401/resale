import React, { useState, useEffect, useMemo } from 'react';
import throttle from 'lodash/throttle';
/* Styled Components */
import {
  SearchContainer,
  SearchInput,
  SubmitButton,
  AutoCompletItem,
  AutocompleteList,
  EmptyListContainer,
} from './StyledComponents';
import { Flex } from 'components/Flex';

const Autocomplete = ({ fetchData, placeholder, ...rest }) => {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [activeOption, setActiveOption] = useState(0);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClick = (event) => {
    setActiveOption(0);
    setShowOptions(false);
    setInputValue(event.target.value);
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

    return () => {
      active = false;
    };
  }, [inputValue, fetch]);

  let optionList;
  if (showOptions && inputValue) {
    if (options.length) {
      optionList = (
        <AutocompleteList>
          {options.map((optionName, index) => {
            let className;
            if (index === activeOption) {
              className = 'active';
            }
            return (
              <AutoCompletItem
                className={className}
                key={optionName}
                onClick={handleClick}
              >
                {optionName}
              </AutoCompletItem>
            );
          })}
        </AutocompleteList>
      );
    } else {
      optionList = (
        <EmptyListContainer>
          <em>No Results...</em>
        </EmptyListContainer>
      );
    }
  }
  return (
    <Flex position="relative">
      <SearchContainer>
        <SearchInput
          type="text"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={inputValue}
          placeholder={placeholder}
        />
        <SubmitButton type="submit" value="" />
      </SearchContainer>
      {optionList}
    </Flex>
  );
};

export default Autocomplete;
