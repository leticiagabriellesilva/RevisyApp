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

    arrowButton: {
        position: 'absolute',
        top: 35,
        left: 20,
    },

    ColorTheme: {
        color: '#96D289',
    },

    BackgroundTheme: {
        backgroundColor: '#96D289'
    },

});