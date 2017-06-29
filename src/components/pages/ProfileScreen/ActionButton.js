import React, { PropTypes } from 'react';
import {
  TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Scaling from 'skydreamer/utils/scaling';
import Ionicon from 'react-native-vector-icons/FontAwesome';
const gradientStart = { x: 0, y: 0 };
const gradientEnd = { x: 1, y: 1 };

const styles = Scaling.newStylesheet({
  infoContainer: {
    padding: 5,
    borderRadius: 200
  }
});

const ActionButton = ({ color, size, style, onPress, icon, colorStart, colorEnd }) => (
  <LinearGradient colors={[colorStart, colorEnd]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.infoContainer, style]}>
    <TouchableOpacity onPress={onPress} style={{ padding: 0 }}>
        <Ionicon name={icon} size={size} color={color} />
    </TouchableOpacity>
  </LinearGradient>

);


ActionButton.defaultProps = {
  style: {},
  icon: 'pencil',
  colorStart: '#39b25b',
  colorEnd: '#87e72a'
};

export default ActionButton;
