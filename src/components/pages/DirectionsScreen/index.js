import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Scaling from 'skydreamer/utils/scaling';
import MapView from 'react-native-maps';
import {
    TouchableOpacity,
    Dimensions,
    ScrollView,
    View,
    Text
} from 'react-native';

const darkPinkColor = `rgb(220, 155, 153)`;

export default class DirectionsScreen extends React.Component {
    render() {
        const { card } = this.props;
        const latitude = Number(card.lat);
        const longitude = Number(card.long);

        return (
            <View style={styles.container}>
                <View elevation={1} style={styles.headerContainer}>
                    <View note="spacer" style={{ marginTop: Scaling.vertical(60) }} />
                    <TravelInfo label="From" value="Falcone-Borsellino airport" />
                    <TravelInfo label="To" value={card.title} />
                    <View style={{ flexDirection: `row`, alignItems: `center`, justifyContent: `center`, height: Scaling.vertical(64) }}>
                        <Icon name="bus" size={Scaling.vertical(22)} color={darkPinkColor} />
                        <Text style={{ marginLeft: Scaling.vertical(8), color: darkPinkColor}}>20 MIN</Text>
                        <View note="spacer" style={{ height: 1, width: Scaling.vertical(25) }} />
                        <Icon name="train" size={Scaling.vertical(22)}  color={darkPinkColor}/>
                        <Text style={{ marginLeft: Scaling.vertical(8), color: darkPinkColor}}>40 MIN</Text>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                <MapView
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude,
                        longitude,
                        latitudeDelta: 0.06,
                        longitudeDelta: 0.06
                    }} />
                    <ScrollView style={{position: `absolute`, top: 0, left: 0, right: 0, bottom: 0 }}>
                        <View note="spacer" style={styles.infoContainerSpacer} />
                        <View elevation={1} style={styles.infoContainer}>
                            <Text style={styles.headerLabel}>{card.title}</Text>
                            <Text style={styles.description} multiline={true}>To the first-time visitor, Palermo is a city of over-changing character. An abundance of dusty museums, Arabian domes and flourishes of baroque splendor jostyle with Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris at lacus ut arcu imperdiet efficitur. Fusce in nulla at ante dignissim ullamcorper vel ut ligula. Nunc ac neque sed enim ornare vestibulum ut at est. Sed elementum ante sit amet ante cursus, sit amet sagittis augue accumsan. Proin eget blandit libero, nec malesuada ante. Ut vitae sagittis nisl. Suspendisse orci nisl, fringilla nec enim id, semper convallis augue. Vivamus in congue mauris.</Text>
                        </View>
                        <View note="spacer" style={styles.infoContainerSpacer} />
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const TravelInfo = ({label, value}) => (
    <View style={styles.travelInfoContainer}>
        <View style={{ flex: 21, justifyContent: `center` }}>
            <Text style={{ marginLeft: Scaling.vertical(10), fontSize: Scaling.vertical(16), fontWeight: `bold`, color: `black` }}>{label}</Text>
        </View>
        <View style={{ flex: 79, justifyContent: `center` }}>
            <Text style={{ fontSize: Scaling.vertical(16)}}>{value}</Text>
        </View>
    </View>
);


const { width, height } = Dimensions.get(`window`);

const styles = Scaling.newStylesheet({
    container: { flex: 1 },
    headerContainer: { backgroundColor: `rgb(249, 236, 233)` },
    infoContainerSpacer: { marginTop: height * 0.4 },
    travelInfoContainer: {
        marginBottom: 5,
        backgroundColor: `white`,
        borderRadius: 14,
        height: 36,
        marginHorizontal: 40,
        flexDirection: `row`
    },
    infoContainer: {
        padding: 20,
        marginLeft: `7.5w`,
        width: `85w`,
        borderRadius: 12,
        backgroundColor: `white`
    },
    headerLabel: {
        fontSize: 30,
        color: `black`,
        fontWeight: `bold`
    },
    description: {
        fontSize: 15,
        lineHeight: 22,
        color: `rgb(183, 181, 191)`
    }
});
