import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Deck({title, author, onPress}) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.card}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.author}>de: {author}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginVertical: 10,
        padding: 5,
        height: 100,
        width: 150,
        borderWidth: 1,
        borderColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center'
    },
    author: {
        fontSize: 9
    }
});