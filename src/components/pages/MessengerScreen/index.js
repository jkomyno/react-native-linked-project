import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { FlatList, ActivityIndicator, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { userActions, sessionActions } from 'skydreamer/redux/actions';
import deepEqual from 'deep-equal';
import Scaling from 'skydreamer/utils/scaling';
import TextMessage from './TextMessage';
import Timestamp from './Timestamp';
import TypingBubble from './TypingBubble';
import colors from 'skydreamer/config/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from 'skydreamer/utils/firebase';

class ChatListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collection: _.uniqBy(props.messages, 'key'),
            textInput: ``
        };
    }

    componentWillReceiveProps(nextProps) {
        if(!deepEqual(nextProps.messages, this.state.collection)) {
            this.setState({ collection: _.uniqBy(nextProps.messages, 'key') });
        }
    }

    componentDidMount() {
        const { session } = this.props;
        const { lastFetchCount } = session;
        if(!lastFetchCount) {
            this.props.fetchMessages(session);
        }
    }

    componentWillUnmount() {
        const { session } = this.props;
        this.props.stopTyping(session.key);
    }

    sendMessage = () => {
        const { session } = this.props;
        const { textInput } = this.state;
        if(!textInput || textInput.trim().length < 1) return;
        this.setState({ textInput: `` });
        this.props.sendMessage(session.key, textInput, `text`);
        this.props.stopTyping(session.key);
    }

    render() {
        const { collection } = this.state;
        const { session, userPhotoCache } = this.props;
        const { usersTyping } = session;
        const lastMessage = this.state.collection ? this.state.collection[0] : null;
        const { uid } = firebase.auth().currentUser;
        var renderTypingBubble = false;

        if(usersTyping) {
            for(var key in usersTyping) {
                if(key !== uid) {
                    renderTypingBubble = true;
                    break;
                }
            }
        }

        // this.props.fetchMessages(session, lastMessage)
        return (
            <View style={styles.container}>
                <FlatList
                    ref={ ref => this.list = ref }
                    style={styles.list}
                    data={collection}
                    onLayout={(event) => {
                        const { width, height } = event.nativeEvent.layout;
                        this.listHeight = height;
                    }}
                    onContentSizeChange={() => {
                        if(this.list == null) return;
                        if(collection.length < 10) return;
                        this.list.scrollToEnd();
                    }}
                    renderItem={({item, index}) => {
                        const lastItem = index > 0 ? collection[index - 1] : null;
                        const nextItem = (index > collection.length - 1) ? null : collection[index + 1];

                        const lastItemMonth = lastItem ? new Date(Math.floor(lastItem.timestamp / 1000)).getMonth() : 0;
                        const thisItemMonth = new Date(Math.floor(item.timestamp / 1000)).getMonth();

                        var prependedComponent = null;
                        if(lastItemMonth != thisItemMonth) {
                            prependedComponent = <Timestamp message={item} />;
                        }

                        var appendedComponent = null;
                        if(!nextItem) appendedComponent = <View style={{ marginTop: 20 }} />;

                        if(!nextItem && renderTypingBubble) {
                            appendedComponent = <TypingBubble />;
                        }

                        return (
                            <View>
                                { prependedComponent }
                                <TextMessage
                                    last={lastItem}
                                    current={item}
                                    next={nextItem}
                                    userAvatar={userPhotoCache[item.userid] || `http://placehold.it/64`}
                                    fetchProfilePhoto={this.props.fetchProfilePhoto} />
                                { appendedComponent }
                            </View>
                        );
                    } } />

                <View style={styles.footer}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Hello, I am a placeholder"
                            placeholderTextColor="#AFA3C6"
                            value={this.state.textInput}
                            underlineColorAndroid="white"
                            multiline={true}
                            onChangeText={(value) => {
                                this.setState({ textInput: value });
                                if(value.length > 0) this.props.startTyping(this.props.session.key);
                                else this.props.stopTyping(this.props.session.key);
                            } } />
                    </View>
                    <TouchableOpacity style={styles.iconContainer}>
                        <View style={{ flex: 1, justifyContent: `center` }}>
                            <MaterialIcon name="emoticon-happy" size={Scaling.vertical(25)} style={styles.sendBtn} color={`#AFA3C6`} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconContainer} onPress={this.sendMessage}>
                        <View style={{ flex: 1, justifyContent: `center` }}>
                            <FontAwesome name="send-o" size={Scaling.vertical(25)} style={styles.sendBtn} color={`#AFA3C6`} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = Scaling.newStylesheet({
    container: {
        flex: 1,
        backgroundColor: colors.lightPink,
        marginTop: 50,
        paddingBottom: 60
    },
    list: {
        flex: 1,
        paddingTop: 10,
        marginHorizontal: 20,
    },
    footer: {
        height: 60,
        marginBottom: 0,
        backgroundColor: `white`,
        borderTopWidth: 1,
        borderTopColor: `rgba(0,0,0,0.1)`,
        alignItems: `center`,
        justifyContent: `center`,
        flexDirection: `row`
    },
    iconContainer: {
        flex: 1,
        alignItems: `center`
    },
    inputContainer: {
        flex: 6,
        height: 60
    },
    input: {
        height: 60,
        fontSize: 15,
        paddingLeft: 10
    }
});

const mapStateToProps = ({sessions, cache}) => ({
    messages: sessions.messages[sessions.selected],
    session: sessions.collection[sessions.selected],
    userPhotoCache: cache.userPhotos
});

const mapDispatch = {
    fetchMessages: sessionActions.fetchMessages,
    sendMessage: sessionActions.sendMessage,
    startTyping: sessionActions.startTyping,
    stopTyping: sessionActions.stopTyping,
    fetchProfilePhoto: userActions.fetchProfilePhoto,
};

export default connect(mapStateToProps, mapDispatch)(ChatListScreen);
