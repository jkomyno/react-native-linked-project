import React, { PropTypes } from 'react';
import { Text, View, Dimensions, Animated, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Scaling from 'skydreamer/utils/scaling';
import BuddiesItem from './BuddiesItem';
import { map as _map, forEach as _forEach, get as _get, isEmpty as _isEmpty } from 'lodash';
import { userActions } from 'skydreamer/redux/actions';

const window = Dimensions.get('window');

class BuddiesScreen extends React.Component {

  static displayName = "Buddies Screen";

  constructor(props) {
    super(props);
    this.animValue = new Animated.Value(0);
  }

  componentDidMount() {
    const { fetchBuddies, travel_id } = this.props;
    fetchBuddies(travel_id);
    const { groupItems } = this.props;
  }

  calculateAnimationDuration = (groupItems) => {
    let length = 0;
    _forEach(groupItems, group => {
      length = length + parseInt((group.users && group.users.length) || 0);
    })
    const animDuration = (length * 5000) / 6;
    console.log({animDuration});
    return  animDuration; // lets assume at a time we show 6 items and it takes 5 second to go from end to end.
  }

  animateFromLeftToRight = (animationDuration) => {
    Animated.timing(
      this.animValue,
      {
        toValue: 1,
        duration: animationDuration || 20000
      }
    ).start();
  }

  render() {
    const { groupItems } = this.props;
    if(_isEmpty(groupItems)) {
      return <View style={styles.container}></View>;
    }
    const animationDuration = this.calculateAnimationDuration(groupItems);
    this.animateFromLeftToRight(animationDuration)
    const items = _map(groupItems, group => {
      return _map(group.users, item => {
        const groupInfo = group;
        return this.renderItem(item, groupInfo);
      })
    })
    const deviceWidth = window.width;
    const translateX = this.animValue.interpolate({
      inputRange: [0, 0.00001 ,1],
      outputRange: [ -deviceWidth * 3, -deviceWidth * 2.9999,  0 ]
    })
    return (
      <ScrollView style={styles.container}>
        <Animated.View style={[{ transform: [{ translateX }] }, styles.animatedViewContainer]}>
          {items}
      </Animated.View>
      </ScrollView>
    );
  }

  renderItem = (item, groupInfo) => {
    return <BuddiesItem item={item} groupInfo={groupInfo}/>
  }

}

const styles = Scaling.newStylesheet({
    container: {
        flex:1,
        marginTop: 50,
        position: 'absolute',
        backgroundColor: `rgb(229,245,223)`,
        width: 3 * window.width,
        height: window.height
    },
    animatedViewContainer: {
      height: window.height,
      flexDirection: 'column',
      flexWrap: 'wrap'
    }
});

BuddiesScreen.propTypes = {
  groupItems: PropTypes.object
}

const mapStateToProps = (state) => {
  console.log({state});
  const currentSessionId = _get(state, `sessions.selected`)
  return ({
    travel_id: _get(state, `sessions.collection.${currentSessionId}.id`),
    groupItems: _get(state, 'user.buddiesData')
  })
}

const mapDispatchToProps = (dispatch) => ({
  fetchBuddies: () => dispatch(userActions.fetchBuddies())
})

export default connect(mapStateToProps, mapDispatchToProps)(BuddiesScreen);
