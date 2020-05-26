import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { connectAutoComplete } from 'react-instantsearch-dom';
import throttle from 'lodash/throttle';

/* Styled Components */
import { SearchInput, IconContainer } from './styledComponents';
import { FlexItem, Flex } from '_components';
import { Icon } from '_components/icon';
import { colors } from '_constants';
const SearchIcon = <Icon size={24} color={colors.brand} name="search" />;

const Autocomplete = ({
  placeholder,
  onChange,
  onChangeResults,
  showDropdown,
  showAutocompleteIcon,
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

  const handleChangeResults = useCallback(
    (results) => {
      setOptions(results);
      if (onChangeResults) {
        onChangeResults(results);
      }
    },
    [setOptions, onChangeResults]
  );

  const resetSearch = () => {
    setShowOptions(false);
    setActiveOption(0);
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
      handleChangeResults([]);
      return undefined;
    }

    setLoading(true);
    if (inputValue.length >= 3) {
      fetch(inputValue);
    }
  }, [inputValue, fetch, handleChangeResults]);

  useEffect(() => {
    const active = true;

    if (active) {
      setShowOptions(true);
      setActiveOption(0);
      handleChangeResults(hits);
    }
  }, [hits, handleChangeResults]);

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  });

  return (
    <FlexItem>
      <Flex position="relative" align="center" justify="flex-start">
        {showAutocompleteIcon && <IconContainer>{SearchIcon}</IconContainer>}
        <SearchInput
          type="text"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={inputValue}
          placeholder={placeholder}
          ref={inputEl}
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
  showDropdown: PropTypes.bool.isRequired,
  showAutocompleteIcon: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  onChangeResults: PropTypes.func,
  renderList: PropTypes.func,
  hits: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentRefinement: PropTypes.string,
  refine: PropTypes.func.isRequired,
};

export const connectedAutocomplete = connectAutoComplete(Autocomplete);
