import React, { PureComponent } from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { Actions } from 'react-native-router-flux';
import { colors } from 'skydreamer/config';
import {
  TravelListHeader,
  TravelList,
  Button,
} from './FlightSelector';

const {
  background,
} = colors.TopBarGallery;

const Container = styled.View`
  flex: 1;
  padding: 20;
  background-color: #fff;
`;

const Content = styled.View`
  background-color: #fff;
  padding-left: 20;
  padding-right: 20;
  border-radius: 10;
`;

export default class FlightSelectorLayout extends PureComponent {

  state = {
    travelTimeTable: [
      {
        companyName: 'Emirates',
        companyLogoUri: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRBLo5Axhi1kEwuwPrWNiE6cWsF7YJj8eKtZPHtRSrTI9cbWc7r',
        price: 120,
        moneySymbol: '$',
        departureDate: '25 Oct, Fri',
        departureTimeArr: ['12:50', '12.50'],
        arrivalDate: '9 Nov, Fri',
        arrivalTimeArr: ['17:50', '21:20'],
      },
      {
        companyName: 'Wizz',
        companyLogoUri: 'http://aviadoresanonimos.weebly.com/uploads/2/8/6/5/28652649/9934795_orig.jpg',
        price: 129,
        moneySymbol: '$',
        departureDate: '25 Oct, Fri',
        departureTimeArr: ['12:50', '12.50'],
        arrivalDate: '9 Nov, Fri',
        arrivalTimeArr: ['17:50', '21:20'],
      },
    ],
  }
  handleAdjustDate = () => {
    console.log('handlehandleAdjustDate@FlightSelectorLayout');
  // Actions.adjustDate();
  }
  render() {
    return (
      <Container>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 50 }}>
          <Content>
            <TravelListHeader
              departureAcronym="VIE"
              arrivalAcronym="BAR"
              departureCity="Vienna"
              arrivalCity="Barcelona"
            />
            <Button
              title="Adjust date"
              onPress={this.handleAdjustDate()}
            />
            <TravelList
              travelTimeTable={this.state.travelTimeTable}
            />
          </Content>
        </ScrollView>
      </Container>
    );
  }
}
