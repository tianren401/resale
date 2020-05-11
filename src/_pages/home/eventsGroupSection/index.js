import React from 'react';
import PropTypes from 'prop-types';

import { TiledSection } from '_components';
import {
  StyledGroup,
  TriangleOverlay,
  Container,
  Title,
  EventTypeNavigation,
  SelectedTypeBtn,
  UnselectedTypeBtn,
} from './styledComponents';
import { groupEventTypeOptions } from '_constants';

export const EventsGroup = ({ events, gutter, onChangeType, eventType }) => {
  return (
    <StyledGroup>
      <TriangleOverlay />
      <Container>
        <Title>
          Events near <span>Philadelphia, PA</span>
        </Title>
        <EventTypeNavigation>
          {groupEventTypeOptions.map((item) => {
            const Component =
              eventType === item.value ? SelectedTypeBtn : UnselectedTypeBtn;
            return (
              <Component
                key={item.value}
                onClick={() => onChangeType(item.value)}
              >
                {item.label}
              </Component>
            );
          })}
        </EventTypeNavigation>
        <TiledSection events={events} gutter={gutter} />
      </Container>
    </StyledGroup>
  );
};

EventsGroup.propTypes = {
  events: PropTypes.array.isRequired,
  gutter: PropTypes.number,
  onChangeType: PropTypes.func,
  eventType: PropTypes.string,
};
