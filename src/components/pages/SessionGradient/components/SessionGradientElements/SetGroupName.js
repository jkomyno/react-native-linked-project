import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Dimensions
} from 'react-native';
import Slider from 'react-native-slider';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Input } from 'skydreamer/components/common';
import ButtonNext from './ButtonNext';
import { Container } from './';
import {
  Row
} from 'skydreamer/components/common';

import { SessionGradientStyle as styles } from 'skydreamer/styles';

export default class SetGroupName extends Component {

    render() {
        const {
      linearGradient,
      textTitle,
      slider,
      textValue
    } = styles;
        const {
      index,
      scrollViewRef,
      setGroupName,
      groupName
    } = this.props;

    /**
     * @TODO: fix KeyboardAvoidingView's style
     */

        return (
      <Container index={index} >
        <KeyboardAwareScrollView
          containerStyle={{ justifyContent: `center` }}
          extraHeight={180}
        >
          <Text style={styles.pageNumber}>
            4/5
          </Text>
          <Text style={styles.upperTitle}>
            Enter the name of{`\n`}the group
          </Text>
          <Input
            value={groupName}
            onChangeText={(value) => { setGroupName(value); }}
          />
        </KeyboardAwareScrollView>
      </Container>
        );
    }
}
