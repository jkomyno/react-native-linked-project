import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
  Animated,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  Image,
  Share,
} from 'react-native';
import styled from 'styled-components/native';
import Slider from 'react-native-slider';
import { saveToLocalStorage } from 'skydreamer/utils';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';

import { facebookApiActions } from 'skydreamer/redux/actions';
import {
  Row,
} from 'skydreamer/components/common';
import { offlineActions } from 'skydreamer/redux/actions';
import ButtonNext from './ButtonNext';
import { Container } from './';
import WhatsappIcon from '../../../../../images/whatsapp.png';
import FacebookIcon from '../../../../../images/facebook.png';
import OthersIcon from '../../../../../images/others.png';

import { SessionGradientStyle as styles } from 'skydreamer/styles';

const SkipButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  right: 5;
`;

class SetFriends extends Component {

  static propTypes = {
    fbActions: PropTypes.shape({
      sendFacebookAppInvite: PropTypes.func.isRequired,
      shareFacebookLinkWithCommentDefinedByTheUser: PropTypes.func.isRequired,
      shareFacebookLinkWithPrefinedComment: PropTypes.func.isRequired,
    }).isRequired,
  };

  onSelectionChange = ({ position, data }) => {
    const is_group_travel = this.state.selection[position];
    this.props.offlineActions.setSessionGradientOffline({
      departure_airport_id: is_group_travel,
    });
    saveToLocalStorage('@SessionGradient:is_group_travel', is_group_travel);
  }

  shareFacebookInvite = () => {
    this.props.fbActions.sendFacebookAppInvite();
  }

  shareIntent = () => {
    const url = 'https://skydreamer.io';
    Share.share({
      title: 'Skydreamer',
      message: `Join my group on the new Skydreamer app! ${url}`,
    })
    .then((this.showResultCallback))
    .catch((error) => {
      console.error('error@shareIntent', error);
    });
  }

  showResultCallback = (result) => {
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        console.log(`shared with an activityType: ${result.activityType}`);
      } else {
        console.log('shared');
      }
    } else if (result.action === Share.dismissedAction) {
      console.log('dismissed');
    }
  }

  openTabBar = () => {
    Actions.rootTabController();
  }

  render() {
    return (
      <Container index={this.props.index} >
        <Text style={styles.pageNumber}>
          5/5
        </Text>
        <Text style={styles.upperTitle}>
          Invite your friends to organize your trip
        </Text>
        <View style={styles.invitationContainer}>
          <TouchableOpacity onPress={this.shareFacebookInvite}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={FacebookIcon} style={styles.socialIcon} />
              <Text style={styles.upperTitle}>
                        Facebook
                    </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{ flexDirection: 'row' }}>
              <Image source={WhatsappIcon} style={styles.socialIcon} />
              <Text style={styles.upperTitle}>
                        Whatsapp
                    </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.shareIntent}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={OthersIcon} style={styles.socialIcon} />
              <Text style={styles.upperTitle}>
                        Others
                    </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Container>
    );


/*
    return (

      <Container index={this.props.index} >
        <View style={{flex:1}}>
        <Text style={styles.pageNumber}>
          5/6
        </Text>
        <Text style={styles.upperTitle}>
          Are you travelling
        </Text>
        <Text style={styles.textTitle}>
          With friends?
        </Text>
          <Animated.Text style={styles.active}>
            Yes
          </Animated.Text>

          <Animated.Text style={styles.inactive}>
            No
          </Animated.Text>
        </View>
      </Container>
    );
*/
  }
}

const mapDispatchToProps = dispatch => ({
  offlineActions: bindActionCreators(offlineActions, dispatch),
  fbActions: bindActionCreators(facebookApiActions, dispatch),
});

export default connect(null, mapDispatchToProps)(SetFriends);
