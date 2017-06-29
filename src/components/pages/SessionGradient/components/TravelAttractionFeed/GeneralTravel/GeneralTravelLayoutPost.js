import React, { Component, PropTypes } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Button,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import { Actions } from 'react-native-router-flux';

import { colors, dims } from 'skydreamer/config';
import {
  TextHeader,
  MenuHeader,
  BottomFader,
  ImageWrapper,
} from './';
import menu from './menu';
import { ContextMenu } from 'skydreamer/components/common/ContextMenu';

const deviceHeight = Dimensions.get('window').height;

const Container = styled(View)`
  flex: 1;
`;

const TopShadowGradient = styled(LinearGradient)`
  position: absolute;
  top: 0;
  width: ${dims.SCREEN_WIDTH};
  height: ${dims.SCREEN_WIDTH};
  padding-left: 15;
  padding-right: 15;
  border-radius: 5;
`;

const Description = styled.Text`
  flex: 1;
  padding-left: 30;
  padding-right: 30;
  color: #aca9b4;
  padding-bottom: 20;
  font-family: Poppins-Regular;
  font-size: ${dims.simpleLabelFontSize};
`;

const MenuWrapper = styled.View`
  position: absolute;
  top: 20;
  left: 22.5;
  right: 22.5;
`;

export default class GeneralTravelLayoutPost extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    uris: PropTypes.arrayOf(PropTypes.string).isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    moneySymbol: PropTypes.string.isRequired,
    showModal: PropTypes.func.isRequired,
  };

  animatedValueY = 0;

  state = {
    toggleMenu: false,
    descriptionHidden: true,
  }

  toggleContextMenu = () => {
    this.setState({
      toggleMenu: !this.state.toggleMenu,
    });
  }

  handlePress = () => {
    const {
      index,
      showModal,
    } = this.props;
    showModal(index);
  }

  render() {
    const {
      uris,
      title,
      price,
      moneySymbol,
      type,
      description,
      showModal,
      ...otherProps
    } = this.props;

    console.log('this.props@GeneralTravelLayoutPost', this.props);

    return (
      <Container>
        <ImageWrapper uris={uris} />
        <TopShadowGradient colors={['rgba(30,30,30,0.5)', 'rgba(0,0,0,0)']} />

        <MenuWrapper>
          <MenuHeader
            onPressMenu={this.toggleContextMenu}
          />
          {
            this.state.toggleMenu &&
              <ContextMenu
                menu={menu}
              />
          }
        </MenuWrapper>

        <TextHeader
          title={title}
          price={price}
          moneySymbol={moneySymbol}
          type={type}
          {...otherProps}
        />

        <BottomFader
          height={90}
          onPress={this.handlePress}
        >
          <Description>{description}</Description>
        </BottomFader>
      </Container>
    );
  }
}
