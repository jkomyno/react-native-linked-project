import React, { Component, PropTypes } from 'react';
import {
  FlatList,
  Animated,
  PanResponder,
  Button,
  Easing,
} from 'react-native';
import { Container } from 'skydreamer/components/common';
import styled from 'styled-components/native';
import { dims } from 'skydreamer/config';

import {
  SeparatorComponent,
  ListFooterComponent,
  GeneralTravelLayoutPost,
  AnimatedModal,
  GeneralTravelLayoutPostModal,
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

export default class EventList extends Component {

  state = {
    moneySymbol: '$',
    gallery: [
      {
        title: 'Tomorrowland',
        price: 50,
        uris: ['https://www.tomorrowland.com/src/Frontend/Themes/tomorrowland/Core/Layout/images/timeline/2014-1.jpg'],
        description: 'Connecting Tomorrowland with the rest of the world, live local and international DJâ€™s on the UNITE stage and the unique, magical Tomorrowland atmosphere: that is UNITE with Tomorrowland.',
      },
      {
        title: 'Shawn Mendes @Ziggo Dome',
        price: 25,
        uris: ['http://images.vanityfair.it/Storage/Assets/Crops/396258/53/218309/Shawn-Mendes_980x571.jpg'],
        description: 'To bring and / or bring someone before or after the Shawn Mendes concert on May 1st? Then follow the signs to P2 and then the reference to K & R. Carrying and picking up before or after the Shawn Mendes concert can be at the Kiss & Ride place. Pick up after the concert costs â‚¬ 2, -. Here a coin is required that is available for â‚¬ 2, - at the Amstelborgh and Bowling receptions (both on the K & R site) or by the traffic controller on the Kiss & Ride grounds. To prevent rows from picking up, we recommend that you purchase a ticket before picking up. It is not allowed to drop or retrieve elsewhere in the area.',
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
                type="events"
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
            {...gallery[postIndex]}
          />
        </AnimatedModal>
      </Container>
    );
  }
}
