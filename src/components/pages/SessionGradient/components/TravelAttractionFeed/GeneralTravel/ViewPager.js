import React, { Component, PropTypes } from 'react';
import {
  ScrollView,
  Image,
} from 'react-native';
import { dims } from 'skydreamer/config';

export default class ViewPager extends Component {
  static propTypes = {
    uris: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      views: new Array(props.uris.length).fill(0).map(Number.call, Number),
    };
  }

  page = 1;
  previousPage = 0;

  shiftArrayToRight(arr, places) {
    for (let i = 0; i < places; i++) {
      arr.unshift(arr.pop());
    }
  }

  renderPages = () => (
    this.props.uris.map((uri, i) => (
      <Image
        key={i}
        source={{
          uri,
          width: dims.SCREEN_WIDTH,
          height: dims.SCREEN_WIDTH,
        }}
      />
      ))
  )

  render() {
    const {
      views,
    } = this.state;

    console.log('views', views);

    return (
      <ScrollView
        style={{ flex: 1 }}
        ref={ref => this.ref = ref}
        horizontal
        pagingEnabled
        contentOffset={{ x: dims.SCREEN_WIDTH, y: 0 }}
        showsHorizontalScrollIndicator
        onMomentumScrollEnd={(event) => {
          const page = Math.floor(event.nativeEvent.contentOffset.x / dims.SCREEN_WIDTH);
          const { contentOffset } = event.nativeEvent;
          if (page === 0 || page == 2) {
            page === 0 ? this.shiftArrayToRight(views, 1) : this.shiftArrayToRight(views, 2);

            this.setState({
              views,
            });
            setImmediate(() => {
              this.ref.scrollTo({
                x: dims.SCREEN_WIDTH,
                y: 0,
                animated: false,
              });
            });
          }
        }}
      >
        {this.renderPages()}
      </ScrollView>
    );
  }
}
