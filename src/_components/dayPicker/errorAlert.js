import React from 'react';
import PropTypes from 'prop-types';

import { Flex, Text } from '_components';
import { colors } from '_constants';

export const ErrorAlert = (props) => {
  const { msg } = props;
  return (
    <Flex height="20px" align="center" margin="20px">
      <Text paddingLeft="5px" size={12} color={colors.red}>
        {msg}
      </Text>
    </Flex>
  );
};

ErrorAlert.propTypes = {
  msg: PropTypes.string,
};
