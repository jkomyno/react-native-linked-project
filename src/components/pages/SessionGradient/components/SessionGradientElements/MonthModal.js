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
import { getMonthList } from 'skydreamer/utils';

const Icon = createIconSetFromIcoMoon(icoMoonConfig);

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    paddingHorizontal: 22,
    paddingVertical: 22,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  resultList: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingVertical: 10,
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

const MONTHS = getMonthList();

export default class MonthModal extends Component {

  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired,
  };

  static defaultProps = {
    defaultQueryValue: '',
  };

  handleOnOptionPress = (month) => {
    const {
      setMonthSelected,
      toggleModal,
    } = this.props;

    setMonthSelected(month);
    toggleModal();
  }

  render() {
    const {
      isVisible,
      toggleModal,
    } = this.props;

    return (
      <TouchableWithoutFeedback onPress={toggleModal}>
        <Modal
          animationType={'fade'}
          isVisible={isVisible}
          onBackButtonPress={toggleModal}
          hideOnBack={false}
        >
        {/*
        <View
          style={{
            top: 0,
            left: 0,
            position: 'absolute',
            margin: 25,
          }}
        > */}
          <View style={styles.modal}>
            <ScrollView
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.resultList} >
                {
                MONTHS.map((month, i) =>
                  <TouchableOpacity
                    key={i}
                    onPress={() => { this.handleOnOptionPress(month) }}
                  >
                    <Text style={styles.option}>{month}</Text>
                  </TouchableOpacity>
                )
              }

              </View>
            </ScrollView>
          </View>
        </Modal>
      </TouchableWithoutFeedback>
    );
  }
}
