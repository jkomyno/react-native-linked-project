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

import {
  SeparatorComponent,
  ListFooterComponent,
  GeneralTravelLayoutPost,
  AnimatedModal,
  GeneralTravelLayoutPostModal,
} from './';

export default class PanoramaList extends Component {

  state = {
    moneySymbol: '$',
    gallery: [
      {
        title: 'Addadura Beach',
        price: 15,
        uris: ['https://r.bstatic.com/images/hotel/max1024x768/793/79344997.jpg'],
        description: 'The Addaura beach, which takes its name from the dialect of "bay", is located along the northern side of Mount Pellegrino, besides Punta Priola. A lovely beach which looks toward the beginning of the Mondello Gulf. Beautiful beach resorts which has a lot of huge villas.',
      }, {
        title: 'Vondelpark',
        price: 0,
        uris: ['http://www.amsterdam-travel-guide.net/images/attractions/vondelpark-amsterdam-cyclists.jpg'],
        description: 'Vondelpark can be quietly defined as the green heart of Amsterdam! Designed in 1864 by the architect L.D. Zocher on behalf of an association founded by wealthy citizens with the aim of creating a green area that was fun for the many workers in that area (at times it was on the outskirts of Amsterdam, while it is now in Full center right near Leidseplein) and as a park where you can walk on horseback, the "New Park" (later renamed Vondelpark in the following year, when the statue depicting the eminent poet and writer Joost van den Vondel) popular.',
      }, {
        title: 'Dam Square',
        price: 36,
        uris: ['https://www.viviamsterdam.it/images/viviamsterdam/Attrazioni/obelisco-piazza-dam.JPG'],
        description: 'The streets around Dam Square are packed with quaint shops where you can do some healthy "wild shopping" and buy something extremely Dutch. There is also De Bijenkorf, Amsterdam\'s most luxurious shopping center, housed in a Gothic palace. Instead, for the "coffee break", we find Abraxas, with hand-drawn interiors, and the Green House Centrum, the Cannabis Cup winner.',
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
                type="panorama"
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
