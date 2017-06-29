'use strict';

import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Slider from 'react-native-slider';
import { Actions } from 'react-native-router-flux';
import { BlurView } from 'react-native-blur'; // @nocoldiz use this
import ButtonNext from './ButtonNext';
import {
  Container,
  TopicModal,
  Topic,
} from './';
import {
  Row,
} from 'skydreamer/components/common';

import { SessionGradientStyle as styles } from 'skydreamer/styles';

import InspirationActive from '../../../../../images/topics/inspiration.png';
import PackageActive from '../../../../../images/topics/package.png';
import InspirationInactive from '../../../../../images/topics/inspiration-disabled.png';
import PackageInactive from '../../../../../images/topics/package-disabled.png';

export default class SetTopics extends Component {

  state = {
    modalVisible: false,
    selectedTopic: '',
    selectedDescription: '',
    topics: [
      {
        name: 'Inspiration',
        info: 'We are showing you all the best Destinations you could visit across Europe!',
        imageActive: InspirationActive,
        imageInactive: InspirationInactive,
        selected: true,
      }, {
        name: 'Package',
        info: 'We show you Package deals of Hotel+Flight and group Package deals from Groupon!',
        imageActive: PackageActive,
        imageInactive: PackageInactive,
        selected: false,
      },
    ],
  };

  onPress = (index) => {
    this.setState(({ topics }) => {
      const newTopics = [...topics];
      const newTopic = newTopics[index];
      newTopic.selected = !newTopic.selected;
      return {
        topics: newTopics,
      };
    });
  }

  onLongPress = (index) => {
    console.log('onLongPress', index);
    this.setState(({ topics }) => {
      const newTopics = [...topics];
      const newTopic = newTopics[index];
      return {
        selectedTopic: newTopic.name,
        selectedDescription: newTopic.info,
      };
    });
    this.toggleModal();
  }

  renderTopics = () =>
    this.state.topics.map(({ name, info, imageActive, imageInactive, selected }, i) =>
      <Topic
        key={`topic_${i}`}
        index={i}
        name={name}
        info={info}
        imageActive={imageActive}
        imageInactive={imageInactive}
        selected={selected}
        onPress={this.onPress}
        onLongPress={this.onLongPress}
      />
    );

  toggleModal = () => {
    this.setState((prevState) => ({
      modalVisible: !prevState.modalVisible,
    }));
  }

  render() {
    const {
      linearGradient,
      textTitle,
      slider,
      textValue,
    } = styles;
    const {
      modalVisible,
      selectedTopic,
      selectedDescription,
    } = this.state;

    console.log('this.state', this.state);

    return (
      <Container index={this.props.index} >

        <TopicModal
          toggleModal={this.toggleModal}
          isVisible={modalVisible}
          selectedTopic={selectedTopic}
          selectedDescription={selectedDescription}
        />

        <Text style={styles.pageNumber}>
          3/5
        </Text>
        <Text style={styles.upperTitle}>
          Select at least one topic of interest
        </Text>
        <Row style={{ marginTop: 35, justifyContent: 'center' }}>
          {this.renderTopics()}
        </Row>
      </Container>
    );
  }
}
