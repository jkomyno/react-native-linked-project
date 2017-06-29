import React, { PropTypes } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const IconWrapper = styled.TouchableOpacity`
  padding-left: 7.5;
  padding-right: 7.5;
`;

const MenuHeader = ({ onPressMenu }) => (
  <Container>
    <IconWrapper onPress={onPressMenu}>
      <Icon
        name="md-more"
        color="#fff"
        size={30}
      />
    </IconWrapper>
  </Container>
);

MenuHeader.propTypes = {
  onPressMenu: PropTypes.func.isRequired,
};

export default MenuHeader;
