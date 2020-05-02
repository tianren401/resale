import React from 'react';

import { Flex, Text } from '_components';
import { colors } from 'theme';

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
