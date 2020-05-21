import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { deviceSize } from '_constants';

const TabRow = styled.ul`
  display: flex;
  justify-content: space-around;
  list-style: none;
  text-align: center;
  border-bottom: 3px solid #e6e6eb;
  margin: 10px 0;
  padding: 0;

  @media (max-width: ${deviceSize.tablet}px) {
    display: none;
  }
`;

const TabHeader = styled.span`
color: #000;
padding: 6px 12px 6px 12px;
text-decoration: none;
display: block;
font-weight: 600;
font-size: 14px;
line-height: 20px;
}
`;

const Tab = styled.li`
  width: 25%;
  padding: 0 5px;
  display: inline-block;
  margin-bottom: -3px;
  ${({ selected }) =>
    selected
      ? 'border-bottom: 3px solid #6726f1; > span { color: #6726F1; }'
      : 'cursor: pointer; color: #d02027;'};
`;

export const TabbedContent = ({ sendToPerformerSection }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabSelect = (tabIndex) => {
    setSelectedTab(tabIndex);
    sendToPerformerSection(tabIndex);
  };

  return (
    <TabRow>
      <Tab selected={selectedTab === 0} onClick={() => handleTabSelect(0)}>
        <TabHeader>Events</TabHeader>
      </Tab>
      <Tab selected={selectedTab === 1} onClick={() => handleTabSelect(1)}>
        <TabHeader>FAQ</TabHeader>
      </Tab>
      <Tab selected={selectedTab === 2} onClick={() => handleTabSelect(2)}>
        <TabHeader>Ticket Info</TabHeader>
      </Tab>
      <Tab selected={selectedTab === 3} onClick={() => handleTabSelect(3)}>
        <TabHeader>News</TabHeader>
      </Tab>
    </TabRow>
  );
};

TabbedContent.propTypes = {
  sendToPerformerSection: PropTypes.func,
};
