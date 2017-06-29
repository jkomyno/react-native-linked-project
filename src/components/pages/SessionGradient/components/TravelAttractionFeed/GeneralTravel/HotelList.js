import React, { Component, PropTypes } from 'react';
import {
  FlatList,
  Animated,
  PanResponder,
  Easing,
  Text,
  View,
  Slider,
  Picker,
} from 'react-native';
import { Container } from 'skydreamer/components/common';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import { saveToLocalStorage } from 'skydreamer/utils';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from 'skydreamer/utils/icoMoonConfig.json';
import { dims, colors } from 'skydreamer/config';
import Scaling from 'skydreamer/utils/scaling';
import { Button } from 'skydreamer/components/TravelAttractionFeed/FlightSelector';
import DatePicker from 'react-native-datepicker'
import CheckBox from 'react-native-checkbox';
import { PriceSlider } from 'skydreamer/components/common';
import radioEnabled from 'skydreamer/images/cb_enabled.png';
import radioDisabled from 'skydreamer/images/cb_disabled.png';

import {
  SeparatorComponent,
  ListFooterComponent,
  GeneralTravelLayoutPost,
  AnimatedModal,
  GeneralTravelLayoutPostModal,
  FilterButton,
} from './';

const AnimatedWrapper = styled(Animated.View)`
  flex: 1;
`;

const AnimatedBackdrop = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${dims.SCREEN_HEIGHT};
  background-color: rgba(0,0,0,0.7);
`;
const styles = Scaling.newStylesheet({
  modal: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 22,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  header: {
    color: '#000000',
    fontFamily: 'Poppins',
    fontSize: dims.titleFontSize,
    paddingRight: 20,
  },
  modalText: {
    color: colors.mainColor,
    fontFamily: 'Poppins',
    fontSize: dims.titleFontSize,
    paddingRight: 20,
  },
  sliderLabel: {
    color: colors.mainColor,
    fontFamily: 'Poppins',
    fontSize: dims.titleFontSize,
  },
  sliderValue: {
    color: colors.mainColor,
    fontFamily: 'Poppins',
    fontSize: dims.titleFontSize,
    alignSelf: 'center',
  },
  slider: {
    width: dims.SCREEN_WIDTH * 0.75,
    marginLeft: dims.mainContainerPadding,
    marginRight: dims.mainContainerPadding + 30,
    zIndex: 1,
  },
});

export default class HotelList extends Component {

  state = {
    modalVisible: false,
    value: 220,
    moneySymbol: '$',
    hotelsChecked: true,
    dateDeparture: '20/02/2017',
    dateReturn: '23/02/2017',
    persons: '2',
    rooms: '3',
    gallery: [
      {
        title: 'New West Inn',
        price: 150,
        uris: ['https://q.bstatic.com/images/hotel/max1024x768/482/48276637.jpg'],
        description: 'The New West Inn is a comfortable 3-star hotel located in Amsterdam\'s New West district. The hotel is located in a quiet residential area and the vibrant city center of Amsterdam is within half an hour.',
        wifi: true,
        rating: 4,
      },
      {
        title: 'Kamer 01',
        price: 232,
        uris: [
          'http://www.telegraph.co.uk/content/dam/Travel/hotels/europe/netherlands/amsterdam/kamer01-amsterdam-bedroom-large.jpg',
        ],
        description: 'A 16th-century canal house, restored in a way that preserves its past but steps firmly into the 21st century. Apple Mac computers stand alongside mahogany wardrobes, among luscious colours. A champagne breakfast is delivered with style, in an air of genuine home hospitality',
        wifi: true,
        rating: 5,
      },
      {
        title: 'Hotel Estherea',
        price: 129,
        uris: ['https://images.oyster.com/photos/the-suite-of-orange--v2333068-w902.jpg'],
        description: 'Hotel EstherÃ©a has an eccentric charm, created by dÃ©cor that manages to be at once zany, plush, and warmly welcoming. Though large, it offers all the engaging hospitality of an old-fashioned, family-run hotel. The rooms are deliciously over-the-top, and the breakfast ranks with the best in town.',
        wifi: false,
        rating: 3,
      },
    ],
    modal: new Animated.ValueXY({
      x: 0,
      y: 1000,
    }),
    shouldModalScroll: true,
    postIndex: 0,
  }

  componentWillMount() {
    const { modal } = this.state;
    modal.y.addListener(({ value }) => { this.animatedValueY = value; });

    this.panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: (e, gestureState) => this.allowedToMove(e, gestureState),
      onMoveShouldSetPanResponderCapture: (e, gestureState) => this.allowedToMove(e, gestureState),
      onPanResponderGrant: (e, gestureState) => {
        modal.setOffset({
          y: this.animatedValueY,
        });
        modal.setValue({
          x: 0,
          y: 0,
        });
      },
      onPanResponderMove: Animated.event([
        null,
        {
          dx: 0,
          dy: modal.y,
        },
      ]),
      onPanResponderRelease: (e, gestureState) => {
        const y = modal.y._value;
        if (y > 200) {
          this.closeModal();
        } else {
          Animated.spring(modal, {
            toValue: 0,
          }).start();
        }
      },
    });
  }
  onValueChange = (value) => {
    this.setState({
      value,
    });
/*    this.props.offlineActions.setSessionGradientOffline({
      price_amount: value,
    });
    saveToLocalStorage('@SessionGradient:price_amount', value);
*/
  }
  animateModal = (open) => {
    Animated.timing(this.state.modal, {
      toValue: open ? 0 : 1000,
      easing: Easing.inOut(Easing.sin),
    }).start();
  }

  showModal = (index) => {
    this.setState({
      postIndex: index,
    }, () => {
      this.animateModal(true);
    });
  }

  closeModal = () => {
    console.log('closeModal');
    this.animateModal(false);
    this.setShouldModalScroll(true);
  }

  // pan responds only if you scroll the modal upwards
  allowedToMove = (e, gestureState) => !(this.state.shouldModalScroll || gestureState.dy < 0);

  setShouldModalScroll = (value) => {
    console.log('setShouldModalScroll', value);
    this.setState({
      shouldModalScroll: value,
    });
  }

  componentWillUnmount() {
    this.state.modal.y.removeAllListeners();
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  render() {
    const {
      gallery,
      moneySymbol,
      modal,
      shouldModalScroll,
      postIndex,
    } = this.state;

    const {
      y,
    } = modal;

    const transformScale = y.interpolate({
      inputRange: [0, 1000],
      outputRange: [0.9, 1],
      extrapolate: 'clamp',
    });

    const opacity = y.interpolate({
      inputRange: [0, 1000],
      outputRange: [1, 0],
      extrapolate: 'clamp',
      useNativeDriver: true,
    });

    return (
      <Container>
        <Modal
          animationType={'fade'}
          isVisible={this.state.modalVisible}
          onRequestClose={() => { alert('Modal has been closed.'); }}
        >
          <View style={styles.modal}>
            <View style={{ flexDirection: 'column', paddingBottom: 40 }}>
              <Text style={styles.header}>Type</Text>
              <CheckBox
                style={{ flex: 1, padding: 10 }}
                label="Hotel"
                checked={this.state.hotelsChecked}
                checkedImage={radioEnabled}
                uncheckedImage={radioDisabled}
                checkboxStyle={styles.checkBox}
                labelStyle={styles.modalText}
                onChange={checked => this.setState({ hotelsChecked: !checked })}
              />
              <CheckBox
                style={{ flex: 1, padding: 10 }}
                label="Apartments"
                checked={!this.state.hotelsChecked}
                checkedImage={radioEnabled}
                uncheckedImage={radioDisabled}
                checkboxStyle={styles.checkBox}
                labelStyle={styles.modalText}
                onChange={checked => this.setState({ hotelsChecked: checked })}
              />
              <Text style={styles.header}>Date</Text>
              <DatePicker
                style={{ width: 200 }}
                date={this.state.dateDeparture}
                mode="date"
                placeholder="select date"
                format="DD/MM/YYYY"
                minDate="2016-05-01"
                maxDate="2018-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    top: 6,
                  },
                  dateInput: {
                    borderWidth: 0,
                    paddingLeft: 5,
                    alignItems: 'flex-start',
                  },
                  dateTouch: {
                    width: 200,
                  },
                  dateTouchBody: {
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                  },
                  dateText: {
                    fontFamily: 'Poppins',
                    fontSize: 20,
                    color: colors.mainColor,
                  },
                }}
                onDateChange={(date) => {this.setState({ dateDeparture: date }); }}
              />
              <DatePicker
                style={{ width: 200}}
                date={this.state.dateReturn}
                mode="date"
                placeholder="select date"
                format="DD/MM/YYYY"
                minDate="2016-05-01"
                maxDate="2018-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    top: 6,
                  },
                  dateInput: {
                    borderWidth: 0,
                    paddingLeft: 5,
                    alignItems: 'flex-start',
                  },
                  dateTouch: {
                    width: 200,
                  },
                  dateTouchBody: {
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                  },
                  dateText: {
                    fontFamily: 'Poppins',
                    fontSize: 20,
                    color: colors.mainColor,
                  },
                }}
                onDateChange={(date) => { this.setState({ dateReturn: date }); }}
              />
              <Text style={styles.header}>Persons</Text>
              <Picker
                style={{ color: colors.mainColor }}
                selectedValue={this.state.persons}
                onValueChange={(value) => this.setState({ persons: value})}>
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
                <Picker.Item label="6" value="6" />
              </Picker>
              {this.state.hotelsChecked ?
                <View>
                  <Text style={styles.header}>Rooms</Text>
                  <Picker
                    style={{ color: colors.mainColor }}
                    selectedValue={this.state.rooms}
                    onValueChange={(value) => this.setState({ rooms: value})}>
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" />
                  </Picker>
                </View>
                 :
                <View />
              }
              <Text style={styles.header}>Max price</Text>
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.sliderValue}>{this.state.value}</Text>
                <Slider
                  value={this.state.value}
                  step={1}
                  minimumValue={50}
                  maximumValue={400}
                  minimumTrackTintColor={colors.mainColor}
                  maximumTrackTintColor={colors.mainColor}
                  thumbTintColor={colors.mainColor}
                  style={styles.slider}
                  onValueChange={this.onValueChange}
                />
                <View style={{flexDirection: 'row', alignItems: 'stretch' }}>
                  <Text style={styles.sliderLabel}>50$                                  </Text>
                  <Text style={styles.sliderLabel}>400$</Text>
                </View>
              </View>
            </View>
            <Button title="Apply filter" onPress={() => this.setModalVisible(!this.state.modalVisible)} />
          </View>
        </Modal>
        <FilterButton
          color="#FFF"
          size={25}
          icon="filter"
          colorStart={colors.mainColor}
          colorEnd="#ff5400"
          style={{
            position: 'absolute',
            borderRadius: 40,
            width: 55,
            height: 55,
            zIndex: 10,
            bottom: 80,
            right: 20,
            backgroundColor: colors.mainColor,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => this.setModalVisible(!this.state.modalVisible)}
        />
        <AnimatedWrapper
          style={{
            transform: [{
              scale: transformScale,
            }],
          }}
        >
          <FlatList
            ItemSeparatorComponent={SeparatorComponent}
            ListFooterComponent={ListFooterComponent}
            data={gallery}
            keyExtractor={(_, i) => i}
            renderItem={({ item, index }) =>
              <GeneralTravelLayoutPost
                moneySymbol={moneySymbol}
                type="hotels"
                showModal={this.showModal}
                index={index}
                {...item}
              />
            }
          />
        </AnimatedWrapper>

        <AnimatedBackdrop
          pointerEvents="none"
          style={{ opacity }}
        />

        <AnimatedModal
          height={dims.SCREEN_HEIGHT - 20}
          position={y}
          {...this.panResponder.panHandlers}
        >
          <GeneralTravelLayoutPostModal
            onClose={this.closeModal}
            setShouldModalScroll={this.setShouldModalScroll}
            scrollEnabled={shouldModalScroll}
            moneySymbol={moneySymbol}
            type="panorama"
            {...gallery[postIndex]} // @TODO: at the moment I don't have the possibility to define the dynamic content of the Modal
          />
        </AnimatedModal>
      </Container>
    );
  }
}
