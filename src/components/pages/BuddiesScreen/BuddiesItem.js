import React, { Component, PropTypes } from 'react';
import { Text, View, Dimensions, Animated } from 'react-native';
import CachedImage from 'react-native-cached-image';
import Scaling from 'skydreamer/utils/scaling';
import LinearGradient from 'react-native-linear-gradient';

const window = Dimensions.get(`window`);

export default class BuddiesItem extends Component {

    constructor(props) {
        super(props);
        this.animValue = new Animated.Value(0)
    }

    componentDidMount() {
        this.animate(1)
    }

    animate = (toValue) => {
        this.animateY(toValue).start(() => {
            this.animate(toValue === 1 ? 0 : 1)
        })
    }

    animateY = (toValue) => {
        return Animated.timing(
            this.animValue, {
                toValue: toValue || 1,
                duration: 25000
            }
        )
    }


    render() {
        const { item, groupInfo } = this.props;
        const { photo } = item;
        const translateY = this.animValue.interpolate({
            inputRange: [0 , 0.25, 0.5, 0.75, 1],
            outputRange: [0, this.randomSign() * 10 * 5 * Math.random() * Math.random(), this.randomSign() * 5 * Math.random(), this.randomSign() * 10 * 5 * Math.random() *Math.random(), this.randomSign() * 20 * 5 * Math.random() * Math.random()]
        })
        return (
          <Animated.View style={[styles.outerContainer, { transform:[{ translateY }] }]}>
            <LinearGradient colors={this.getGradientColor(groupInfo)} style={styles.container}>
                <CachedImage style={styles.itemImage} source={{ uri : photo }}/>
            </LinearGradient>
        </Animated.View>
        );
    }

    randomSign = () => {
        return Math.round(Math.random()) * 2 - 1
    }

    getGradientColor = (groupInfo) => {
        const { color } = groupInfo;
        return [color, color]
    }
}

BuddiesItem.propTypes = {
    item: PropTypes.shape({
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        photo: PropTypes.string,
        profile_text: PropTypes.string
    }),
    groupInfo: PropTypes.shape({
      color: PropTypes.string,
      group_id: PropTypes.number,
      group_name: PropTypes.string,
      id: PropTypes.number
    })
};

const styles = Scaling.newStylesheet({
    outerContainer: {
      width: window.width / 2,
      height: (window.height - 150) / 3,
      alignItems: `center`,
      justifyContent: `center`
    },
    container: {
        width: 88,
        height: 88,
        borderRadius: 44,
        alignItems: `center`,
        justifyContent: `center`
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 40
    }
});
