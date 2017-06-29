import React from 'react';
import { StatusBar, Text, View } from 'react-native';
import { GradientImage } from 'skydreamer/components/common';
import CachedImage from 'react-native-cached-image';
import Scaling from 'skydreamer/utils/scaling';

export default class CardMatchScreen extends React.Component {

    componentDidMount() {
        StatusBar.setHidden(true);
    }

    componentWillUnmount() {
        StatusBar.setHidden(false);
    }

    render() {
        const { title, image, groupUsers } = this.props.card;

        return (
            <View style={styles.container}>
                <GradientImage width={`max`} height={`max`} startColor="#e7a32b" endColor="#e61f16" source={{ uri: image }} style={styles.background} />

                <Text style={styles.titleLabel}>{title}</Text>

                <View style={styles.avatarContainer}>
                    <CachedImage style={styles.avatarCenter} source={{ uri: groupUsers[0] }} />
                    <CachedImage style={styles.avatarLeft} source={{ uri: groupUsers[1] }} />
                    <View style={styles.avatarRight}>
                        <Text style={styles.avatarLabel}>+1</Text>
                    </View>
                </View>

                <CachedImage source={{ uri: image }} style={styles.thumbnail} />

                <Text style={styles.label}>{`Destination\nMatch`}</Text>
            </View>
        );
    }

}

const styles = Scaling.newStylesheet({
    background: {
        position: `absolute`,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    container: {
        flex: 1,
        alignItems: `center`,
        justifyContent: `center`
    },
    thumbnail: {
        width: 250,
        height: 250,
        borderRadius: 125
    },
    avatarContainer: {
        width: 46 * 3,
        marginLeft: 10,
        height: 40,
        marginBottom: 20
    },
    avatarCenter: {
        position: `absolute`,
        left: 38,
        width: 46,
        height: 46,
        borderRadius: 23
    },
    avatarLeft: {
        position: `absolute`,
        left: 0,
        width: 46,
        height: 46,
        borderRadius: 23
    },
    avatarRight: {
        position: `absolute`,
        alignItems: `center`,
        justifyContent: `center`,
        left: 74,
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: `transparent`,
        borderWidth: 1,
        borderColor: `white`
    },
    avatarLabel: {
        color: `white`,
        fontWeight: `bold`,
        fontSize: 16
    },
    titleLabel: {
        color: `white`,
        fontWeight: `bold`,
        fontSize: 30,
        marginBottom: 30,
        fontFamily: `Poppins`
    },
    label: {
        color: `white`,
        fontWeight: `bold`,
        fontSize: 30,
        marginTop: 40,
        textAlign: `center`
    }
});
