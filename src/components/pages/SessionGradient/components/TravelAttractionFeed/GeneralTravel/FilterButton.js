import React, { PropTypes } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import Scaling from 'skydreamer/utils/scaling';
const gradientStart = { x: 0, y: 0 };
const gradientEnd = { x: 1, y: 1 };

const styles = Scaling.newStylesheet({
  infoContainer: {
    padding: 5,
    borderRadius: 200,
  },
});

const FilterButton = ({ color, size, style, onPress, icon, colorStart, colorEnd }) => (
  <LinearGradient colors={[colorStart, colorEnd]} start={gradientStart} end={gradientEnd} style={[styles.infoContainer, style]}>
    <TouchableOpacity onPress={onPress} style={{ padding: 6}}>
      <Icon
        name={icon}
        size={size}
        color={color}
      />
    </TouchableOpacity>
  </LinearGradient>

);

FilterButton.propTypes = {
  color: PropTypes.string.isRequired,
  colorStart: PropTypes.string.isRequired,
  colorEnd: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  style: PropTypes.object,
  onPress: PropTypes.func.isRequired,
};

FilterButton.defaultProps = {
  style: {},
  icon: 'pencil',
  colorStart: 'rgb(56, 177, 92)',
  colorEnd: 'rgb(191, 199, 91)',


};

export default FilterButton;
