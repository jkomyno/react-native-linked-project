/**
 * @Class:             SetPriceSession.js
 * @Description:       Render Price Session Page
 * @Author:            Guilherme Borges Bastos     @Date: 21/02/2017
 * @Notes:
 * @Revision History:
 * @Name:              @Date:      @Description:
 * Alberto Schiabel    11/03/2017  Fixed eslint, removed bind
 * Alberto Schiabel    14/03/2017  refactored images import
 */
import React, { Component } from 'react';
import {
  Text,
  Image,
  View,
  Dimensions,
  Animated,
  PanResponder,
} from 'react-native';
import { PriceSlider } from 'skydreamer/components/common';
import LinearGradient from 'react-native-linear-gradient';
import Slider from 'react-native-slider';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ButtonNext from './ButtonNext';
import { offlineActions } from 'skydreamer/redux/actions';
import { Container } from './';
import { colors, dims } from 'skydreamer/config';
import { saveToLocalStorage } from 'skydreamer/utils';
import { SessionGradientStyle as styles } from 'skydreamer/styles';

class SetPriceSession extends Component {

  state = {
    value: 220,
  };

  pan = new Animated.ValueXY();

  componentWillMount() {
    this.panResponder = PanResponder.create({
      /**
       * tells the OS we want to allow movement of the view we’ll attach this
       * panresponder to.
       */
      onMoveShouldSetResponderCapture: () => true,
      /**
       * does the same, but for dragging
       */
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
      },

      /**
       * gets invoked when we move the element, which we can use to calculate
       * the next value for the object
       */
      onPanResponderMove: Animated.event([

      ]),

      /**
       * is invoked when we release the view
       */
      onPanResponderRelease: (e, { vx, vy }) => {

      },
    });
  }

  onNextPress = () => {
    Actions.SetDateSession();
  }

  calculateStep = () =>
    (this.state.value < 200) ? 5 : 10;

  onValueChange = (value) => {
    this.setState({
      value,
    });
    this.props.offlineActions.setSessionGradientOffline({
      price_amount: value,
    });
    saveToLocalStorage('@SessionGradient:price_amount', value);
  }

  render() {
    const { value } = this.state;

    return (
      <Container index={this.props.index}>
        <View style={styles.textContainer}>
          <Text style={styles.pageNumber}>
            1/6
          </Text>
          <Text style={styles.upperTitle}>How much do you want to spend to fly?</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.textValue}>{value}</Text>
            <Text style={{ color: 'white', fontSize: 26, marginTop: 20 }}>$</Text>
          </View>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Slider
            value={value}
            step={this.calculateStep()}
            minimumValue={50}
            maximumValue={400}
            minimumTrackTintColor="rgba(0,0,0,0)"
            maximumTrackTintColor="rgba(0,0,0,0)"
            thumbTintColor="#fff"
            style={styles.slider}
            onValueChange={newValue => this.onValueChange(newValue)}
          />
          <PriceSlider start="50" end="400" />
        </View>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  offlineActions: bindActionCreators(offlineActions, dispatch),
});

export default connect(null, mapDispatchToProps)(SetPriceSession);
