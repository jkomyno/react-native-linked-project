import React, { PropTypes } from 'react';
import {
  TextInput,
  View,
  StyleSheet
} from 'react-native';
import Scaling from 'skydreamer/utils/scaling';

const styles = Scaling.newStylesheet({
    inputStyle: {
        color: `#FFF`,
        paddingRight: 5,
        paddingLeft: 5,
        marginRight: 15,
        marginLeft: 15,
        paddingBottom: 20,
        fontSize: 18,
        lineHeight: 35,
        flex: 1,
        fontFamily: `Poppins-Regular`
    },
    containerStyle: {
        height: 50,
        flex: 1,
        flexDirection: `row`,
        alignItems: `center`
    }
});

const Input = (props) => {
    const {
    value,
    onChangeText,
    placeholder,
    secureTextEntry,
    placeholderColor,
    underlineColor
  } = props;
    const { inputStyle, containerStyle } = styles;

    return (
    <View style={containerStyle}>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        placeholderStyle={{ fontFamily: `Poppins-Regular`, fontSize: 18 }}
        autoCorrect={false}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={placeholderColor || `white`}
        underlineColorAndroid={underlineColor || `white`}
      />
    </View>
    );
};

Input.propTypes = {
    value: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    secureTextEntry: PropTypes.string,
    placeholderColor: PropTypes.string,
    underlineColor: PropTypes.string
};

export default Input;
