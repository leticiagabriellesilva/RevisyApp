import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },

    header: {
        position: 'relative',
        alignItems: 'center',
        padding: 20,
    },

    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 100,
        marginTop: 20,
    },

    profileName: {
        color: 'white',
        fontSize: 25,
    },

    userName: {
        color: '#c7c7c7',
        fontSize: 13,
    },

    ranking: {
        color: 'white',
        fontSize: 15,
    },

    arrowButton: {
        position: 'absolute',
        top: 50,
        left: 20,
    },

    container2: {
        padding: 20,
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
        justifyContent: 'flex-start',
        rowGap: 10,
        columnGap: 75,
        marginLeft: 17
    },

    deckItem: {
        paddingLeft: 30,
        alignItems: 'center', // centraliza o texto abaixo do componente
        width: 100,           // defina uma largura consistente para alinhamento
    },

    deckScore: {
        fontSize: 12,
        color: '#333',
        textAlign: 'center',
    },

    ColorTheme: {
        color: 'purple',
    },

    BackgroundTheme: {
        backgroundColor: 'purple'
    },

    buttomView: {
        padding: 20,
    }
});