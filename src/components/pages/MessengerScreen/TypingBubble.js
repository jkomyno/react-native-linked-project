import React from 'react';
import { View } from 'react-native';
import Scaling from 'skydreamer/utils/scaling';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class TypingBubble extends React.Component {

    render() {
        return (
            <View style={{ flexDirection: `row` }}>
                <View style={{ flex: 0.1 }} />
                <View style={styles.container}>
                    <View style={styles.leftContentContainer}>
                        <FontAwesome name="ellipsis-h" size={Scaling.vertical(20)} color="white" style={styles.leftContentStyle}/>
                    </View>
                </View>
            </View>
        );
    }

}


const styles = Scaling.newStylesheet({
    container: {
        flex: 0.9,
        flexDirection: `row`,
        justifyContent: `flex-end`,
        flexWrap: `wrap`
    },
    leftContentContainer: {
        flexDirection: `row`,
        justifyContent: `flex-start`,
        alignItems: `center`,
        flex: 0.8,
        marginVertical: 8
    },
    leftContentStyle: {
        backgroundColor: `#f4c1bb`,
        paddingVertical: 8,
        paddingHorizontal: 20,
        flexWrap: `wrap`,
        color: `white`,
        borderRadius: 50
    }
});
