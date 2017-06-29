import React, { PropTypes } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';

import { Row } from 'skydreamer/components/common';
import { colors, dims } from 'skydreamer/config';
import Scaling from 'skydreamer/utils/scaling';
import icon from './icon.png';

const Container = styled.View`
  padding-top: 25;
  padding-bottom: 15;
`;

const styles = Scaling.newStylesheet({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  leftContainer: {
    flex: 1,
    paddingLeft: 30,
  },
  rightContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 30,
  },
  title: {
    fontSize: dims.titleFontSize,
    color: colors.darkTitle,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
  },
  price: {
    fontSize: dims.titleFontSize,
    fontFamily: 'Poppins-Regular',
    color: '#df1438',
  },
  moneySymbol: {
    fontSize: dims.importantLabelFontSize,
    fontFamily: 'Poppins-Regular',
    color: '#f67636',
  },
});

const TextHeader = ({ title, price, moneySymbol, type, wifi, rating }) => (
  <Container>
    <Row>
      <View style={styles.leftContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      {
        type === 'events' &&
          <Row style={styles.rightContainer}>
            <Image
              source={icon}
              style={{ height: dims.importantLabelFontSize }}
              resizeMode="contain"
            />
            <Text style={styles.price}>{price}</Text>
            <Text style={styles.moneySymbol}>{moneySymbol}</Text>
          </Row>
      }
    </Row>
    {
        type === 'hotels' &&
          <Row style={{ paddingLeft: 30 }}>
            <StarRating
              disabled
              maxStars={5}
              rating={rating}
              starColor="grey"
              starSize={20}
            />
            {
              wifi &&
                <Icon
                  name="ios-wifi"
                  size={20}
                  color="grey"
                  style={{ paddingLeft: 15 }}
                />
            }
          </Row>
      }
  </Container>
);

TextHeader.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  moneySymbol: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  wifi: PropTypes.bool,
  rating: PropTypes.number,
};

TextHeader.defaultProps = {
  wifi: false,
  rating: 5,
};

export default TextHeader;
