import React, { PropTypes } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

const FlexRowSpaceComponent = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const FlexRowSpace = ({ children, style }) => (
  <FlexRowSpaceComponent style={style}>
    {children}
  </FlexRowSpaceComponent>
);

FlexRowSpace.propTypes = {
  children: PropTypes.node.isRequired,
  style: View.propTypes.style,
};

FlexRowSpace.defaultProps = {
  style: {},
};

export default FlexRowSpace;
