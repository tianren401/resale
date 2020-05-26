import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import places from 'places.js';
import { useDispatch } from 'react-redux';

// import connect from './connector';
import { useClickAway } from '_hooks';
import { setLocation } from '_store/search';

import { StyledDropdown, SearchInput, IconContainer } from './styledComponents';

import { LocationIcon } from '_components/icon/svgIcons';

const Places = ({ refine, defaultRefinement }) => {
  const handleClickAway = () => {
    // hide dropdown
  };
  // create our ref
  const myInput = useRef();
  useClickAway({ ref: myInput, handleClickAway });

  // set location
  const dispatch = useDispatch();
  const handleSetLocation = (location) => {
    dispatch(setLocation(location));
  };

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

  return (
    <StyledDropdown>
      <IconContainer>
        <LocationIcon />
      </IconContainer>
      <SearchInput
        ref={myInput}
        type="search"
        id="address-input"
        placeholder="Any Location"
      />
    </StyledDropdown>
  );
};

Places.propTypes = {
  refine: PropTypes.func,
  defaultRefinement: PropTypes.object,
};
export const connectedPlaces = Places;

// for gloal location sertting use connector
// export const connectedPlaces = connect(Places);
