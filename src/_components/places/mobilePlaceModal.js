import React, { useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import places from 'places.js';
import { useDispatch, useSelector } from 'react-redux';

import { useBrowserLocation } from '_hooks';
import { setLocation } from '_store/search';
import { Modal } from '_components';
import {
  StyledDropdown,
  SearchInput,
  IconContainer,
  Header,
  Text,
  CloseButton,
} from './styledComponents';
import { LocationIcon, CloseModalIcon } from '_components/icon/svgIcons';
import { zIndexes } from '_constants';

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

export const Places = ({ defaultRefinement, className }) => {
  // create our ref
  const myInput = useRef();
  const autocomplete = useRef(null);

  // set location
  const dispatch = useDispatch();
  const handleSetLocation = useCallback(
    (location) => {
      dispatch(setLocation(location));
    },
    [dispatch]
  );

  const searchLocation = useSelector(
    ({ searchReducer }) => searchReducer.location
  );

  const { latitude, longitude, error } = useBrowserLocation(true);

  useEffect(() => {
    if (!error && !!latitude && !!longitude) {
      handleSetLocation({
        lat: latitude,
        lng: longitude,
      });
    }
    return () => {};
  }, [latitude, longitude, error, handleSetLocation]);

  useEffect(() => {
    if (myInput.current && !autocomplete.current) {
      autocomplete.current = places({
        container: myInput.current,
      });

      autocomplete.current.on('change', (event) => {
        // not use global search geosearch config
        handleSetLocation(event.suggestion.latlng);
        autocomplete.current.close();
      });

      autocomplete.current.on('clear', () => {
        // not use global search geosearch config
        handleSetLocation(defaultRefinement);
      });
    }
  }, [handleSetLocation, defaultRefinement]);

  const placeHolder =
    searchLocation?.lat && searchLocation?.lng
      ? 'Current Location'
      : 'Any Location';

  return (
    <>
      <StyledDropdown className={className}>
        <IconContainer>
          <LocationIcon />
        </IconContainer>
        <SearchInput
          ref={myInput}
          type="search"
          id="address-input-mobile"
          placeholder={placeHolder}
        />
      </StyledDropdown>
    </>
  );
};

Places.propTypes = {
  refine: PropTypes.func,
  defaultRefinement: PropTypes.object,
  className: PropTypes.string,
};

export const MobilePlacesModal = ({ isOpen, handleClose }) => {
  return (
    <Modal isOpen={isOpen} customStyles={modalStyles} closeModal={handleClose}>
      <Header>
        <CloseButton onClick={handleClose}>
          <CloseModalIcon />
        </CloseButton>
        <Text>Change Location</Text>
      </Header>
      <Places className="modal" />
    </Modal>
  );
};

MobilePlacesModal.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
};
