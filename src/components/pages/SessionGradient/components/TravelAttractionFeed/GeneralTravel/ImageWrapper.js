import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  ScrollView,
} from 'react-native';
import ViewPager from 'react-native-viewpager';
import styled from 'styled-components/native';
import { dims } from 'skydreamer/config';

const Page = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ViewPagerWrapper = styled.View`
  flex: 1;
  zIndex: 1;
`;

export default class ImageWrapper extends Component {
  static propTypes = {
    uris: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  constructor(props) {
    super(props);

    /*
    const dataSource = new ViewPager.DataSource({
      pageHasChanged: (p1, p2) => p1 !== p2,
    });

    this.state = {
      dataSource: dataSource.cloneWithPages(props.uris),
    };
    */
  }

  renderPage = (data, pageId) => (
    <Image
      source={{
        uri: data,
        width: dims.SCREEN_WIDTH,
        height: dims.SCREEN_WIDTH,
      }}
      fadeDuration={300}
    />
  );

  onChangePage = (page) => {
    console.log('current page', page);
  };

  /*
    @TODO - jkomyno
    - enable swiping
    - fix dots' buggy effect
  */
  render() {
    /*
    const {
      dataSource,
    } = this.state;
    */
    const {
      uris,
    } = this.props;

    // this.viewpager.goToPage(1);

    return (
      uris.length > 1 &&
        /*
        <ViewPagerWrapper>
          <ViewPager
            ref={(viewpager) => { this.viewpager = viewpager; }}
            style={{ flex: 1 }}
            locked={false}
            dataSource={dataSource}
            renderPage={this.renderPage}
            onChangePage={this.onChangePage}
          />
        </ViewPagerWrapper> : */
        <Image
          source={{
            uri: uris[0],
            width: dims.SCREEN_WIDTH,
            height: dims.SCREEN_WIDTH,
          }}
        />
    );
  }
}
