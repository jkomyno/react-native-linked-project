/**
 * @Class:             ButtonBack.js
 * @Description:       Render previous button on Session Pages
 * @Author:            Paolo Pirruccio      @Date: 19/04/2017
 * @Notes:
 * @Revision History:
 * @Name:              @Date:      @Description:
 */
import React, { PropTypes } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = {
  textStyle: {
    color: '#FFF',
    fontSize: 22,
    fontFamily: 'NotoSans-Semibold',
    marginRight: 30,
    marginLeft: 30,
  },
  buttonStyle: {
    position: 'absolute',
    left: 0,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 4,
    marginRight: 170,
    marginBottom: 10,
    padding: 20,
  },
};

const noop = () => {};

const ButtonBack = ({ onPress }) => {
  const {
    buttonStyle,
    textStyle,
  } = styles;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={buttonStyle}
    >
      <Icon
        name="chevron-left"
        size={30}
        color="#fff"
        style={{ alignSelf: 'flex-start', alignItems: 'flex-start' }}
      />
    </TouchableOpacity>
  );
};

ButtonBack.propTypes = {
  onPress: PropTypes.func,
};

ButtonBack.defaultProps = {
  onPress: noop,
};

export default ButtonBack;
