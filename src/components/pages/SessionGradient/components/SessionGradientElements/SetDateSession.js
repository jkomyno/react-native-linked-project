import React, { Component } from 'react';
import { SessionGradientStyle as styles } from 'skydreamer/styles';
import { Text, View, Picker, TouchableOpacity } from 'react-native';
import Slider from 'react-native-slider';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker'
import { offlineActions } from 'skydreamer/redux/actions';
import { saveToLocalStorage } from 'skydreamer/utils';
import { Icon } from 'skydreamer/components/common';
import {
  colors,
  dims,
} from 'skydreamer/config';
import ButtonNext from './ButtonNext';
import SelectDay from './SelectDay';
import { Container, MonthModal } from './';
import { getCurrentMonth } from 'skydreamer/utils';

class SetDateSession extends Component {
  state = {
    isMonth: true,
    modalVisible: false,
    dateDeparture: '20/02/2017',
    dateReturn: '23/02/2017',
    monthSelected: getCurrentMonth(),
    minDate: '21/02/2017',
    maxDate: '21/02/2019',
  };
  componentWillMount() { // Changed from Didmount
    moment().month();
  }

  toggleModal = () => {
    this.setState((prevState) => ({
      modalVisible: !prevState.modalVisible,
    }));
  }

  onMonthChange = (monthSelected) => {
  //  const month = moment().month(position).unix();
    this.setState({
      monthSelected,
    });
    this.props.offlineActions.setSessionGradientOffline({
      monthSelected,
    });
    saveToLocalStorage('@SessionGradient:departure', monthSelected);
    saveToLocalStorage('@SessionGradient:type', 'month');
  }

  render() {
    return (
      <Container index={this.props.index} >
        <MonthModal
          isVisible={this.state.modalVisible}
          toggleModal={this.toggleModal}
          setMonthSelected={this.onMonthChange}
        />
        <Text style={styles.pageNumber}>
          1/5
        </Text>
        <Text style={styles.upperTitle}>
          Pick the {this.state.isMonth ? 'month' : 'dates'} of your trip
        </Text>
        { this.state.isMonth ?
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={this.toggleModal}>
            <Text style={styles.textValue}>{this.state.monthSelected}</Text>
            <Icon
              name="chevron-down"
              size={30}
              style={{ left: 20, color: 'white' }}
            />
          </TouchableOpacity>
        :
          <View>
            <DatePicker
              style={{ width: dims.SCREEN_WIDTH }}
              date={this.state.dateDeparture}
              mode="date"
              placeholder="select date"
              format="DD/MM/YYYY"
              minDate={this.state.minDate}
              maxDate={this.state.maxDate}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  width: 0,
                },
                dateInput: {
                  height: 80,
                  borderWidth: 0,
                  alignItems: 'flex-start',
                },
                dateTouch: {
                  width: dims.SCREEN_WIDTH,
                },
                dateTouchBody: {
                  flexDirection: 'row',
                  height: 80,
                  alignItems: 'flex-start',
                },
                dateText: {
                  //fontFamily: 'Poppins-SemiBold',
                  fontSize: dims.actionFontSize,
                  color: '#fff',
                },
              }}
              onDateChange={(dateDeparture) => { this.setState({ dateDeparture }); }}
            />
            <DatePicker
              style={{ width: dims.SCREEN_WIDTH }}
              date={this.state.dateReturn}
              mode="date"
              placeholder="select date"
              format="DD/MM/YYYY"
              minDate="2016-05-01"
              maxDate="2018-06-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  width: 0,
                },
                dateInput: {
                  height: 80,
                  borderWidth: 0,
                  alignItems: 'flex-start',
                },
                dateTouch: {
                  width: dims.SCREEN_WIDTH,
                },
                dateTouchBody: {
                  flexDirection: 'row',
                  height: 80,
                  alignItems: 'flex-start',
                },
                dateText: {
                  //fontFamily: 'Poppins-SemiBold',
                  fontSize: dims.actionFontSize,
                  color: '#fff',
                },
              }}
              onDateChange={(dateReturn) => { this.setState({ dateReturn }); }}
            />
          </View>
      }
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <SelectDay
            isMonth={this.state.isMonth}
            onPress={(date) => { this.setState({ isMonth: !this.state.isMonth });} }
          />
        </View>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  offlineActions: bindActionCreators(offlineActions, dispatch),
});

export default connect(null, mapDispatchToProps)(SetDateSession);
