import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },

    header: {
        position: 'relative',
        alignItems: 'center',
        padding: 15,
    },

    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 100,
        marginTop: 25,
    },

    profileName: {
        color: 'white',
        fontSize: 23,
    },

    userName: {
        color: '#807C7C',
        fontSize: 13,
    },

    ranking: {
        color: 'white',
        fontSize: 15,
    },

    arrowButton: {
        position: 'absolute',
        top: 35,
        left: 20,
    },

    container2: {
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },

    points: {
        alignItems: 'center',
    },

    number: {
        fontSize: 23,
    },

    description: {
        fontSize: 14
    },

    decksTitle: {
        paddingBottom: 5,
        fontSize: 20,
    },

    decksContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        // rowGap: 10,
        // columnGap: 75,
        // marginLeft: 17
    },

    deckItem: {
        // paddingLeft: 30,
        // alignItems: 'center',
        // width: 100,
    },

    deckScore: {
        fontSize: 12,
        color: '#333',
        textAlign: 'center',
    },

    ColorTheme: {
        color: '#96D289',
    },

    BackgroundTheme: {
        backgroundColor: '#96D289'
    },

    buttomView: {
        padding: 20,
    },

    buttomContainer: {
        padding: 8,
        alignSelf: 'center',
    }
});