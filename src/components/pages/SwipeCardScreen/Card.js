import React from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { GradientText } from 'skydreamer/components/common';
import Scaling from 'skydreamer/utils/scaling';
import CachedImage from 'react-native-cached-image';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';

export default class Card extends React.Component {

    render() {
        const { title, subtitle, image, flight_details, userVotes } = this.props;
        const { departDate, returnDate, price } = flight_details;

        return (
            <View elevation={1} style={styles.card}>
                <TouchableWithoutFeedback onPress={Actions.internalCardTabs}>
                    <View>
                        <CachedImage source={{ uri: image }} resizeMode="cover" style={styles.cardImage} />
                        <LinearGradient
                            colors={[`transparent`, `black`]}
                            style={styles.cardOverlay} />
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.bottomContainer}>
                    <View style={styles.flightContainer}>
                        <View style={styles.flightPricingContainer}>
                            <Text style={styles.flightPricingLabel}>Flight</Text>
                            <View style={{ flexDirection: `row` }}>
                                <GradientText text={`${price}`} size={Scaling.vertical(36)} fontWeight="bold" startColor="#dc1674" endColor="#f77832"/>
                                <Text style={styles.flightPricingSymbol}>$</Text>
                            </View>
                        </View>
                        <View style={styles.flightDateContainer}>
                            <View style={{ flexDirection: `row`, alignItems: `center` }}>
                                <Icon name="plane" color="#a49dbc" style={styles.flightIconDeparture} />
                                <Text style={styles.flightDateLabel}>{departDate}</Text>
                            </View>

                            <View note="spacer" style={{ height: Scaling.vertical(10) }} />

                            <View style={{ flexDirection: `row`, alignItems: `center` }}>
                                <Icon name="plane" color="#a49dbc" style={styles.flightIconReturn} />
                                <Text style={styles.flightDateLabel}>{returnDate}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.seperator} />

                    <View style={styles.voteContainer}>
                        { userVotes && <View style={{ alignItems: `center`}}>
                            <CachedImage source={{ uri: userVotes.friend_pic }} resizeMode="cover" style={styles.avatarLarge} />
                            <View style={{ flexDirection: `row`, alignItems: `center` }}>
                                <Icon name="thumbs-o-up" color="#ec514c" size={16} />
                                <Text style={styles.voteContainerLabel}>{`${userVotes.count} Friend${userVotes.count > 1 ? `s` : ``}`}</Text>
                            </View>
                        </View> }
                    </View>
                </View>

                <View style={styles.informationContainer}>
                    <Text style={styles.subtitleLabel}>{subtitle}</Text>
                    <Text style={styles.titleLabel}>{title}</Text>
                </View>

                <View style={styles.informationButtonContainer}>
                    <TouchableOpacity elevation={1} style={styles.informationButton} onPress={() => Actions.directions({ card: this.props }) }>
                        <Ionicon size={Scaling.vertical(30)} color="red" name="ios-information-circle-outline" />
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

const cardSize = 320; // Dimensions.get(`window`).width * 0.80;

const styles = Scaling.newStylesheet({
    card: {
        marginBottom: 30,
        borderRadius: 8,
        backgroundColor: `transparent`
    },
    cardImage: {
        width: cardSize,
        height: cardSize,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    },
    cardOverlay: {
        position: `absolute`,
        bottom: -2,
        left: 0,
        right: 0,
        height: 120,
        width: cardSize
    },
    bottomContainer: {
        backgroundColor: `white`,
        flexDirection: `row`,
        width: cardSize,
        height: 85,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8
    },
    flightContainer: {
        flex: 1,
        flexDirection: `row`
    },
    flightPricingContainer: {
        flex: 10,
        paddingLeft: 10,
        alignItems: `flex-start`,
        justifyContent: `center`
    },
    flightPricingLabel: {
        fontSize: 14,
        color: `#777`,
        marginLeft: 5,
        marginBottom: -5
    },
    flightPricingSymbol: {
        color: `#f77832`,
        fontSize: 16,
        marginTop: 3,
        fontWeight: `bold`
    },
    flightDateContainer: {
        flex: 8,
        alignItems: `center`,
        justifyContent: `center`
    },
    flightDateLabel: {
        marginLeft: 8,
        marginRight: 10,
        color: `#a49dbc`
    },
    flightIconDeparture: {
        transform: [
            { rotate: `45deg` },
            { translateX: -1 },
            { translateY: 2 }
        ]
    },
    flightIconReturn: {
        transform: [ { rotate: `-135deg` } ]
    },
    voteContainer: {
        flex: 1,
        alignItems: `center`,
        justifyContent: `center`
    },
    avatarLarge: {
        width: 44,
        height: 44,
        borderRadius: 22,
        marginBottom: 5
    },
    voteContainerLabel: {
        fontSize: 14,
        marginLeft: 6,
        color: `#a49dbc`
    },
    seperator: {
        width: 1,
        backgroundColor: `#e6e6e6`
    },
    informationButtonContainer: {
        position: `absolute`,
        alignItems: `center`,
        justifyContent: `center`,
        left: 0,
        right: 0,
        bottom: (85 - (32 / 2))
    },
    informationButton: {
        width: 34,
        height: 34,
        backgroundColor: `white`,
        alignItems: `center`,
        justifyContent: `center`,
        borderRadius: 18
    },
    informationContainer: {
        position: `absolute`,
        left: 20,
        right: 0,
        bottom: 110
    },
    titleLabel: {
        color: `white`,
        fontSize: 28
    },
    subtitleLabel: {
        color: `white`,
        fontSize: 14
    }
});
