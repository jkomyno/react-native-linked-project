import React, { PropTypes } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

const window = Dimensions.get('window');

const Touchable = styled.TouchableOpacity`
  flex: 1;
`;

const BottomShadowGradient = styled(LinearGradient)`
  position: absolute;
  top: 0;
  width: ${window.width};
  height: 90;
  padding-left: 15;
  padding-right: 15;
  border-radius: 5;
`;

const BottomFader = ({ children, height, onPress }) => (
  <Touchable
    style={{ height }}
    onPress={onPress}
    activeOpacity={0.3}
  >
    {children}
    <BottomShadowGradient
      style={{ height }}
      colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
    />
  </Touchable>
);

BottomFader.propTypes = {
  children: PropTypes.node.isRequired,
  height: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
};

BottomFader.defaultProps = {
  height: 90,
  onPress: () => {},
};

export default BottomFader;
