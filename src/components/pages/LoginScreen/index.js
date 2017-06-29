import React from 'react';
import Debug from 'skydreamer/utils/debugger';
import { connect } from 'react-redux';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { authActions } from 'skydreamer/redux/actions';
import Scaling from 'skydreamer/utils/scaling';
import Images from 'skydreamer/images';
import Icon from 'react-native-vector-icons/FontAwesome';

const { background } = Images.login;

class LoginScreen extends React.Component {

    facebookLogin = () => {
        console.warn('123');
        this.props.startFacebookAuth((error) => {
            Debug.error(error); // TODO: Resolve authentication error properly.
        });
    }

    render() {
        return (
            <Image style={styles.background} resizeMode="cover" source={background}>
                <View style={styles.btnContainer}>
                    <TouchableOpacity onPress={this.facebookLogin} style={styles.facebookBtn}>
                        <Icon name="facebook" size={Scaling.vertical(25)} color="white" style={styles.btnIcon} />
                        <Text style={styles.facebookBtnLabel}>Login with Facebook</Text>
                    </TouchableOpacity>
                </View>
            </Image>
        );
    }

}

const styles = Scaling.newStylesheet({
    background: {
        width: `100w`,
        height: `100h`
    },
    btnContainer: {
        position: `absolute`,
        left: 0,
        right: 0,
        bottom: 100,
        alignItems: `center`,
        justifyContent: `center`
    },
    btnIcon: {
        position: `absolute`,
        left: 20,
        top: (40 - 25) / 2
    },
    facebookBtn: {
        width: 275,
        height: 40,
        alignItems: `center`,
        justifyContent: `center`,
        backgroundColor: `#3b579d`,
        borderRadius: 25
    },
    facebookBtnLabel: {
        // fontFamily: `Poppins-SemiBold`,
        fontSize: 13,
        color: `white`
    },
    facebookBtnIcon: {
        marginLeft: 35
    }
});

const mapDispatch = {
    startFacebookAuth: authActions.startFacebookAuth
};

export default connect(
    null,
    mapDispatch
)(LoginScreen);
