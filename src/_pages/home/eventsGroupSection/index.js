import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { TiledSection } from '_components';
import { Places } from '_components/places';
import { useViewport } from '_hooks';
import { deviceSize } from '_constants';
import {
  StyledGroup,
  TriangleOverlay,
  Container,
  EventTypeNavigation,
  EventTypeTypeBtn,
  LocationContainer,
} from './styledComponents';
import { groupEventTypeOptions } from '_constants';
import { searchService } from '_services';

export const EventsGroup = ({ events, gutter, onChangeType, eventType }) => {
  const searchLocation = useSelector(
    ({ searchReducer }) => searchReducer.location
  );

  const windowSize = useViewport();
  const isMobileDevice = windowSize.width < deviceSize.tablet;
  return (
    <StyledGroup>
      <TriangleOverlay />
      <Container>
        {isMobileDevice && (
          <LocationContainer>
            <Places
              defaultRefinement={
                searchLocation || searchService.defaultLocation
              }
              isHome
            />
          </LocationContainer>
        )}
        <EventTypeNavigation>
          {groupEventTypeOptions.map((item) => {
            return (
              <EventTypeTypeBtn
                selected={eventType === item.value}
                key={item.value}
                onClick={() => onChangeType(item.value)}
              >
                {item.label}
              </EventTypeTypeBtn>
            );
          })}
          {!isMobileDevice && (
            <LocationContainer>
              <Places
                defaultRefinement={
                  searchLocation || searchService.defaultLocation
                }
                isHome
              />
            </LocationContainer>
          )}
        </EventTypeNavigation>
        <TiledSection
          events={
            eventType === 'trendingEvent'
              ? events.trendingEvents
              : events.trendingPerformers
          }
          gutter={gutter}
        />
      </Container>
    </StyledGroup>
  );
};

EventsGroup.propTypes = {
  events: PropTypes.object.isRequired,
  gutter: PropTypes.number,
  onChangeType: PropTypes.func,
  eventType: PropTypes.string,
};
