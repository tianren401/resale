import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { GroupSvgIcon } from '_components';
import { colors } from '_constants';

const Sidebar = styled.div`
  width: 220px;
  display: flex;
  flex-direction: column;
  margin-right: 80px;
`;

const SidebarItem = styled.div`
  display: flex;
  height: 48px;
  justify-content: flex-start;
  align-items: center;
  padding: 0 20px;
  border-radius: 4px 0px 0px 4px;
  user-select: none;
  margin-bottom: 15px;
  box-sizing: content-box;

  ${(props) =>
    props.active &&
    `& {
      background: ${colors.lightBrand};
      border-right: 5px solid ${colors.brand};
    }
  `}
  &:hover {
    background: ${colors.lightBrand};

    & path {
      fill: ${colors.brand};
    }

    & div {
      color: ${colors.brand};
    }
  }
`;

const Label = styled.div`
  margin-left: 8px;
  color: ${(props) => props.color};
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
`;

const sidebarItems = [
  {
    name: 'tickets',
    label: 'My Tickets',
  },
  {
    name: 'past',
    label: 'Past Events',
  },
];

export const OrdersSidebar = ({ stage, handleSidebarStage }) => {
  return (
    <Sidebar>
      {sidebarItems.map((item, index) => (
        <SidebarItem
          key={`sidebar${index}`}
          active={stage === index}
          onClick={() => handleSidebarStage(index)}
        >
          <GroupSvgIcon
            size={18}
            name={item.name}
            color={stage === index ? colors.brand : colors.darkGray}
            viewBox="0 0 18 18"
          />
          <Label color={stage === index ? colors.brand : colors.darkGray}>
            {item.label}
          </Label>
        </SidebarItem>
      ))}
    </Sidebar>
  );
};

OrdersSidebar.propTypes = {
  stage: PropTypes.number,
  handleSidebarStage: PropTypes.func,
};
