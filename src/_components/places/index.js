import React, { useRef, useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import places from 'places.js';
import { useDispatch, useSelector } from 'react-redux';

import { useClickAway, useBrowserLocation, useViewport } from '_hooks';
import { setLocation } from '_store/search';
import { StyledDropdown, SearchInput, IconContainer } from './styledComponents';

import { LocationIcon } from '_components/icon/svgIcons';
import { deviceSize, colors } from '_constants';
import { MobilePlacesModal } from './mobilePlaceModal';

export const Places = ({ defaultRefinement, isHome }) => {
  const [isFocused, setIsFocused] = useState(false);
  const handleClickAway = () => {
    // hide dropdown
    if (autocomplete.current) {
      autocomplete.current.close();
    }
    setIsFocused(false);
  };
  // create our ref
  const myInput = useRef();
  const autocomplete = useRef(null);
  useClickAway({ ref: myInput, handleClickAway });

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

  const { width } = useViewport();
  const isMobileDevice = width < deviceSize.tablet;
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleInputClick = () => {
    if (isMobileDevice) {
      setShowModal(true);
    }
    setIsFocused(true);
  };

  useEffect(() => {
    if (!error && !!latitude && !!longitude && !searchLocation) {
      handleSetLocation({
        latitude,
        longitude,
      });
    }
    return () => {};
  }, [latitude, longitude, error, handleSetLocation, searchLocation]);

  useEffect(() => {
    if (myInput.current && !autocomplete.current) {
      autocomplete.current = places({
        container: myInput.current,
      });

      autocomplete.current.on('change', (event) => {
        const {
          latlng: { lat, lng },
          value,
        } = event.suggestion;
        handleSetLocation({
          latitude: lat,
          longitude: lng,
          address: value,
        });
        autocomplete.current.close();
      });

      autocomplete.current.on('clear', () => {
        // not use global search geosearch config
        handleSetLocation(defaultRefinement);
      });
    }
  }, [handleSetLocation, defaultRefinement]);

  const placeHolder = !searchLocation?.address
    ? 'Current Location'
    : searchLocation.address || 'Any Location';

  return (
    <>
      <StyledDropdown isHome={!isMobileDevice ? isHome : ''}>
        <IconContainer>
          <LocationIcon
            fill={
              !isMobileDevice && isHome && !isFocused ? '#ffffff' : colors.brand
            }
          />
        </IconContainer>
        <SearchInput
          ref={!isMobileDevice ? myInput : null}
          type="text"
          id="address-input"
          placeholder={placeHolder}
          onClick={handleInputClick}
          isHome={isHome}
        />
      </StyledDropdown>
      <MobilePlacesModal isOpen={showModal} handleClose={handleClose} />
    </>
  );
};

Places.propTypes = {
  defaultRefinement: PropTypes.object,
  isHome: PropTypes.bool,
};
