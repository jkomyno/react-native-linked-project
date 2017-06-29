import React, { PropTypes } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';

const AnimatedContainer = styled(Animated.View)`
  background-color: #FFF;
  flex: 1;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  transform: scale(1.1);
`;

const AnimatedModal = ({ position, children, height, ...rest }) => (
  <AnimatedContainer
    style={{
      height,
      transform: [{
        translateY: position,
      }],
    }}
    {...rest}
  >
    {children}
  </AnimatedContainer>
);

AnimatedModal.propTypes = {
  position: PropTypes.shape().isRequired,
  height: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

AnimatedModal.defaultProps = {
  position: {},
  height: 0,
  chidren: [],
};

export default AnimatedModal;
