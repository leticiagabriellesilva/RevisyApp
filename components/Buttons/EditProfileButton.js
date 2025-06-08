import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function EditProfileButton({ onPress, style }) {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            <View style={styles.content}>
                <Text style={styles.buttonText}>Editar Perfil</Text>
                <Ionicons name="create" size={20} color="white" style={styles.icon} />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'blue',
        padding: 10,
        width: 200,
        borderRadius: 5,
        alignItems: 'center',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginRight: 5, 
    },
    icon: {
        marginLeft: 5,
    },
});
