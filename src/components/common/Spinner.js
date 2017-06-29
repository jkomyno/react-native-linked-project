import React, { PropTypes } from 'react';
import {
  View,
  ActivityIndicator
} from 'react-native';
import Scaling from 'skydreamer/utils/scaling';

const styles = Scaling.newStylesheet({
    spinnerStyle: {
        flex: 1,
        justifyContent: `center`,
        alignItems: `center`
    }
});

const Spinner = ({ size }) => (
  <View style={styles.spinnerStyle}>
    <ActivityIndicator size={size} />
  </View>
);

Spinner.propTypes = {
    size: PropTypes.string
};

Spinner.defaultProps = {
    size: `large`
};

export default Spinner;
