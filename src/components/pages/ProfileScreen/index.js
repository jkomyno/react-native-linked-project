import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { userActions } from 'skydreamer/redux/actions';
import Scaling from 'skydreamer/utils/scaling';
import CachedImage from 'react-native-cached-image';
import { GradientText } from 'skydreamer/components/common';
import ActionButton from './ActionButton';

class ProfileScreen extends React.Component {
    render() {
        const { user } = this.props;
        console.warn(JSON.stringify(user, null, 2));
        return (
            <ScrollView style={styles.container}>
                <View>
                    <View style={styles.bigAvatarContainer}>
                        <CachedImage source={{ uri: user.photo }} style={styles.bigAvatar} resizeMode="cover"/>
                    </View>
                    <View style={styles.smallAvatarContainer}>
                        { user.friends.map((friend, index) => {
                            return <CachedImage key={index} source={{ uri: friend }} style={styles.smallAvatar} resizeMode="cover" />
                        }) }
                    </View>
                    <View style={styles.overlayBtnContainer}>
                    <ActionButton
                     color="white"
                     size={14}
                     icon="pencil"
                     style={styles.overlayBtn}
                     onPress={Actions.editProfile} />
                    </View>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.nameLabel}>{user.first_name}</Text>
                    <Text style={styles.infoLabel}>24 yrs Amsterdam</Text>
                    <GradientText text={`#beach #party #adventure`} size={Scaling.vertical(20)} fontWeight="italic" startColor="green" endColor="yellow"/>
                    <Text style={styles.biography}>{user.profile_text}</Text>
                </View>


            </ScrollView>
        );
    }


    componentDidMount() {
        // this.props.loadProfile();
    }
}

const styles = Scaling.newStylesheet({
    container: {
        flex: 1,
        marginBottom: 60
    },
    infoContainer: {
        flex: 1,
        paddingHorizontal: 10
    },
    bigAvatarContainer: {
        alignItems: `center`,
        paddingTop: 50
    },
    bigAvatar: {
        width: `100w`,
        height: `50h`
    },
    smallAvatarContainer: {
        marginTop: 10,
        height: 46,
        flexDirection: `row`,
        justifyContent: `center`
    },
    smallAvatar: {
        width: 46,
        height: 46,
        borderRadius: 23,
        marginHorizontal: 4
    },
    overlayBtnContainer: {
        position: `absolute`,
        flexDirection: `row`,
        justifyContent: `flex-end`,
        right: 20,
        bottom: 24,
        height: 50,
        width: 110
    },
    overlayBtn: {
        width: 34,
        height: 34,
        borderRadius: 17,
        marginHorizontal: 5,
        backgroundColor: `green`,
        alignItems: `center`,
        justifyContent: `center`
    },
    nameLabel: {
        fontWeight: `bold`,
        fontSize: 20,
        color: `black`
    },
    infoLabel: {
        color: `#a4a4a4`
    },
    biography: {
        marginTop: 25,
        color: `#a4a4a4`
    }
});


const mapStateToProps = (state) => ({
    user: state.user.user
});

const mapDispatch = {
    loadProfile: userActions.loadProfile
}

export default connect(
    mapStateToProps
)(ProfileScreen);
