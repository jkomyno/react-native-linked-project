/**
 * @Class:             ButtonNext.js
 * @Description:       Render next button on Session Pages
 * @Author:            Guilherme Borges Bastos      @Date: 20/02/2017
 * @Notes:
 * @Revision History:
 * @Name:              @Date:      @Description:
 * Alberto Schiabel    13/03/2017  eslint
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
    right: 0,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 170,
    marginRight: 4,
    marginBottom: 160,
    padding: 20,
  },
};

const noop = () => {};

const ButtonNext = ({ onPress }) => {
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
        name="chevron-right"
        size={30}
        color="#fff"
        style={{ alignSelf: 'flex-end', alignItems: 'flex-end' }}
      />
      <Icon
        name="chevron-right"
        size={30}
        color="#fff"
        style={{ alignSelf: 'flex-end', alignItems: 'flex-end' }}
      />
      <Icon
        name="chevron-right"
        size={30}
        color="#fff"
        style={{ alignSelf: 'flex-end', alignItems: 'flex-end' }}
      />
    </TouchableOpacity>
  );
};

ButtonNext.propTypes = {
  onPress: PropTypes.func,
};

ButtonNext.defaultProps = {
  onPress: noop,
};

export default ButtonNext;
