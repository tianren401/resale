import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useClickAway, useViewport } from '_hooks';
import { Modal } from '_components';
import {
  StyledDropdownMenu,
  Option,
  StyledDropdown,
  DropdownArrowUp,
  DropdownArrowDown,
  Header,
  Text,
  CloseButton,
  HompeageDropdownText,
} from './styledComponents';

import { Box } from '_components/styledTags';
import {
  TickIcon,
  ChevronRightIcon,
  CloseModalIcon,
} from '_components/icon/svgIcons';
import { deviceSize, zIndexes } from '_constants';

const modalStyles = {
  content: {
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    padding: '0px',
    zIndex: zIndexes.OVERLAY,
  },
};

export const DropdownMenu = ({
  options,
  handleSelect,
  handleClickAway,
  auto,
  title,
  selectedOption,
  showNavigation,
  onClose,
}) => {
  const ref = useRef();
  useClickAway({ ref, handleClickAway });

  const { width } = useViewport();
  const isMobileDevice = width < deviceSize.tablet;

  const [showModal, setShowModal] = useState(isMobileDevice);
  const handleClose = () => {
    setShowModal(false);

    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {isMobileDevice && (
        <Modal
          isOpen={showModal}
          customStyles={modalStyles}
          closeModal={handleClose}
        >
          <Header>
            <CloseButton onClick={handleClose}>
              <CloseModalIcon />
            </CloseButton>

            <Text>{title}</Text>
          </Header>
          {options
            .filter((option) => option.key !== 'initials')
            .map((option, index) => (
              <Option
                key={index}
                onClick={() => handleSelect(option)}
                hasChildren={!!option.children}
                to={option.key === 'settings' ? '/user' : '#'}
              >
                {option.label}
                {showNavigation ? (
                  <Box style={{ position: 'absolute', right: '20px' }}>
                    <img src={option.image} alt={option.label} />
                  </Box>
                ) : (
                  option.key === selectedOption.key &&
                  !option.children && (
                    <Box style={{ position: 'absolute', right: '20px' }}>
                      <TickIcon />
                    </Box>
                  )
                )}
                {option.children && (
                  <Box style={{ position: 'absolute', right: '20px' }}>
                    <ChevronRightIcon />
                  </Box>
                )}
                {option.children}
              </Option>
            ))}
        </Modal>
      )}

      {!isMobileDevice && (
        <StyledDropdownMenu
          ref={ref}
          auto={auto}
          showNavigation={showNavigation}
        >
          {options
            .filter((option) => option.key !== 'initials')
            .map((option, index) => (
              <Option
                key={index}
                onClick={() => handleSelect(option)}
                hasChildren={!!option.children}
                showNavigation={showNavigation}
                to={option.key === 'settings' ? '/user' : '#'}
              >
                {!showNavigation && option.label}
                {showNavigation ? (
                  <Box style={{ position: 'absolute', left: '20px' }}>
                    <img src={option.image} alt={option.label} />
                  </Box>
                ) : (
                  option.key === selectedOption.key &&
                  !option.children && (
                    <Box style={{ position: 'absolute', right: '20px' }}>
                      <TickIcon />
                    </Box>
                  )
                )}
                {showNavigation && (
                  <HompeageDropdownText>{option.label}</HompeageDropdownText>
                )}
                {option.children && (
                  <Box style={{ position: 'absolute', right: '20px' }}>
                    <ChevronRightIcon />
                  </Box>
                )}
                {option.children}
              </Option>
            ))}
        </StyledDropdownMenu>
      )}
    </>
  );
};

DropdownMenu.propTypes = {
  options: PropTypes.arrayOf(PropTypes.any),
  handleSelect: PropTypes.func.isRequired,
  handleClickAway: PropTypes.func.isRequired,
  auto: PropTypes.bool,
  selectedOption: PropTypes.any,
  showNavigation: PropTypes.any,
  title: PropTypes.string,
  onClose: PropTypes.func,
};

export const Dropdown = ({
  options,
  defaultOption,
  plain,
  handleChange,
  showNavigation,
  title,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  useEffect(() => {
    if (selectedOption.label) return;
    // find default option
    const defaultSelected = options.find(
      (option) => (option.key = defaultOption)
    );
    setSelectedOption(defaultSelected);
  }, [options, defaultOption, selectedOption.label]);

  const handleOpen = () => setIsOpen(true);

  const handleSelect = (option) => {
    handleChange(option);
    if (!showNavigation) {
      setSelectedOption(option);
    }

    if (!option.children) {
      setIsOpen(false);
    }
  };

  const handleClickAway = () => {
    isOpen && setIsOpen(false);
  };

  const className = isOpen ? 'active' : 'inactive';

  return (
    <StyledDropdown
      onMouseUp={handleOpen}
      plain={plain}
      className={className}
      {...rest}
      showNavigation={showNavigation}
    >
      {selectedOption?.label}
      {showNavigation ? null : isOpen ? (
        <Box marginLeft="15px">
          <DropdownArrowUp width={10} />
        </Box>
      ) : (
        <Box marginLeft="15px">
          <DropdownArrowDown width={10} />
        </Box>
      )}

      {isOpen && (
        <DropdownMenu
          selectedOption={selectedOption}
          options={options}
          handleSelect={handleSelect}
          handleClickAway={handleClickAway}
          showNavigation={showNavigation}
          title={title}
          onClose={handleClickAway}
        />
      )}
    </StyledDropdown>
  );
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.any),
  defaultOption: PropTypes.any,
  plain: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
  showNavigation: PropTypes.bool,
  title: PropTypes.string,
};
