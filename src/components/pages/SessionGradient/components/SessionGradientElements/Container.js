import React, { PropTypes } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, dims, gradient } from 'skydreamer/config';

const ContainerView = styled.View`
  flex: 1;
  padding-top: ${dims.SCREEN_HEIGHT * 0.325};
  width: ${dims.SCREEN_WIDTH - dims.slidePadding * 2};
  height: 100%;
`;

const SliderView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${dims.slidePadding};
`;

const Container = ({ children, index }) => (
  <LinearGradient
    colors={gradient.sessionManager[index]}
    start={{ x: 0, y: 1 }}
    end={{ x: 1, y: 1 }}
    style={{ flex: 1 }}
  >
    <SliderView>
      <ContainerView>
        {children}
      </ContainerView>
    </SliderView>
  </LinearGradient>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
};

export default Container;
