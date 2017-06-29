import React, { PropTypes } from 'react';
import styled from 'styled-components/native';

import { Divider } from 'skydreamer/components/common';
import {
  TravelListRowHeader,
  TravelListRowSubHeader,
} from './';

const TouchableContainer = styled.TouchableOpacity`
  flex: 1;
  padding-top: 35;
`;

const TravelListRow = ({
  companyName,
  companyLogoUri,
  price,
  moneySymbol,
  departureDate,
  departureTimeArr,
  arrivalDate,
  arrivalTimeArr,
  onPress,
}) => (
  <TouchableContainer onPress={onPress}>
    <TravelListRowHeader
      price={price}
      moneySymbol={moneySymbol}
      companyLogoUri={companyLogoUri}
    />
    <TravelListRowSubHeader
      date={departureDate}
      label="Departure"
      timeArr={departureTimeArr}
      type="departure"
    />
    <Divider
      horizontal
      // style={{}}
    />
    <TravelListRowSubHeader
      date={arrivalDate}
      label="Return"
      timeArr={arrivalTimeArr}
      type="return"
    />
  </TouchableContainer>
);

TravelListRow.propTypes = {
  companyName: PropTypes.string,
  companyLogoUri: PropTypes.string,
  price: PropTypes.number,
  moneySymbol: PropTypes.string,
  departureDate: PropTypes.string,
  departureTimeArr: PropTypes.arrayOf(PropTypes.string),
  arrivalDate: PropTypes.string,
  arrivalTimeArr: PropTypes.arrayOf(PropTypes.string),
  onPress: PropTypes.func.isRequired,
};

export default TravelListRow;
