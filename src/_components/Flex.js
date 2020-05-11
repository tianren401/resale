import styled from 'styled-components';
import { withBoxModelProps } from '_helpers/style-utils';

export const Flex = withBoxModelProps(styled.div`
  display: ${(props) => (props.inline ? 'inline-flex' : 'flex')};
  flex: ${(props) => props.flex};
  flex-direction: ${(props) => props.direction};
  flex-grow: ${(props) => props.flexGrow};
  flex-shrink: ${(props) => props.flexShrink};
  flex-basis: ${(props) => props.flexBasis};
  flex-wrap: ${(props) => props.flexWrap};
  order: ${(props) => props.order};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
  align-content: ${(props) => props.alignContent};
  align-self: ${(props) => props.alignSelf};
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  min-height: ${(props) => props.minHeight};
  min-width: ${(props) => props.minWidth};
  max-width: ${(props) => props.maxWidth};
  position: ${(props) => props.position};
`);

export const FlexItem = withBoxModelProps(styled.div`
  flex: ${(props) => (props.flex !== undefined ? props.flex : 1)};
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  align-self: ${(props) => props.alignSelf};
  overflow: ${(props) => props.overflow};
  position: ${(props) => props.position};
`);

Flex.displayName = 'Flex';
FlexItem.displayName = 'FlexItem';
