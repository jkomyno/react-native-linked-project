import React, { PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Divider } from 'skydreamer/components/common';
/*
rotate45: {
  transform: [{ rotate: '45deg' }]
}

<Icon
  name="plane"
  color="#CCC"
  size={20}
  style={styles.rotate45}
/>
 */

import Scaling from 'skydreamer/utils/scaling';

const styles = Scaling.newStylesheet({
  container: {
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
  },
  leftHalf: {
    flex: 1,
    paddingTop: 20,
  },
  rightHalf: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'flex-end',
  },
  acronym: {
    fontSize: 32,
    color: '#afa8c4',
  },
  city: {
    fontSize: 14,
    color: '#afa8c4',
  },
  rotate45: {
    transform: [{ rotate: '45deg' }],
    position: 'absolute',
  },
});

const TravelListHeader = ({ departureAcronym, departureCity, arrivalAcronym, arrivalCity }) => (
  <View style={styles.container}>

    <View style={styles.row}>
      <View style={styles.leftHalf}>
        <Text style={styles.acronym}>{departureAcronym}</Text>
        <Text style={styles.city}>{departureCity}</Text>
      </View>

      <View style={{ width: 25, alignItems: 'center', justifyContent: 'center' }}>
        <Divider style={{ backgroundColor: '#e8e9f3' }} />
        <Icon
          name="plane"
          color="#afa8c4"
          size={15}
          style={styles.rotate45}
        />
      </View>

      <View style={styles.rightHalf}>
        <Text style={styles.acronym}>{arrivalAcronym}</Text>
        <Text style={styles.city}>{arrivalCity}</Text>
      </View>
    </View>

  </View>
);

TravelListHeader.propTypes = {
  departureAcronym: PropTypes.string.isRequired,
  departureCity: PropTypes.string.isRequired,
  arrivalAcronym: PropTypes.string.isRequired,
  arrivalCity: PropTypes.string.isRequired,
};

export default TravelListHeader;
