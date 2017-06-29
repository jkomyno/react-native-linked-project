import React, { PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  FlexRowSpace,
  FlexRow,
} from './';

const LabelSection = styled.View`
  flex: 1;
`;

const Label = styled.Text`
  color: #999;
  font-size: 14;
  font-weight: 200;
`;

const DateTimeSection = styled.View`
  flex: 4;
  align-items: flex-start;
`;

const DateLabel = styled.Text`
  color: #222;
  font-size: 14;
  font-weight: 600;
`;

const ArrowIconWrapper = styled.View`
  paddingHorizontal: 5;
`;

// fine, but we have to setup our own icon pack
const IconSection = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

/*
const styles = Scaling.newStylesheet({
  iconDeparture: {
    flex: 1,
    transform: [{ rotate: '45deg' }],
    position: 'absolute',
    left: 130,
  },
  iconReturn: {
    flex: 1,
    transform: [{ rotate: '-135deg' }],
    position: 'absolute',
    left: 130,
  },
});
*/

const TravelListRowSubHeader = ({ date, label, timeArr, type }) => (
  <FlexRowSpace style={{ paddingVertical: 7.5 }}>
    <LabelSection>
      <Label>{label}</Label>
    </LabelSection>

    <FlexRow>

      <DateTimeSection>
        <DateLabel>{date}</DateLabel>
        <FlexRow>
          <Text>{timeArr[0]}</Text>
          <ArrowIconWrapper>
            <Icon
              name={type === 'departure' ? 'long-arrow-right' : 'long-arrow-left'}
              color="#a49dbc"
            />
          </ArrowIconWrapper>
          <Text>{timeArr[1]}</Text>
        </FlexRow>
      </DateTimeSection>

      <IconSection>
        <Icon
          name="plane"
          color="#a49dbc"
          size={15}
        />
      </IconSection>

    </FlexRow>
  </FlexRowSpace>
);

TravelListRowSubHeader.propTypes = {
  date: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  timeArr: PropTypes.arrayOf(PropTypes.string),
  type: PropTypes.oneOf(['departure', 'return']).isRequired,
};

export default TravelListRowSubHeader;
