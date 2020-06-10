import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/* Styled Components */
import { SearchInput, IconContainer } from './styledComponents';
import { FlexItem, Flex } from '_components';
import { Icon } from '_components/icon';
import { colors, deviceSize } from '_constants';
import { useViewport } from '_hooks';

const SearchIcon = <Icon size={24} color={colors.brand} name="search" />;
const SearchNavIcon = <Icon size={24} color={colors.white} name="search" />;
const SearchGrayIcon = <Icon size={24} color={colors.gray} name="search" />;

export const Autocomplete = ({
  placeholder,
  value,
  onChange,
  showDropdown,
  showAutocompleteIcon,
  renderList,
  options,
  navbarSearch,
  isResultsPage,
  ...rest
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [activeOption, setActiveOption] = useState(0);

  const windowSize = useViewport();
  const isMobileDevice = windowSize.width < deviceSize.tablet;

  const dropdownEl = useRef(null);
  const inputEl = useRef(null);

  const handleChange = (event) => {
    setInputValue(event.target.value);
    onChange(event.target.value);
  };

  const resetSearch = () => {
    setShowOptions(false);
    setActiveOption(0);
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

  useEffect(() => {
    const active = true;

    if (active) {
      setShowOptions(true);
      setActiveOption(0);
    }
  }, [options]);

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  });

  return (
    <FlexItem>
      <Flex
        position="relative"
        align="center"
        justify="flex-start"
        onClick={() => {
          setShowOptions(true);
        }}
      >
        {showAutocompleteIcon && (
          <IconContainer navbarSearch={navbarSearch}>
            {navbarSearch ? SearchNavIcon : SearchIcon}
          </IconContainer>
        )}
        {isMobileDevice && isResultsPage && (
          <IconContainer>{SearchGrayIcon}</IconContainer>
        )}

        <SearchInput
          type="text"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={inputValue}
          placeholder={placeholder}
          ref={inputEl}
          navbarSearch={navbarSearch}
          {...rest}
        />
        {showDropdown &&
          showOptions &&
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
      </Flex>
    </FlexItem>
  );
};

Autocomplete.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  showDropdown: PropTypes.bool.isRequired,
  showAutocompleteIcon: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  renderList: PropTypes.func,
  options: PropTypes.object.isRequired,
  isResultsPage: PropTypes.bool,
  navbarSearch: PropTypes.bool,
};
