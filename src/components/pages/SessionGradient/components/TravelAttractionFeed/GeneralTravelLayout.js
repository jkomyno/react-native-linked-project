import React, { Component, PropTypes } from 'react';
import {
  Dimensions,
  FlatList,
} from 'react-native';
import styled from 'styled-components/native';
import { GeneralTravelLayoutPost } from './GeneralTravel';

const SeparatorComponent = styled.View`
  padding: 5;
`;

const ListFooterComponent = styled.View`
  padding: 5;
  padding-bottom: 55;
`;

export default class GeneralTravelLayout extends Component {

  static propTypes = {
    type: PropTypes.oneOf(['panorama', 'hotels', 'events']).isRequired,
  };

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
      hotels: [
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
            'https://www.greatsmallhotels.com/photos/62424_kamer-01_.jpg',
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
    const { type } = this.props;
    const { gallery } = this.state;
    const { moneySymbol } = gallery;

    return (
      <FlatList
        ItemSeparatorComponent={SeparatorComponent}
        ListHeaderComponent={SeparatorComponent}
        ListFooterComponent={ListFooterComponent}
        data={gallery[type]}
        keyExtractor={(_, i) => i}
        renderItem={({ item }) =>
          <GeneralTravelLayoutPost
            moneySymbol={moneySymbol}
            type={type}
            {...item}
          />
        }
      />
    );
  }
}
