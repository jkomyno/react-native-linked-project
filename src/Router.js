/**
* @providesModule skydreamer/Router
*/

import React from 'react';
import { connect } from 'react-redux';
import { Scene, Router } from 'react-native-router-flux';
import { sessionActions, authActions, userActions } from 'skydreamer/redux/actions';
import { RootTabIcon, InternalCardTabIcon, InternalProfileIcon } from 'skydreamer/components/navigation';
import firebase from 'skydreamer/utils/firebase';
import Scaling from 'skydreamer/utils/scaling';
import colors from 'skydreamer/config/colors';
import Images from 'skydreamer/images';
import { View } from 'react-native';
import {
    SplashScreen,
    LoginScreen,
    SwipeCardScreen,
    DirectionsScreen,
    GalleryPlacesScreen,
    GalleryHomeawayScreen,
    CardMatchScreen,
    ChatListScreen,
    MessengerScreen,
    ProfileScreen,
    ProfileEditScreen,
    CardDeckScreen,
    SessionGradient,
    BuddiesScreen
} from 'skydreamer/components/pages';

const navIcons = Images.navigation;
const {
    chatOn,
    chatOff,
    groupOn,
    groupOff,
    deckOn,
    deckOff,
    swipeOn,
    swipeOff
} = navIcons;

const placeholderImage = { uri: `http://placehold.it/32` };

class ApplicationRouter extends React.Component {

    constructor(props) {
        super(props);
        this.loggedIn = false;
    }

    componentDidMount() {
        this.unsubscribeAuth = firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                // User successfully logged in, or the authorization token has changed.
                this.props.onFirebaseAuthSuccess(user).then((uid) => {
                    if(this.loggedIn) return;
                    this.loggedIn = true;

                    this.props.syncSessions();
                    this.props.loadProfile(uid);
                });

            } else {
                this.loggedIn = false;
                this.props.onFirebaseAuthFailed();
            }
        });
    }

    componentWillUnmount() {
        // When I get back, I should do the Match page, and then the Flight page.
        this.unsubscribeAuth();

        // Tab information
        // Plane    - Flights ( Search Flights for Card )
        // Mountain - Interesting Places ( Unimplemented )
        // Bed      - Homeaway ( Homeaway get properties )
        // Tag      - Groupon  ( Get GorupOn Deals )
        // Wine     - Party ( Not implemented yet )
    }

    render() {
        return (
            <Router key="root">

                <Scene key="splashScreen"
                    component={SplashScreen}
                    hideNavBar={true}
                    initial={true} />

                <Scene
                  key="sessionGradient"
                  component={SessionGradient}
                  hideNavBar />

                <Scene key="loginScreen"
                    component={LoginScreen}
                    hideNavBar={true} />

                <Scene key="rootTabController"
                    tabs={true}
                    tabBarStyle={styles.tabBarStyle}
                    tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}>

                    <Scene key="tabSwipeCards"
                        icon={RootTabIcon}
                        iconOn={swipeOn}
                        iconOff={swipeOff}
                        indicatorColor={colors.warmRed}
                        initial={true}>
                        { /* Scenes that belong to this tab */ }
                        <Scene key="swipeCards"
                            initial={true}
                            component={SwipeCardScreen}
                            panHandlers={null}
                            renderBackButton={()=>(null)} />

                        <Scene key="directions"
                            component={DirectionsScreen} />

                        <Scene key="match"
                            hideNavBar={true}
                            hideTabBar={true}
                            component={CardMatchScreen} />

                        <Scene key="internalCardTabs"
                            tabs={true}
                            tabBarStyle={styles.topTabBarStyle}
                            tabBarSelectedItemStyle={styles.topTabBarSelectedItemStyle}>

                            <Scene key="tabPlaces"
                                initial={true}
                                hideNavBar={true}
                                icon={InternalCardTabIcon}
                                iconOn={placeholderImage}
                                iconOff={placeholderImage}
                                component={GalleryPlacesScreen} />

                            <Scene key="tabHomeaway"
                                hideNavBar={true}
                                icon={InternalCardTabIcon}
                                iconOn={placeholderImage}
                                iconOff={placeholderImage}
                                component={GalleryHomeawayScreen} />

                        </Scene>
                    </Scene>

                    <Scene key="tabCardDeck"
                        icon={RootTabIcon}
                        iconOn={deckOn}
                        iconOff={deckOff}
                        indicatorColor={colors.warmBlue}>
                        { /* Scenes that belong to this tab */ }
                        <Scene key="dummy" initial="true" component={CardDeckScreen} />
                    </Scene>

                    <Scene key="tabChat"
                        icon={RootTabIcon}
                        iconOn={chatOn}
                        iconOff={chatOff}
                        indicatorColor={colors.purple}>
                        { /* Scenes that belong to this tab */ }
                        <Scene key="chatList" initial="true" component={ChatListScreen} />
                        <Scene key="messenger" component={MessengerScreen} />
                    </Scene>

                    <Scene key="tabProfile"
                        icon={RootTabIcon}
                        iconOn={groupOn}
                        iconOff={groupOff}
                        hideNavBar={true}
                        indicatorColor={colors.warmGreen}>
                        { /* Scenes that belong to this tab */ }
                        <Scene key="internalProfileTabs"
                            initial={true}
                            tabs={true}
                            tabBarStyle={styles.topTabBarStyle}
                            tabBarSelectedItemStyle={styles.topTabBarSelectedItemStyle}>

                            <Scene key="profile"
                                initial={true}
                                hideNavBar={true}
                                title="PROFILE"
                                indicatorColor="green"
                                icon={InternalProfileIcon}
                                iconOn={placeholderImage}
                                iconOff={placeholderImage}
                                component={ProfileScreen} />


                            <Scene key="buddies"
                                initial={false}
                                hideNavBar={true}
                                title="BUDDIES"
                                indicatorColor="purple"
                                icon={InternalProfileIcon}
                                iconOn={placeholderImage}
                                iconOff={placeholderImage}
                                component={BuddiesScreen} />

                            <Scene key="editProfile" hideTabBar={true} component={ProfileEditScreen} />
                        </Scene>


                    </Scene>

                </Scene>

            </Router>
        );
    }
}

const styles = Scaling.newStylesheet({
    tabBarStyle: {
        backgroundColor: `white`,
        height: 60,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: `rgba(0,0,0,0.1)`
    },
    topTabBarStyle: {
        height: 50,
        backgroundColor: colors.lightPink,
        top: 0
    },
    topTabBarSelectedItemStyle: {
        backgroundColor: colors.lightPink,
        flexDirection: `row`
    },
    tabBarSelectedItemStyle: {
        backgroundColor: `white`
    }
});

const mapDispatch = {
    onFirebaseAuthSuccess: authActions.onFirebaseAuthSuccess,
    onFirebaseAuthFailed: authActions.onFirebaseAuthFailed,
    syncSessions: sessionActions.syncSessions,
    loadProfile: userActions.loadProfile
};

export default connect(
    null,
    mapDispatch
)(ApplicationRouter);
