import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  InfoButton,
} from 'skydreamer/components/common';

const styles = {
  container: {
    marginBottom: 60,
    padding: 5,
  },
  imageContainer: {
    height: 100,
    width: 100,
  },
  image: {
    height: 100,
    width: 100,
  },
  topicRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  name: {
    fontFamily: 'Poppins',
    fontSize: 18,
  },
};
export default class Topic extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    onLongPress: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
    textColor: PropTypes.string.isRequired,
  };

  static defaultProps = {
    textColor: 'white',
  };

  onPress = () => {
    const {
      index,
      onPress,
    } = this.props;
    onPress(index);
  }

  onLongPress = () => {
    const {
      index,
      onLongPress,
    } = this.props;
    onLongPress(index);
  }

  getImageSource = () => {
    const {
      selected,
      imageActive,
      imageInactive,
    } = this.props;

    return selected ? imageActive : imageInactive;
  }

  render() {
    const {
      name,
      info,
      textColor,
    } = this.props;

    const source = this.getImageSource();

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={this.onPress}
          onLongPress={this.onLongPress}
        >
          <Image
            style={styles.image}
            source={source}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.topicRow} onPress={this.onLongPress}>
          <InfoButton info={info} />
          <Text style={[styles.name, { color: textColor }]}>{name}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
