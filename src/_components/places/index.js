import React, { useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import places from 'places.js';
import { useDispatch, useSelector } from 'react-redux';

import { useClickAway, useBrowserLocation } from '_hooks';
import { setLocation } from '_store/search';

import { StyledDropdown, SearchInput, IconContainer } from './styledComponents';

import { LocationIcon } from '_components/icon/svgIcons';

export const Places = ({ refine, defaultRefinement, className }) => {
  const handleClickAway = () => {
    // hide dropdown
  };
  // create our ref
  const myInput = useRef();
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
    const autocomplete = places({
      container: myInput.current,
    });

    autocomplete.on('change', (event) => {
      if (refine) {
        refine(event.suggestion.latlng);
      }
      // not use global search geosearch config
      handleSetLocation(event.suggestion.latlng);
    });

    autocomplete.on('clear', () => {
      if (refine) {
        refine(defaultRefinement);
      }
      // not use global search geosearch config
      handleSetLocation(defaultRefinement);
    });
  }, []); //eslint-disable-line

  const placeHolder =
    searchLocation?.lat && searchLocation?.lng
      ? 'Current Location'
      : 'Any Location';

  return (
    <StyledDropdown className={className}>
      <IconContainer>
        <LocationIcon />
      </IconContainer>
      <SearchInput
        ref={myInput}
        type="search"
        id="address-input"
        placeholder={placeHolder}
      />
    </StyledDropdown>
  );
};

Places.propTypes = {
  refine: PropTypes.func,
  defaultRefinement: PropTypes.object,
  className: PropTypes.string,
};
