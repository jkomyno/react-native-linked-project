import React from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import Scaling from 'skydreamer/utils/scaling';
import Card from './Card';

// TODO: Convert <ScrollView> to <FlatList> implementation

class CardDeckScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.list}>
                    <Card status="none" />
                    <Card status="Liked"  />
                    <Card status="Booked"  />
                    <Card status="Liked"  />
                </ScrollView>
            </View>
        );
    }
}

const styles = Scaling.newStylesheet({
    list: {
        flex: 1,
        paddingTop: 8
    },
    container: {
        flex: 1,
        marginTop: 68,
        marginBottom: 60
    }
});

const mapStateToProps = (state) => ({

});

const mapDispatch = {

};

export default connect(
    mapStateToProps,
    mapDispatch
)(CardDeckScreen);
