import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  Animated,
  Keyboard,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Scaling from 'skydreamer/utils/scaling';

import { offlineActions } from 'skydreamer/redux/actions';
import { Spinner } from 'skydreamer/components/common';
import { mapImage as MapImage } from 'skydreamer/images';
import {
  SetAirportSession,
  SetGroupName,
  SetTopics,
  SetDateSession,
  SetFriends,
} from './components/SessionGradientElements';

import { saveToLocalStorage } from 'skydreamer/utils';
import { colors, dims } from 'skydreamer/config';
import ButtonNext from './components/SessionGradientElements/ButtonNext';

// import SetDateSession from './setDateSession';

const styles = Scaling.newStylesheet({
  container: {
    flex: 1,
    backgroundColor: '#838383',
  },
  gradient: {
    flex: 1,
    width: null,
    height: null,
  },
  image: {
    height: 300,
  },
  map: {
    position: 'absolute',
    top: 0,
  },
  linearGradient: {
    flex: 1,
    width: null,
    height: null,
  },
});

class SessionGradient extends Component {

  /*
  The state can be directly assigned only inside the class, and
  should never be modified directly. You should use this.setState()
  inside the methods of the class to shallow mutate its content.
  However, in this case I think this.state.scroll is not particularly useful.

  state = {
    scroll: 1,
  };
  */

  state = {
    scroll: true,
    group_name: '',
  };

  xOffset = new Animated.Value(0);

  onScrollAnimated = Animated.event(
    [{
      nativeEvent: {
        contentOffset: {
          x: this.xOffset,
        },
      },
    }],
  );

  onScroll = (event) => {
    // console.log('nativeEvent', event.nativeEvent);
    this.onScrollAnimated(event);
    // console.log('xOffset', this.xOffset._value);
    Keyboard.dismiss();
  }

  /**
   * This is the method that moves the map in a parallaxed way
   */
  moveMapImage = () => ({
    transform: [{
      translateX: this.xOffset.interpolate({
        inputRange: [
          0,
          dims.SCREEN_WIDTH * 1,
          dims.SCREEN_WIDTH * 2,
        ],
        outputRange: [150, 50, -50],
      }),
    }],
  });

  isGroupNameValid = () => {
    const { group_name } = this.state;
    if (!group_name) return false;
    if (group_name.length < 3) return false;
    if (group_name.length > 16) return false;
    return true;
  }

  toggleScrollEnabled = (scroll) => {
    this.setState({
      scroll,
    });
  }

  toggleScrollNext = () => {
    this.setState((oldState, props) => ({
      currentPage: oldState.currentPage + 1,
    }));

    /**
     * A couple of things to notice.
     * I'm accessing the xOffset value using a private API, which has lasted
     * until now but could not appear in the next version.
     * Second point: 360 is the maximum value of xOffset. I still have to test
     * if this 360 value may be subject to change if I use a different device.
     * For the moment this is fine though.
     */

    const currPage = Math.floor(this.xOffset._value / 360) + 1;
    if (currPage == 1) {

    }

    if (currPage == 5) {
      Actions.rootTabController();
    }

    if (currPage == 4) {
      if (this.isGroupNameValid()) {
        this.viewPager.scrollTo({ x: currPage * dims.SCREEN_WIDTH, y: 0, animated: true });
      } else {
        Alert.alert(
          'Error',
          'You group name needs to be 3-16 characters long',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false }
        )
      }
    } else {
      this.viewPager.scrollTo({ x: currPage * dims.SCREEN_WIDTH, y: 0, animated: true });
    }
  }

  toggleScrollBack = () => {
    this.setState((oldState, props) => ({
      currentPage: oldState.currentPage + 1,
    }));

    /**
     * A couple of things to notice.
     * I'm accessing the xOffset value using a private API, which has lasted
     * until now but could not appear in the next version.
     * Second point: 360 is the maximum value of xOffset. I still have to test
     * if this 360 value may be subject to change if I use a different device.
     * For the moment this is fine though.
     */

    const currPage = Math.floor(this.xOffset._value / 360) - 1;
    if (currPage == 6) {
      try {
      //  await AsyncStorage.setItem('@SessionGradient:groupName', this.state.groupName);
      } catch (err) {
        console.warn('@SessionGradient:groupName not saved');
      }
      Actions.main(); // TODO: change Router.js#L49
    } else {
      this.viewPager.scrollTo({ x: currPage * dims.SCREEN_WIDTH, y: 0, animated: true });
    }
  }

  setGroupName = (group_name) => {
    this.setState({
      group_name,
    });
    this.props.offlineActions.setSessionGradientOffline({
      group_name,
    });
    saveToLocalStorage('@SessionGradient:group_name', group_name);
  }

  setDateRange = (departureDate, returnDate) => {
    this.setState({
      group_name,
    });
    this.props.offlineActions.setSessionGradientOffline({
      group_name,
    });
    //saveToLocalStorage('@SessionGradient:group_name', group_name);
  }

  render() {
    const { group_name } = this.state;
    const { isNearestAirportLoading, nearestAirportList } = this.props;
    if (isNearestAirportLoading) return <Spinner />;

    return (
      <View style={styles.container}>
        <Animated.Image source={MapImage} style={[styles.map, this.moveMapImage()]} />
        <ScrollView
          ref={(scrollView) => { this.viewPager = scrollView; }}
          horizontal
          pagingEnabled
          returnKeyType="next"
          scrollEnabled={this.state.scroll}
          scrollEventThrottle={75}
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          keyboardDismissMode="interactive"
          onScroll={this.onScroll}
        >
          <SetDateSession
            index={0}
            setDateRange={this.setDateRange}
            toggleScroll={this.toggleScrollEnabled}
          />
          <SetAirportSession
            index={1}
          />
          <SetTopics
            index={2}
          />
          <SetGroupName
            index={3}
            setGroupName={this.setGroupName}
            groupName={group_name}
          />
          <SetFriends
            index={4}
          />
        </ScrollView>

        <ButtonNext onPress={this.toggleScrollNext} />
      </View>
    );
  }
}

const mapStateToProps = ({ sessionGradient: {
  nearestAirportList,
  isNearestAirportLoading,
} }) => ({
  isNearestAirportLoading,
  nearestAirportList,
});

const mapDispatchToProps = dispatch => ({
  offlineActions: bindActionCreators(offlineActions, dispatch),
});

export default connect(null, mapDispatchToProps)(SessionGradient);
