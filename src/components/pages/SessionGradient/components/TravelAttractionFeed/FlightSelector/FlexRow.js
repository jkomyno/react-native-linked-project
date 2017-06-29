import React, { PropTypes } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

const FlexRowComponent = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const FlexRow = ({ children, style }) => (
  <FlexRowComponent style={style}>
    {children}
  </FlexRowComponent>
);

FlexRow.propTypes = {
  children: PropTypes.node.isRequired,
  style: View.propTypes.style,
};

FlexRow.defaultProps = {
  style: {},
};

export default FlexRow;
