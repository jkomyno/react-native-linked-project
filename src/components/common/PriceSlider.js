import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  colors,
  dims
} from 'skydreamer/config';
import Slider from 'react-native-slider';
import { offlineActions } from 'skydreamer/redux/actions';
import Bar from '../../images/slider.png';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveToLocalStorage } from 'skydreamer/utils';
import Scaling from 'skydreamer/utils/scaling';

const styles = Scaling.newStylesheet({
    labelContainer: {
        flexDirection: `row`,
        justifyContent: `space-between`,
        marginLeft: dims.mainContainerPadding,
        marginRight: dims.mainContainerPadding
    },
    sliderLabel: {
        color: colors.mainColor,
        fontSize: dims.subtitleFontSize,
        fontFamily: `Poppins-Regular`,
        alignSelf: `center`,
        paddingTop: 10
    },
    bar: {
        height: 10,
        width: dims.SCREEN_WIDTH * 0.75,
        marginLeft: dims.mainContainerPadding,
        marginRight: dims.mainContainerPadding
    }
});

class PriceSlider extends Component {

  /*  state = {
      value: 220,
    };
    calculateStep = () =>
      (this.state.value < 200) ? 5 : 10;

    onValueChange = (value) => {
      this.setState({
        value,
      });
      this.props.offlineActions.setSessionGradientOffline({
        price_amount: value,
      });
      saveToLocalStorage('@SessionGradient:price_amount', value);
    }
  */
    render() {
        return (
       <View>
         <Image
           source={Bar}
           style={styles.bar}
         />
         <View style={styles.labelContainer}>
           <Text style={styles.sliderLabel}>
             {this.props.start}$
          </Text>
           <Text style={styles.sliderLabel}>
             {this.props.end / 2}$
          </Text>
           <Text style={styles.sliderLabel}>
             {this.props.end}$
          </Text>
         </View>
       </View>
        );
    }
}
const mapDispatchToProps = dispatch => ({
    offlineActions: bindActionCreators(offlineActions, dispatch)
});

export default connect(null, mapDispatchToProps)(PriceSlider);
