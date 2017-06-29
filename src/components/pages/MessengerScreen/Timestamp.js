import React from 'react';
import { View, Text } from 'react-native';
import Scaling from 'skydreamer/utils/scaling';
import HumanDate from 'human-date';

export default class Timstamp extends React.Component {
    render() {
        const { message } = this.props;
        const { timestamp } = message;
        return (
            <View style={styles.container}>
                <Text style={styles.timestamp}>{HumanDate.prettyPrint(timestamp)}</Text>
            </View>
        );
    }
}

const styles = Scaling.newStylesheet({
    container: {
        flex: 1,
        alignItems: `center`,
        justifyContent: `center`
    },
    timestamp: {
        fontSize: 13
    }
});
