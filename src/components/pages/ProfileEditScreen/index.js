import React, { PureComponent } from 'react';
import {
  Alert,
  View,
  Image,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { GradientText } from 'skydreamer/components/common';
import Scaling from 'skydreamer/utils/scaling';

const styles = Scaling.newStylesheet({
  container: {
    marginTop: 50,
    marginBottom: 60,
  },
  header: {
    color: '#000000',
    fontFamily: 'Poppins',
    fontSize: 14,
  },
  label: {
    fontFamily: 'Poppins',
    color: '#918d9c',
    fontSize: 15,
  },
  section: {
    flex: 1,
    padding: 25,
    paddingRight: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e9f3',
  },
  scrollContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'column',
  },
  imageContainer: {
    height: `99w`,
  },
  paddedContainer: {
    padding: 10,
  },
  largeImage: {
    height: `62.5w`,
    width: `62.5w`,
  },
  smallImage: {
    height: `29.5w`,
    width: `29.5w`,
  },
  defaultText: {
    color: 'rgb(146, 146, 146)',
  },
});

const ImageIconButton = ({ icon, onPress }) => (
  <TouchableOpacity
    elevation={1}
    style={{ position: 'absolute', right: -8, bottom: -8, backgroundColor: 'white', borderRadius: 22, width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }}
    onPress={onPress}
  >
    <Icon
      size={32}
      name={icon}
      color="red"
    />
  </TouchableOpacity>
);


export default class ProfileEditLayout extends PureComponent {

  state = {
    tags: '#Beach #Party #Adventure',
    description: 'I like laughing, dogs, lots of food, beer, outdoor activities and adventures.',
    name: 'Michelle',
    city: 'Amsterdam',
    descriptionHeight: 'I like laughing, dogs, lots of food, beer, outdoor activities and adventures.'.length * 0.66,
  }

  render() {
    const {
      departurePriceRatios,
      returnPriceRatios,
      departureMonth,
      returnMonth,
      weekStart,
      weekEnd,
      transferTypeOptions,
    } = this.state;

    return (
      <View
        style={styles.container}
      >
        <ScrollView style={styles.scrollContainer} elevation={1}>
          <View style={styles.imageContainer}>
            <View style={styles.paddedContainer}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Image
                  style={styles.largeImage}
                  source={{ uri: 'http://placehold.it/256' }}
                  resizeMode="cover"
                >
                  <ImageIconButton icon="ios-close" onPress={() => Alert.alert('Tapped')} />
                </Image>
                <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Image
                    style={styles.smallImage}
                    source={{ uri: 'http://placehold.it/256' }}
                    resizeMode="cover"
                  >
                    <ImageIconButton icon="ios-close" onPress={() => Alert.alert('Tapped')} />
                  </Image>
                  <Image
                    style={styles.smallImage}
                    source={{ uri: 'http://placehold.it/256' }}
                    resizeMode="cover"
                  >
                    <ImageIconButton icon="ios-close" onPress={() => Alert.alert('Tapped')} />
                  </Image>
                </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                <Image
                  style={styles.smallImage}
                  source={{ uri: 'http://placehold.it/256' }}
                  resizeMode="cover"
                >
                  <ImageIconButton icon="ios-close" onPress={() => Alert.alert('Tapped')} />
                </Image>
                <Image
                  style={styles.smallImage}
                  source={{ uri: 'http://placehold.it/256' }}
                  resizeMode="cover"
                >
                  <ImageIconButton icon="ios-close" onPress={() => Alert.alert('Tapped')} />
                </Image>
                <Image
                  style={styles.smallImage}
                  source={{ uri: 'http://placehold.it/256' }}
                  resizeMode="cover"
                >
                  <ImageIconButton icon="ios-close" onPress={() => Alert.alert('Tapped')} />
                </Image>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.header}>Location</Text>
            <TextInput
              textAlignVertical="top"
              style={styles.defaultText}
              defaultValue={this.state.city}
              disabled
              underlineColorAndroid={`transparent`}
            />


            <Text style={styles.header}>Description</Text>
            <TextInput
              style={[styles.defaultText, { height: this.state.descriptionHeight }]}
              textAlignVertical="top"
              underlineColorAndroid={`transparent`}
              defaultValue={this.state.description}
              multiline
              onChange={(event) => {
                this.setState({
                  description: event.nativeEvent.text,
                  descriptionHeight: event.nativeEvent.contentSize.height,
                });
              }}
            />

            <Text style={styles.header}>Tags</Text>
            <TextInput
              underlineColorAndroid={`transparent`}
              textAlignVertical="top"
              style={styles.defaultText}
              defaultValue={this.state.tags}
              onChangeText={text => this.setState({ description })}
            />
          </View>

          <View note="spacer" style={{ marginTop: 30 }} />
        </ScrollView>
      </View>
    );
  }
}
