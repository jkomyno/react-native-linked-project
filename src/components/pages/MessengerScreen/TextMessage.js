import React from 'react';
import { View, Text } from 'react-native';
import CachedImage from 'react-native-cached-image';
import Scaling from 'skydreamer/utils/scaling';
import firebase from 'skydreamer/utils/firebase';

export default class TextMessage extends React.Component {

    componentDidMount() {
        const { current, userAvatar, fetchProfilePhoto } = this.props;
        if(userAvatar === `http://placehold.it/64`) {
            fetchProfilePhoto(current.userid)
        }
    }

    render() {
        const { prependedComponent, last, current, next, userAvatar } = this.props;
        const { uid } = firebase.auth().currentUser;
        const left = uid !== current.userid;

        const contentContainerStyle = [left ? styles.leftContentContainer : styles.rightContentContainer];
        contentContainerStyle.push(spacingStyle(last, current, next));

        const contentStyle = [left ? styles.leftContentStyle : styles.rightContentStyle];
        contentStyle.push(borderStyle(last, current, next));

        var displayAvatar = (last && last.userid === current.userid) ? false : true;
        if(displayAvatar && current.userid === uid) displayAvatar = false;
        const otherSent = current.userid !== uid;

        return (
            <View style={styles.container}>
                { otherSent && <View style={styles.avatarContainer}>
                    { displayAvatar && <CachedImage style={styles.avatar} source={{ uri: userAvatar }} /> }
                </View> }
                <View style={contentContainerStyle}>
                    <Text style={contentStyle}>{current.objData.value}</Text>
                </View>
            </View>
        );
    }
}

const borderStyle = (last, current, next) => {
    const { uid } = firebase.auth().currentUser;
    var squareCornerDown = false;
    var squareCorner = false;
    var squareCornerUp = false;
    var style = { borderRadius: Scaling.vertical(50), marginTop: Scaling.vertical(2) };
    var currSent = current.userid === uid;
    const lastMatch = last && last.userid === current.userid;
    const nextMatch = next && next.userid === current.userid;

    if(!lastMatch && !nextMatch) {
        squareCorner = false;
        squareCornerUp = false;
        squareCornerDown = false;
    }

    if(!lastMatch && nextMatch) {
        squareCornerDown = true;
        squareCornerUp = false;
        squareCorner = false;
    }

    if(lastMatch && !nextMatch) {
        squareCornerUp = true;
        squareCornerDown = false;
        squareCorner = false;
    }

    if(lastMatch && nextMatch) {
        squareCorner = true;
        squareCornerUp = false;
        squareCornerDown = false;
    }

    if(squareCorner) {
        style[`${currSent ? `borderTopRightRadius` : `borderTopLeftRadius`}`] = Scaling.vertical(10);
        style[`${currSent ? `borderBottomRightRadius` : `borderBottomLeftRadius`}`] = Scaling.vertical(10);
        return style;
    }

    if(squareCornerUp) {
        style[`${currSent ? `borderTopRightRadius` : `borderTopLeftRadius`}`] = Scaling.vertical(10);
        return style;
    }

    if(squareCornerDown) {
        style[`${currSent ? `borderBottomRightRadius` : `borderBottomLeftRadius`}`] = Scaling.vertical(10);
        return style;
    }

    return style;
};

const spacingStyle = (last, current, next) => {
    return {
        marginTop: last ? last.userid === current.userid ? 2 : 10 : 2
    };
};

const styles = Scaling.newStylesheet({
    container: {
        flexDirection: `row`,
        justifyContent: `flex-end`,
        flexWrap: `wrap`
    },
    rightContentContainer: {
        flexDirection: `row`,
        justifyContent: `flex-end`,
        alignItems: `center`,
        flex: 0.8
    },
    rightContentStyle: {
        backgroundColor: `#EC514D`,
        paddingVertical: 8,
        paddingHorizontal: 20,
        flexWrap: `wrap`,
        color: `white`,
        fontSize: 15
    },
    leftContentContainer: {
        flexDirection: `row`,
        justifyContent: `flex-start`,
        alignItems: `center`,
        flex: 0.8
    },
    leftContentStyle: {
        backgroundColor: `#f4c1bb`,
        paddingVertical: 8,
        paddingHorizontal: 20,
        flexWrap: `wrap`,
        color: `white`,
        fontSize: 15
    },
    avatarContainer: {
        justifyContent: `flex-end`,
        flex: 0.1
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18
    }
});
