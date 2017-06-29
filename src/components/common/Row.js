import React, { PropTypes } from 'react';
import styled from 'styled-components/native';

const RowContainer = styled.View`
  flex: 1;
  flex-direction: row;
`;

const Row = ({ style, children }) => (
  <RowContainer style={style}>
    {children}
  </RowContainer>
);

Row.propTypes = {
    style: PropTypes.any,
    children: PropTypes.node.isRequired
};

Row.defaultProps = {
    style: {}
};

export default Row;
