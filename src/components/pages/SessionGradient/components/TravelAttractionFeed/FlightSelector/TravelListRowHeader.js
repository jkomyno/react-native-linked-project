import React, { PropTypes } from 'react';
import {
  Image,
} from 'react-native';
import styled from 'styled-components/native';
import {
  FlexRowSpace,
  FlexRow,
} from './';

const Price = styled.Text`
  font-size: 32;
  color: #222;
`;

const Symbol = styled.Text`
  margin-top: -10;
  font-size: 16;
  color: #222;
`;

const ImageContainer = styled.View`
  flex: 1;
  align-items: flex-end;
  justify-content: center;
`;

const TravelListRowHeader = ({ price, moneySymbol, companyLogoUri }) => (
  <FlexRowSpace>
    <FlexRow>
      <Price>{price}</Price>
      <Symbol>{moneySymbol}</Symbol>
    </FlexRow>
    <ImageContainer>
      <Image
        resizeMode="contain"
        // @TODO: change the style
        source={{
          uri: companyLogoUri,
          width: 100,
          height: 30,
        }}
      />
    </ImageContainer>
  </FlexRowSpace>
);

TravelListRowHeader.propTypes = {
  price: PropTypes.number.isRequired,
  moneySymbol: PropTypes.string.isRequired,
  companyLogoUri: PropTypes.string.isRequired,
};

export default TravelListRowHeader;
