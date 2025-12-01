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
        paddingBottom: 30,
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
        marginTop: 10,
        fontWeight: 'bold',
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

    // Seção de Estatísticas
    statsSection: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 20,
        backgroundColor: 'white',
        marginHorizontal: 15,
        marginTop: -15,
        marginBottom: 10,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },

    statCard: {
        alignItems: 'center',
        flex: 1,
    },

    statNumber: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#96D289',
        marginTop: 8,
    },

    statLabel: {
        fontSize: 13,
        color: '#666',
        marginTop: 5,
        textAlign: 'center',
    },

    // Estatísticas (mantido para compatibilidade)
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 20,
        backgroundColor: 'white',
        marginHorizontal: 15,
        marginTop: -15,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },

    statBox: {
        alignItems: 'center',
    },

    statNumber: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#96D289',
    },

    statLabel: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },

    // Seção de Baralhos
    baralhosSection: {
        padding: 20,
        marginTop: 10,
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },

    baralhoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },

    baralhoInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },

    baralhoRightInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },

    baralhoTitulo: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },

    cardCount: {
        fontSize: 14,
        color: '#666',
    },

    loadingContainer: {
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },

    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
    },

    emptyText: {
        fontSize: 16,
        color: '#999',
        marginTop: 10,
    },

});