import React, { Component, PropTypes } from 'react';
import {
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

import { colors, dims } from 'skydreamer/config';
import {
  TextHeader,
  MenuHeader,
  ImageWrapper,
} from './';
import menu from './menu';
import { Container } from 'skydreamer/components/common';
import { ContextMenu } from 'skydreamer/components/common/ContextMenu';

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

export default class GeneralTravelLayoutPostModal extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    uris: PropTypes.arrayOf(PropTypes.string).isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    moneySymbol: PropTypes.string.isRequired,
    scrollEnabled: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      toggleMenu: false,
      heartIconFilled: false,
      descriptionHidden: true,
      scrollEnabled: props.scrollEnabled,
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('scrollEnabled', nextProps.scrollEnabled);
    this.setState({
      scrollEnabled: nextProps.scrollEnabled,
    });
  }

  toggleContextMenu = () => {
    this.setState({
      toggleMenu: !this.state.toggleMenu,
    });
  }

  // @TODO: at the moment you can't dismiss it if you haven't scrolled at least a little bit downwards
  onScroll = ({ nativeEvent: { contentOffset } }) => {
    if (contentOffset.y == 0) {
      this.props.setShouldModalScroll(false);
    }
  }

  render() {
    const { scrollEnabled } = this.state;
    const {
      uris,
      title,
      price,
      moneySymbol,
      type,
      description,
      ...otherProps
    } = this.props;

    console.log('scrollEnabled', scrollEnabled);

    return (
      <ScrollView
        ref={(scrollView) => { this.scrollView = scrollView; }}
        contentContainerStyle={{ backgroundColor: '#FFF', zIndex: 20, paddingBottom: 50 }}
        scrollEnabled={scrollEnabled}
        onScroll={this.onScroll}
        scrollEventThrottle={16}
      >
        <ImageWrapper uris={uris} />
        {/* Todo: render shadow at the very top */}
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

        <Description>{description}</Description>
      </ScrollView>
    );
  }
}
