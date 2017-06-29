import React from 'react';
import { View, Image } from 'react-native';
import Scaling from 'skydreamer/utils/scaling';

export default class InternalCardTabIcon extends React.Component {
    render() {
        const { selected, iconOn, iconOff } = this.props;

        return (
            <View style={styles.container}>
                <Image style={styles.icon} source={selected ? iconOn : iconOff} resizeMode="contain" />
            </View>
        );
    }
}

const styles = Scaling.newStylesheet({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: `center`,
        alignItems: `center`
    },
    icon: {
        width: 32,
        height: 32
    }
});
