import React, { PropTypes } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, dims, gradient } from 'skydreamer/config';

const { buttonWarm } = colors.gradients;
const { start, end } = gradient.buttonWarm;

// todo: handle rotation
const { width } = Dimensions.get(`screen`);
import Scaling from 'skydreamer/utils/scaling';

const styles = Scaling.newStylesheet({
    buttonContainer: {
        alignItems: `center`
    },
    gradient: {
        width: width * 0.7,
        borderRadius: 1000
    },
    title: {
        textAlign: `center`,
        fontSize: 16,
        paddingVertical: 10,
        color: `#FFF`,
        fontWeight: `bold`
    }
});

const Button = ({ title, onPress, colors }) => (
  <TouchableOpacity
    style={styles.buttonContainer}
    onPress={onPress}
  >
    <LinearGradient
      colors={colors}
      start={start}
      end={end}
      style={styles.gradient}
    >
      <Text style={styles.title} >{title}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

Button.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
};
Button.defaultProps = {
    colors: buttonWarm,
    withBorder: false
};
Button.defaultProps = {
    colors: buttonWarm,
    withBorder: false
};
Button.defaultProps = {
    colors: buttonWarm,
    withBorder: false
};

export default Button;
