/**
 * @Class:             InfoButton.js
 * @Description:       Render next button on Session Pages
 * @Author:            Paolo Pirruccio      @Date: 05/04/2017
 * @Notes:
 * @Revision History:
 * @Name:              @Date:      @Description:
 */
import React, { PropTypes } from 'react';
import {
 StyleSheet,
 View,
 TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Scaling from 'skydreamer/utils/scaling';

const styles = Scaling.newStylesheet({
    buttonStyle: {
        marginTop: 5,
        marginRight: 5,
        flexDirection: `row`,
        backgroundColor: `transparent`
    }
});

const InfoButton = ({ info }) => {
    const { buttonStyle } = styles;

    return (
    <View style={buttonStyle}>
      <Icon name="info" size={10} color="#fff" />
    </View>
    );
};


export default InfoButton;
