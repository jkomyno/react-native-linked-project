import React from 'react';
import { Image, PixelRatio, Animated, View, Text, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { GradientText } from 'skydreamer/components/common';
import colors from 'skydreamer/config/colors';
import { swipeCardActions, userActions } from 'skydreamer/redux/actions';
import SwipeDeck from 'react-native-swipe-cards';
import { get as _get } from 'lodash';
import Card from './Card';
import CachedImage from 'react-native-cached-image';
import Scaling from 'skydreamer/utils/scaling';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Toast, {DURATION} from 'react-native-easy-toast'
const ImageCacheProvider = CachedImage.ImageCacheProvider;
const { height } = Dimensions.get(`window`);

const modalHeightVal = (height * PixelRatio.get()) > 1000 ? -190 : -158;

class SwipeCardScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = { cards: props.cards, modalHeight: new Animated.Value(modalHeightVal), modalOpen: false };
        this.toggleModal = this.toggleModal.bind(this);
    }

    componentDidMount() {
        if(this.props.fetchRequired && !this.props.fetching) {
            this.props.fetchCards(this.props.fetchPageIndex);
        }
        const { fetchUserSessions, travel_id } = this.props;
        fetchUserSessions(travel_id);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.fetchRequired && !nextProps.fetching && !nextProps.empty) {
            this.props.fetchCards(nextProps.fetchPageIndex);
        }
        this.setState(() => ({ cards: nextProps.cards }));
        const images = [];
        nextProps.cards.forEach((card) => {
            card.groupUsers = nextProps.groupUsers;
            images.push(card.image);
        });

        ImageCacheProvider.cacheMultipleImages(images);
    }

    toggleModal() {
        Animated.timing(this.state.modalHeight, {
            toValue: this.state.modalOpen ? modalHeightVal : 40,
            duration: 300
        }).start();

        this.setState({ modalOpen: !this.state.modalOpen });
    }

    renderCreateNewSessionButton = () => {
        return (
          <TouchableOpacity style={styles.buttonContainer} onPress={() => { Actions.sessionGradient() }}>
              <Image source={require('../../../images/button.png')} style={styles.addIcon} />
              <GradientText text={`Create new session`} size={Scaling.vertical(20)} startColor="green" endColor="yellow"/>
          </TouchableOpacity>
        );
    }

    onPressSession = (session) => {
        this.toggleModal();
        const { fetchCards, setTravelId } = this.props;
        fetchCards(1, session.travel_id, /*shouldResetStack*/ true);
        setTravelId(session.travel_id)
         this.toast.show(`Session selected ${session.group_name}`, 2000);
    }

    render() {
        const { groupUsers, userSessions } = this.props;
        const active = _.get(this.props, `userSessions.active`);
        const sessions = _.get(this.props, `userSessions.sessions`);
        const activeGroupName = active && active.group_name;
        const backgroundColor = !this.state.modalOpen ?  colors.lightPink  : 'rgba(0,0,0,0.4)'
        return (
            <View style={{ flex: 1, backgroundColor }}>
                <SwipeDeck cards={this.state.cards}
                    renderCard={(data) => <Card { ...data } /> }
                    renderNoMoreCards={() => <View /> }
                    handleYup={this.props.onOfferApproved}
                    handleNope={this.props.onOfferDeclined}
                    onClickHandler={() => {}}
                    hasMaybeAction={false} />

                <Animated.View style={[styles.modal, { bottom: this.state.modalHeight } ]}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalSpacer} />
                        <Text style={styles.modalTitle}>{activeGroupName}</Text>
                        <View style={styles.modalSeperator} />
                        <ScrollView style={styles.modalScrollview}>
                            {
                                _.map(sessions, (session, index) => {
                                    return (
                                    <TouchableOpacity key={index} onPress={() => this.onPressSession(session)}><RowItem name={session && session.group_name} groupUsers={groupUsers} /></TouchableOpacity>
                                    );
                                })
                            }
                            <View style={styles.modalSpacer} />
                        </ScrollView>
                        {this.renderCreateNewSessionButton()}
                        <TouchableOpacity style={styles.modalIcon} onPress={this.toggleModal}>
                            <Ionicon name={`${this.state.modalOpen ? `ios-arrow-down` : `ios-arrow-up`}`} size={Scaling.vertical(44)} style={{ padding: 10 }} color="rgb(236, 77, 72)" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.modalMainAvatarContainer}>
                        <CachedImage style={styles.modalMainAvatar} source={{ uri: groupUsers[0]}} />
                        <CachedImage style={styles.modalMainAvatar} source={{ uri: groupUsers[1]}}  />
                        <CachedImage style={styles.modalMainAvatar} source={{ uri: groupUsers[2]}} />
                    </View>
                </Animated.View>
                <Toast
                    ref={(comp) => { this.toast = comp }}
                    style={{backgroundColor:'rgba(0,0,0,0.8)'}}
                    position='top'
                    positionValue={63}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{color:'white'}}
                    />
            </View>
        );
    }
}

const RowItem = ({name, groupUsers}) => (
    <View style={{ flex: 1, flexDirection: `row`, alignItems: `center`, marginHorizontal: Scaling.vertical(25), marginTop: Scaling.vertical(15) }}>
        <Text style={{ flex: 6, fontSize: Scaling.vertical(18), color: `rgb(236, 77, 72)`}}>{name}</Text>
    </View>
);

const styles = Scaling.newStylesheet({
    modal: {
        position: `absolute`,
        backgroundColor: `transparent`,
        left: 0,
        right: 0,
        height: 330,
        alignItems: `center`,
        justifyContent: `center`
    },
    modalContainer: {
        backgroundColor: `white`,
        borderRadius: 30,
        marginTop: 30,
        height: 300,
        width: 375,
        elevation: 1,
        paddingBottom: 20
    },
    modalMainAvatarContainer: {
        position: `absolute`,
        flexDirection: `row`,
        justifyContent: `center`,
        alignItems: `center`,
        width: 375,
        top: 18,
        elevation: 2
    },
    modalMainAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginHorizontal: 8,
        borderWidth: 1,
        borderColor: `rgba(0,0,0,0.1)`
    },
    modalSmallAvatar: {
        width: 28,
        height: 28,
        borderRadius: 14,
        marginHorizontal: 2,
        borderColor: `rgba(0,0,0,0.1)`
    },
    modalIcon: {
        position: `absolute`,
        right: 10,
        top: -5
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: `bold`,
        color: `rgb(236, 77, 72)`,
        textAlign: `center`
    },
    modalSpacer: {
        marginTop: 35
    },
    modalSeperator: {
        width: 340,
        marginLeft: 20,
        marginTop: 5,
        height: 2,
        backgroundColor: `rgb(236, 77, 72)`
    },
    modalScrollview: {
        marginTop: 20,
        flex: 1,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    addIcon: {
        marginRight: 10,
        height: 20,
        width: 20
    }
});

const mapStateToProps = (state) => {
    return ({
        cards: state.swipeCards.collection,
        fetchRequired: state.swipeCards.fetchRequired,
        fetching: state.swipeCards.fetching,
        fetchPageIndex: state.swipeCards.fetchPageIndex,
        groupUsers: state.swipeCards.groupUsers,
        empty: state.swipeCards.empty,
        userSessions: _get(state, `swipeCards.userSessions.data`),
        travel_id: _get(state, `sessions.collection.${_get(state, `sessions.selected`)}.id`),
        isUserSessionFetching: _get(state, `swipeCards.userSessions.fetching`)
    });
};

const mapDispatch = {
    fetchCards: swipeCardActions.fetchCards,
    onOfferApproved: swipeCardActions.onOfferApproved,
    onOfferDeclined: swipeCardActions.onOfferDeclined,
    fetchUserSessions: swipeCardActions.fetchUserSessions,
    setTravelId: userActions.setTravelId
};

export default connect (
    mapStateToProps,
    mapDispatch
)(SwipeCardScreen);
