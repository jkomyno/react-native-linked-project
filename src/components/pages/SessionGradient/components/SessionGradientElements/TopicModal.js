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
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  resultList: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingTop: 10,
    justifyContent: 'flex-start',
  },
  title: {
    // fontFamily: 'Poppins-SemiBold',
    color: 'black',
    fontSize: dims.headerFontSize,
  },
  description: {
    fontFamily: 'Poppins-Light',
    color: colors.secondaryText,
    paddingVertical: 10,
    fontSize: dims.headerFontSize,
  },
});

export default class TopicModal extends Component {

  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    selectedTopic: PropTypes.string.isRequired,
    selectedDescription: PropTypes.string.isRequired,
    toggleModal: PropTypes.func.isRequired,
  };

  render() {
    const {
      isVisible,
      selectedTopic,
      selectedDescription,
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
          <View style={styles.modal}>
            <View style={styles.resultList} >
              <Text style={styles.title}>{selectedTopic}</Text>
              <Text style={styles.description}>{selectedDescription}</Text>
            </View>
            <Button
              colors={colors.gradients.buttonBlue}
              title="Close"
              onPress={toggleModal}
            />
          </View>
        </Modal>
      </TouchableWithoutFeedback>
    );
  }
}
