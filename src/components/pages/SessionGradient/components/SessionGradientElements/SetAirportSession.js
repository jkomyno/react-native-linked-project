import React, { Component } from 'react';
import {
  Text,
  View,
  AsyncStorage,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SessionGradientStyle as styles } from 'skydreamer/styles';
import { saveToLocalStorage } from 'skydreamer/utils';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from 'skydreamer/utils/icoMoonConfig.json';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { dims, colors } from 'skydreamer/config';
import { Button } from '../TravelAttractionFeed/FlightSelector';
import { offlineActions } from 'skydreamer/redux/actions';
import {
  Container,
  AirportModal,
} from './';

const Icon = createIconSetFromIcoMoon(icoMoonConfig);
class SetAirportSession extends Component {

  state = {
    modalVisible: false,
    query: '',
    airportSelected: 'Malpensa',
    airportCodeSelected: 'MXP',
    airports: [
      'MXP Malpensa 4km',
      'LIN Linate 6km',
      'BGY Bergamo 20km',
      'VBS Brescia 30km',
      'VRN Verona 112km',
      'TSF Treviso 189km',
      'VCE Venezia 221km',
    ],
  };

  componentWillMount() { // Changed from Didmount
    this.setState({ value: 'AMS' });
  }

  onAirportChange = ({ position }) => {
    const departure_airport_id = this.props.nearestAirportList[position].id;
    this.props.offlineActions.setSessionGradientOffline({
      departure_airport_id,
    });
    saveToLocalStorage('@SessionGradient:departure_airport_id', departure_airport_id);
  }

  toggleModal = () => {
    this.setState((prevState) => ({
      modalVisible: !prevState.modalVisible,
    }));
  }

  onChangeText = (query) => {
    this.setState({
      query,
    });
  }

  setAirportSelected = (airportSelectedString) => {
    const v = airportSelectedString.split(' ');
    const airportCodeSelected = v[0];
    const airportSelected = v[1];

    this.setState({
      airportCodeSelected,
      airportSelected,
    });
  }

  render() {
    const {
      modalVisible,
      airports,
      query,
      airportSelected,
      airportCodeSelected,
    } = this.state;
    const {
      nearestAirportList,
      index,
    } = this.props;

    /* commented this because it was causing the component to not load @nocoldiz */
    // const airports = nearestAirportList.map(item => item.label);

    return (
      <Container index={this.props.index}>
        <AirportModal
          isVisible={modalVisible}
          defaultQueryValue={query}
          onChangeText={this.onChangeText}
          airports={airports}
          toggleModal={this.toggleModal}
          setAirportSelected={this.setAirportSelected}
        />

        <Text style={styles.pageNumber}>
          2/5
        </Text>
        <Text style={styles.upperTitle}>
          Where do you want to fly from
        </Text>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={this.toggleModal}>
          <Text style={styles.textValue}>{airportCodeSelected}</Text>
          <Icon
            name="chevron-down"
            size={30}
            onPress={this.toggleModal}
            style={{  left: 20, color: 'white' }}
          />
        </TouchableOpacity>
        <Text style={styles.upperTitle}>
          {airportSelected}
        </Text>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  offlineActions: bindActionCreators(offlineActions, dispatch),
});

export default connect(null, mapDispatchToProps)(SetAirportSession);
