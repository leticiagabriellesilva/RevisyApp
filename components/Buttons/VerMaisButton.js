import React from "react";
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function VerMaisButton({ onPress }) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.title}>Ver Mais</Text>
            <FontAwesome name="angle-double-right" size={17} color="black" />
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    button: {
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        marginRight: 5
    }
}) 