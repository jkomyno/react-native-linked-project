import React, { PropTypes } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = {
    daySelectorText: {
        color: `#FFF`,
        fontSize: 22,
        fontFamily: `NotoSans-Semibold`,
        alignItems: `center`
    },
    buttonStyle: {
        zIndex: 1,
        flexDirection: `row`,
        width: 200,
        height: 40,
        paddingLeft: 20
    }
};

const noop = () => {};

const ButtonNext = ({ onPress, isMonth }) => {
    const {
    buttonStyle,
    textStyle
  } = styles;

    return (
    <TouchableOpacity
      onPress={onPress}
      style={buttonStyle}
    >
      <Text style={styles.daySelectorText}> Select {!isMonth?`month`: `days`}?</Text>
    </TouchableOpacity>
    );
};

ButtonNext.propTypes = {
    onPress: PropTypes.func
};

ButtonNext.defaultProps = {
    onPress: noop
};

export default ButtonNext;
