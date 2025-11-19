import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import styles from './Style';
import { StatusBar } from 'expo-status-bar';
import ArrowButton from '../../components/Buttons/ArrowButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import Baralho from '../../components/Baralho/Baralho';
import VerMaisButton from '../../components/Buttons/VerMaisButton';
import EditProfileButton from '../../components/Buttons/EditProfileButton';

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            <View style={[styles.header, styles.BackgroundTheme]}>
                <ArrowButton style={styles.arrowButton} onPress={() => navigation.navigate('Home')} />

                <Image source={require('../../images/baruffi.jpg')} style={styles.profileImage} />

                <Text style={styles.profileName}>Bruno Baruffi</Text>
                <Text style={styles.userName}>bruno_baruffi</Text>
                <Text style={styles.userName}>Google Auth em breve...</Text>
            </View>

        </View>
    );
};