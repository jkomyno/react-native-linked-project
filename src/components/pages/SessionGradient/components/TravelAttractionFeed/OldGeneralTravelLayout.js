import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  Animated,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {
  TextHeader,
  MenuHeader,
} from './GeneralTravel';
import { colors, dims } from 'skydreamer/config';

import { ContextMenu } from 'skydreamer/components/common/ContextMenu';

const window = Dimensions.get('window');
const PARALLAX_HEADER_HEIGHT = 350;

import Scaling from 'skydreamer/utils/scaling';

const styles = Scaling.newStylesheet({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: PARALLAX_HEADER_HEIGHT,
  },
  fixedSectionContainer: {
    position: 'absolute',
    top: 20,
    left: 22.5,
    right: 22.5,
  },
  fixedSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  parallaxHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 100,
  },
  description: {
    flex: 1,
    paddingHorizontal: 30,
    color: '#aca9b4',
    paddingBottom: 20,
    fontFamily: 'Poppins-Regular',
    fontSize: dims.simpleLabelFontSize,
  },
  topShadowGradientGradient: {
    position: 'absolute',
    top: 0,
    width: window.width,
    height: window.width,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
});

const menu = [
  {
    title: 'Send to chat',
    onPress: () => {},
  },
  {
    title: 'Share',
    onPress: () => {},
  },
];

export default class GeneralTravelLayout extends Component {

  static propTypes = {
    type: PropTypes.oneOf(['panorama', 'hotels', 'events']),
  };

  yOffset = new Animated.Value(0);

  state = {
    gallery: {
      moneySymbol: '$',
      panorama: [
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
      hotel: [
        {
          title: 'New West Inn',
          price: 150,
          uris: ['https://q.bstatic.com/images/hotel/max1024x768/482/48276637.jpg'],
          description: 'The New West Inn is a comfortable 3-star hotel located in Amsterdam\'s New West district. The hotel is located in a quiet residential area and the vibrant city center of Amsterdam is within half an hour.',
        },
        {
          title: 'Kamer 01',
          price: 232,
          uris: [
            'http://www.telegraph.co.uk/content/dam/Travel/hotels/europe/netherlands/amsterdam/kamer01-amsterdam-bedroom-large.jpg',
            'https://www.greatsmallhotels.com/photos/62424_kamer-01_.jpg',
          ],
          description: 'A 16th-century canal house, restored in a way that preserves its past but steps firmly into the 21st century. Apple Mac computers stand alongside mahogany wardrobes, among luscious colours. A champagne breakfast is delivered with style, in an air of genuine home hospitality',
        },
        {
          title: 'Hotel Estherea',
          price: 129,
          uris: ['https://images.oyster.com/photos/the-suite-of-orange--v2333068-w902.jpg'],
          description: 'Hotel EstherÃ©a has an eccentric charm, created by dÃ©cor that manages to be at once zany, plush, and warmly welcoming. Though large, it offers all the engaging hospitality of an old-fashioned, family-run hotel. The rooms are deliciously over-the-top, and the breakfast ranks with the best in town.',
        },
      ],
      events: [
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
    },

    party: {
      title: 'Party',
      price: 30,
      moneySymbol: '$',
      uri: 'http://i.imgur.com/WccSMgN.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    },
    toggleMenu: false,
    heartIconFilled: false,
  }

  toggleContextMenu = () => {
    this.setState({
      toggleMenu: !this.state.toggleMenu,
    });
  }

  toggleLikeParty = () => {
    this.setState({
      heartIconFilled: !this.state.heartIconFilled,
    });
  }

  render() {
    const {
      type,
      ...otherProps
    } = this.props;
    console.log('PartyLayout otherProps', this.props, otherProps);
    const {
      title,
      price,
      moneySymbol,
      uri,
      description,
    } = this.state.party;

    return (
      <Animated.View
        style={{
          flex: 1,
          transform: [{
            scale: this.yOffset.interpolate({
              inputRange: [
                0,
                100,
                200,
              ],
              outputRange: [1, 0.5, 1],
            }),
          }],
        }}
      >
        <Animated.ScrollView
          scrollEventThrottle={16}
          /*
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.yOffset } } }]
          )}*/
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flex: 0 }}
        >
          <Image
            source={{
              uri,
              width: window.width,
              height: window.width }}
          />
          {/* Todo: render shadow at the very top */}
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
            style={styles.topShadowGradientGradient}
          />

          <TextHeader
            title={title}
            price={price}
            moneySymbol={moneySymbol}
            type={type}
            {...otherProps}
          />
          <Text style={styles.description}>{description}</Text>

        </Animated.ScrollView>
        <View
          style={{
            position: 'absolute',
            top: 20,
            left: 22.5,
            right: 22.5,
          }}
        >
          <MenuHeader
            onPressMenu={this.toggleContextMenu}
            onPressHeart={this.toggleLikeParty}
            heartIconFilled={this.state.heartIconFilled}
          />
          {
            this.state.toggleMenu &&
              <ContextMenu
                menu={menu}
              />
          }
        </View>
      </Animated.View>
    );
  }
}
