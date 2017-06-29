import React, { PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Scaling from 'skydreamer/utils/scaling';

const styles = Scaling.newStylesheet({
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  title: {
    letterSpacing: 10, // iOS only for the moment
    fontSize: 14,
    textAlign: 'center',
    color: '#dd9b99',
  },
});

const NavBar = ({ title }) => (
  <View style={styles.navBar}>
    <Icon
      name="ios-arrow-back"
      color="#111"
      size={30}
      style={{
        position: 'absolute',
        top: 10,
        left: 0,
      }}
    />
    <Text style={styles.title}>{title.toUpperCase()}</Text>
  </View>
);

NavBar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default NavBar;
