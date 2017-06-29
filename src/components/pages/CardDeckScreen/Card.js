import React from 'react';
import { View, Text } from 'react-native';
import CachedImage from 'react-native-cached-image';
import Scaling from 'skydreamer/utils/scaling';
import LinearGradient from 'react-native-linear-gradient';

const placeholderImage = { uri: `https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Panoramica_Cattedrale_di_Palermo.jpg/675px-Panoramica_Cattedrale_di_Palermo.jpg` };

const gradients = {
    none: [`transparent`, `transparent`],
    Booked: [`rgb(230, 33, 23)`, `rgb(231, 161, 43)`],
    Liked: [`rgb(19, 211, 199)`, `rgb(24, 109, 230)`]
};

const statusGradients = {
    Booked: [`rgb(231, 136, 39)`, `rgb(231, 161, 43)`],
    Liked: [`rgb(23, 128, 225)`, `rgb(24, 109, 230)`]
};

export default class Card extends React.Component {
    render() {
        const { status } = this.props; // UI Example purposes only
        const containerStyle = status === `none` ? styles.container : styles.containerBordered;
        const gradient = gradients[status];
        const statusGradient = statusGradients[status];

        return (
            <LinearGradient colors={gradient} style={styles.gradient}>
                <View style={containerStyle}>
                    <CachedImage source={placeholderImage} style={[styles.container, { borderRadius : 8 }]} resizeMode="cover" />
                    <View style={[styles.container, { borderRadius: 8, backgroundColor: `rgba(0,0,0,0.3)` }]} />
                    <Text style={styles.subtitleLabel}>Italy</Text>
                    <Text style={styles.titleLabel}>Palermo</Text>

                    { status !== `none` && <LinearGradient style={styles.statusLabelContainer} colors={statusGradient}>
                        <Text style={styles.statusLabel}>{status}</Text>
                    </LinearGradient> }

                    { status === `none` && <View style={styles.avatarContainer}>
                        <CachedImage source={{ uri: `https://randomuser.me/api/portraits/men/10.jpg` }} style={styles.avatar} resizeMode="cover" />
                        <CachedImage source={{ uri: `https://randomuser.me/api/portraits/men/10.jpg` }} style={styles.avatar} resizeMode="cover" />
                        <CachedImage source={{ uri: `https://randomuser.me/api/portraits/men/10.jpg` }} style={styles.avatar} resizeMode="cover" />
                    </View> }
                </View>
            </LinearGradient>
        );
    }
}

const styles = Scaling.newStylesheet({
    gradient: {
        alignSelf: `center`,
        width: `95w`,
        height: 140,
        marginVertical: 8,
        borderRadius: 14
    },
    containerBordered: {
        position: `absolute`,
        justifyContent: `center`,
        left: 5,
        top: 5,
        bottom: 5,
        right: 5,
        padding: 8,
        borderRadius: 14
    },
    container: {
        position: `absolute`,
        justifyContent: `center`,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        padding: 8,
        borderRadius: 14
    },
    titleLabel: {
        marginTop: 8,
        fontSize: 20,
        color: `white`,
        fontWeight: `bold`
    },
    subtitleLabel: {
        marginTop: 20,
        fontSize: 14,
        color: `white`
    },
    statusLabelContainer: {
        position: `absolute`,
        right: 0,
        bottom: 0,
        width: 125,
        height: 30,
        alignItems: `center`,
        justifyContent: `center`,
        borderTopLeftRadius: 10
    },
    statusLabel: {
        fontWeight: `bold`,
        color: `white`
    },
    avatarContainer: {
        position: `absolute`,
        right: 0,
        bottom: 0,
        width: 125,
        height: 50,
        alignItems: `center`,
        justifyContent: `center`,
        flexDirection: `row`
    },
    avatar: {
        marginHorizontal: 3,
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: `rgba(255,255,255,0.3)`
    }
});
