import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from 'skydreamer/utils/icoMoonConfig.json';
import { Button } from '../TravelAttractionFeed/FlightSelector';
import { dims, colors } from 'skydreamer/config';

const Icon = createIconSetFromIcoMoon(icoMoonConfig);

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 22,
    paddingTop: 22,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    height: 45,
    borderColor: 'black',
    borderWidth: 2,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: dims.chatFontSize,
  },
  resultList: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingTop: 10,
    justifyContent: 'flex-start',
  },
  title: {
    // fontFamily: 'Poppins-SemiBold',
    color: '#121',
    fontSize: dims.headerFontSize,
  },
  option: {
    fontFamily: 'Poppins-Light',
    color: colors.secondaryText,
    paddingVertical: 2,
    fontSize: dims.headerFontSize * .8,
  },
  notFound: {
    fontFamily: 'Poppins-Light',
    color: colors.secondaryText,
    fontSize: dims.headerFontSize * .8,
  },
});

export default class AirportModal extends Component {

  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    defaultQueryValue: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired,
    toggleModal: PropTypes.func.isRequired,
  };

  static defaultProps = {
    defaultQueryValue: '',
  };

  handleOnOptionPress = (index) => {
    const {
      setAirportSelected,
      toggleModal,
    } = this.props;

    setAirportSelected(this.currentOptions[index]);
    toggleModal();
  }

  /**
   * Avoid displaying all the possibilities if somebody searches "xxkm".
   * @param {String} airport
   * @return {String} lowercase version of `airport` without the last word (xxkm)
   */
  getLowerCaseAirportWithoutKM = (airport) => {
    console.log('airport', airport);
    const tokenized = airport.split(' ');
    const v = tokenized.slice(0, tokenized.length-1);
    const airportWithoutKM = v.join(' ');
    return airportWithoutKM.toLowerCase();
  }

  getFilteredAirports = (query) =>
    this.props.airports.filter(airport => {
      const airportWithoutKM = this.getLowerCaseAirportWithoutKM(airport);
      console.log('airportWithoutKM', airportWithoutKM);
      if (airportWithoutKM.indexOf(query.toLowerCase()) != -1) return airport;
    });

  getOptions = () => {
    const { defaultQueryValue } = this.props;
    this.currentOptions = this.getFilteredAirports(defaultQueryValue);
    const options = this.currentOptions.map((airport, i) => (
      <TouchableOpacity
        key={i}
        onPress={() => { this.handleOnOptionPress(i) }}
      >
        <Text style={styles.option}>{airport}</Text>
      </TouchableOpacity>
    ));
    return options;
  }

  render() {
    const {
      isVisible,
      defaultQueryValue,
      onChangeText,
      airports,
      toggleModal,
    } = this.props;

    const options = this.getOptions()

    return (
        <Modal
          animationType={'fade'}
          isVisible={isVisible}
          onBackButtonPress={toggleModal}
          hideOnBack={false}
        >
        {/*
        <View
          style={{
            flex: 1,
            top: 0,
            left: 0,
            position: 'absolute',
            margin: 25,
          }}
        > */}
          <View style={styles.modal}>
            <ScrollView
              style={{ flex: 1 }}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.searchBar} >
                <TextInput
                  underlineColorAndroid='transparent'
                  textAlignVertical="center"
                  style={styles.searchInput}
                  defaultValue={defaultQueryValue}
                  onChangeText={onChangeText}
                />
                <Icon
                  name="search"
                  size={30}
                  color="#232"
                />
              </View>
              <View style={styles.resultList} >
                <Text style={styles.title}>Nearest Airports</Text>
                  {
                    options.length ?
                      options :
                      <Text style={styles.notFound}>
                        No airport found!
                      </Text>
                  }
              </View>
            </ScrollView>
            <View style={{ paddingVertical: 11 }}>
              <Button
                title="Close"
                onPress={toggleModal}
                colors={colors.gradients.buttonPurple}
              />
            </View>
          </View>
        </Modal>
    );
  }
}
