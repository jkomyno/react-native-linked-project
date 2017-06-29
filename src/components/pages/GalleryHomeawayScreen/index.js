import React from 'react';
import { ActivityIndicator, Animated, Easing, ScrollView, TouchableWithoutFeedback, TouchableOpacity, View, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import CachedImage from 'react-native-cached-image';
import colors from 'skydreamer/config/colors';
import Scaling from 'skydreamer/utils/scaling';
import Swiper from 'react-native-swiper';
import LinearGradient from 'react-native-linear-gradient';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const placeholderImage = { uri: `http://placehold.it/256` };

const window = Dimensions.get(`window`);
const windowWidth = window.width;
const windowHeight = window.height;

class GalleryHomeawayScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loadingHack: true };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ loadingHack: false });
        }, 1200);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={styles.container}>
                    <GalleryItem />
                    <GalleryItem />
                    <GalleryItem />
                </ScrollView>
                { this.state.loadingHack && <View style={{ position: `absolute`, left: 0, right: 0, top: 0, bottom: 0, backgroundColor: `white`, alignItems: `center`, justifyContent: `center` }}>
                    <ActivityIndicator size="large" />
                </View> }
            </View>
        );
    }
}

class GalleryItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = { maxHeight: new Animated.Value(2000), collapsed: false };
        this.height = null;
    }

    toggle = (scroll=false) => {
        const val = this.state.collapsed;
        this.setState({ collapsed: !this.state.collapsed });
        Animated.timing(this.state.maxHeight, {
            toValue: val ? this.height : 145,
            duration: 350,
            easing: Easing.bounce
        }).start();
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Swiper height={windowWidth} width={windowWidth}>
                    <View style={styles.slideContainer}>
                        <CachedImage source={{ uri: `http://lorempixel.com/output/nightlife-q-c-640-480-3.jpg` }} style={{ flex: 1 }} resizeMode="cover" />
                    </View>
                    <View style={styles.slideContainer}>
                        <CachedImage source={{ uri: `http://lorempixel.com/output/nightlife-q-c-640-480-8.jpg` }} style={{ flex: 1 }} resizeMode="cover" />
                    </View>
                    <View style={styles.slideContainer}>
                        <CachedImage source={{ uri: `http://lorempixel.com/output/nightlife-q-c-640-480-1.jpg` }} style={{ flex: 1 }} resizeMode="cover" />
                    </View>
                </Swiper>
                <TouchableWithoutFeedback onPress={this.toggle}>
                    <Animated.View style={{ height: this.state.maxHeight }}>
                        <View style={styles.infoContainer} onLayout={(event) => {
                            var { x, y, width, height} = event.nativeEvent.layout;
                            if(!this.height) {
                                this.height = height;
                                this.toggle();
                            }
                        }}>
                        <Text style={styles.titleLabel}>A real little cocoon, pleasant F1, sunny position, near Paris Ideal for a stay</Text>
                        <View style={{ flexDirection: `row` }}>
                            <Ionicon name="ios-star" size={Scaling.vertical(20)} color={`gray`} />
                            <Ionicon name="ios-star" size={Scaling.vertical(20)} color={`gray`} />
                            <Ionicon name="ios-star-half" size={Scaling.vertical(20)} color={`gray`} />
                            <Ionicon name="ios-star-outline" size={Scaling.vertical(20)} color={`gray`} />
                            <Ionicon name="ios-star-outline" size={Scaling.vertical(20)} color={`gray`} />
                            <FontAwesome name="wifi" size={Scaling.vertical(20)} color={`gray`} style={{ marginLeft: Scaling.vertical(20)}} />
                        </View>
                        <Text style={styles.descriptionLabel}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sagittis eu magna eget rutrum. Aliquam vehicula mauris non nibh feugiat, id vulputate arcu facilisis. Praesent mauris ex, semper ac mi sit amet, pellentesque tristique tortor. Vestibulum convallis, urna ac aliquet mattis, nunc ex faucibus ante, non vestibulum lorem nibh vel risus. Curabitur vel rhoncus purus, quis convallis urna. Fusce sit amet elit vel enim commodo efficitur sit amet non felis. Vestibulum luctus ligula justo, molestie pretium quam aliquet vitae. Morbi tempor rhoncus mi eu imperdiet. Donec eu lobortis metus. Mauris ornare placerat turpis nec vehicula.</Text>
                        { this.state.collapsed === false && <TouchableOpacity style={styles.bookBtnContainer}>
                            <LinearGradient
                                colors={[`rgb(227, 69, 144)`, `orange`]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.bookBtn}>
                                <Text style={styles.bookBtnLabel}>Book</Text>
                            </LinearGradient>
                        </TouchableOpacity> }
                        { this.state.collapsed && <LinearGradient
                            colors={[`transparent`, `white`]}
                            style={{ position: `absolute`, left: 0, right: 0, bottom: 175, height: 50 }} /> }
                        </View>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const styles = Scaling.newStylesheet({
    container: {
        flex: 1,
        marginTop: 50,
        marginBottom: 66,
        backgroundColor: colors.lightPink
    },
    slideContainer: {
        flex: 1
    },
    infoContainer: {
        backgroundColor: `white`,
        paddingVertical: 15,
        paddingHorizontal: 30
    },
    titleLabel: {
        fontSize: 22,
        fontWeight: `bold`,
        color: `black`
    },
    ratingIcon: {
        width: 16,
        height: 16
    },
    descriptionLabel: {
        paddingTop: 10
    },
    bookBtnContainer: {
        position: `absolute`,
        top: 25,
        right: 40
    },
    bookBtn: {
        width: 120,
        height: 35,
        borderRadius: 20,
        justifyContent: `center`,
        alignItems: `center`
    },
    bookBtnLabel: {
        fontSize: 16,
        color: `white`
    }
});

export default connect(
    null,
    null
)(GalleryHomeawayScreen);
