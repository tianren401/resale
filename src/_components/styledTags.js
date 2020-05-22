import styled, { css } from 'styled-components';
import { deviceSize } from '_constants';

import { withBoxModelProps } from '_helpers/style-utils';
import { colors } from '_constants';

const WEIGHTS = new Map()
  .set('lighter', '200')
  .set('light', '300')
  .set('normal', '400')
  .set('heavy', '700');

const ellipsis = (props) =>
  props.ellipsis &&
  css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `;

export const H1 = withBoxModelProps(styled.h1`
  color: ${(props) => (props.color ? props.color : colors.black)};
  font-size: ${(props) => (props.size ? props.size : '48px')};
  font-weight: ${(props) => (props.weight ? props.weight : 'bold')};
  line-height: ${(props) => (props.lineHeight ? props.lineHeight : '56px')};
`);

export const H2 = withBoxModelProps(styled.h2`
  color: ${(props) => (props.color ? props.color : colors.black)};
  font-size: ${(props) => (props.size ? props.size : '36px')};
  font-weight: ${(props) => (props.weight ? props.weight : '600')};
  line-height: ${(props) => (props.lineHeight ? props.lineHeight : '42px')};
`);

export const H3 = withBoxModelProps(styled.h3`
  color: ${(props) => (props.color ? props.color : colors.black)};
  font-size: ${(props) => (props.size ? props.size : '24px')};
  font-weight: ${(props) => (props.weight ? props.weight : '600')};
  line-height: ${(props) => (props.lineHeight ? props.lineHeight : '32px')};
`);

export const H4 = withBoxModelProps(styled.h4`
  color: ${(props) => (props.color ? props.color : colors.black)};
  font-size: ${(props) => (props.size ? props.size : '18px')};
  font-weight: ${(props) => (props.weight ? props.weight : '600')};
  line-height: ${(props) => (props.lineHeight ? props.lineHeight : '24px')};
`);

export const H5 = withBoxModelProps(styled.h5`
  color: ${(props) => (props.color ? props.color : colors.black)};
  font-size: ${(props) => (props.size ? props.size : '14px')};
  font-weight: ${(props) => (props.weight ? props.weight : 'normal')};
  line-height: ${(props) => (props.lineHeight ? props.lineHeight : '20px')};
`);

export const H6 = withBoxModelProps(styled.h6`
  color: ${(props) => (props.color ? props.color : colors.black)};
  font-size: ${(props) => (props.size ? props.size : '12px')};
  font-weight: ${(props) => (props.weight ? props.weight : 'normal')};
  line-height: ${(props) => (props.lineHeight ? props.lineHeight : '16px')};
`);

export const P1 = styled.p.attrs((props) => ({
  size: props.size === 'small' ? '0.875rem' : props.size,
}))`
  margin: 0;
  color: ${(props) => props.color || colors.black};
  font-size: ${(props) => props.size || '1rem'};
  font-weight: ${(props) => props.weight || 'normal'};
  font-family: ${(props) => props.font};
  letter-spacing: ${(props) => props.letterSpacing};
`;

export const S1 = styled.span`
  color: ${(props) => props.color || colors.black};
  font-size: ${(props) => props.size || '12px'};
  font-weight: ${(props) => props.weight || 'normal'};

  ${ellipsis};
`;

export const Label = styled.label`
  display: ${(props) => (props.inline ? 'inline-block' : 'block')};
  color: ${(props) => (props.color ? props.color : colors.black)};
  font-size: ${(props) => props.size || '14px'};
  font-weight: ${(props) => props.weight || 'normal'};
`;

export const Box = withBoxModelProps(styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`);

export const Text = withBoxModelProps(styled.p`
  font-size: ${(props) => props.size && `${props.size}px`};
  font-weight: ${(props) => WEIGHTS.get(props.weight)};
  color: ${(props) => props.color || null};
  margin: ${(props) => props.margin || 0};
  text-align: ${(props) => props.textAlign};
  opacity: ${(props) => props.opacity};
  cursor: ${(props) => props.cursor};
  font-style: ${(props) => props.fontStyle};
  text-transform: ${(props) => props.textTransform};
  ${ellipsis};
`);

export const ContentImage = styled.img`
  vertical-align: middle;
  src: ${(props) => props.src};
`;

export const SearchRowContainer = styled.div`
  width: 100%;
  margin: auto;
  padding: 30px 0;
  max-width: 940px;
  position: absolute;
  top: 70%;
  left: 0;
  right: 0;
  z-index: 100;
  @media (min-width: ${deviceSize.tablet}px) {
    width: calc(100% - 60px);
    padding: 30px;
    display: block;
  }

  @media (min-width: ${deviceSize.laptop}px) {
    width: 100%;
    padding: 30px 0;
  }

  @media (max-width: ${deviceSize.tablet}px) {
    position: relative !important;
    padding: 0;
    margin-top: -30px !important;
  }
`;
