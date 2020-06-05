import React, { useRef, useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import places from 'places.js';
import { useDispatch, useSelector } from 'react-redux';

import { useClickAway, useBrowserLocation, useViewport } from '_hooks';
import { setLocation } from '_store/search';
import { StyledDropdown, SearchInput, IconContainer } from './styledComponents';

import { LocationIcon } from '_components/icon/svgIcons';
import { deviceSize } from '_constants';
import { MobilePlacesModal } from './mobilePlaceModal';

export const Places = ({ defaultRefinement, className }) => {
  const handleClickAway = () => {
    // hide dropdown
    if (autocomplete.current) {
      autocomplete.current.close();
    }
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
  };

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
          ref={!isMobileDevice ? myInput : null}
          type="search"
          id="address-input"
          placeholder={placeHolder}
          onClick={handleInputClick}
        />
      </StyledDropdown>
      <MobilePlacesModal isOpen={showModal} handleClose={handleClose} />
    </>
  );
};

Places.propTypes = {
  defaultRefinement: PropTypes.object,
  className: PropTypes.string,
};
