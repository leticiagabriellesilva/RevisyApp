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
                <Text style={styles.ranking}>
                    <Ionicons name="star" size={12} color="gold" /> Top: 1%
                </Text>
            </View>

            <View style={[styles.container2, styles.row]}>
                <View style={styles.points}>
                    <Text style={[styles.number, styles.ColorTheme]}>15</Text>
                    <Text style={styles.description}>Baralhos</Text>
                </View>

                <View style={styles.points}>
                    <Text style={[styles.number, styles.ColorTheme]}>2,2k</Text>
                    <Text style={styles.description}>Pontos</Text>
                </View>

                <View style={styles.points}>
                    <Text style={[styles.number, styles.ColorTheme]}>23</Text>
                    <Text style={styles.description}>Favoritos</Text>
                </View>
            </View>

            <View style={[styles.container2]}>
                <Text style={[styles.baralhosTitle, styles.ColorTheme]}>Top Baralhos</Text>

                <View style={styles.baralhosContainer}>
                    <View style={styles.baralhoItem}>
                        <Baralho title="Redes de Computadores" author="MarlonRodrigues" onPress={() => { }} />
                        <Text style={styles.baralhoScore}>1050/1050</Text>
                    </View>

                    <View style={styles.baralhoItem}>
                        <Baralho title="Banco de Dados" author="LuanSpartan" onPress={() => { }} />
                        <Text style={styles.baralhoScore}>889/900</Text>
                    </View>

                    <View style={styles.baralhoItem}>
                        <Baralho title="Sistemas Operacionais" author="LuanSpartan" onPress={() => { }} />
                        <Text style={styles.baralhoScore}>721/850</Text>
                    </View>

                    <View style={styles.baralhoItem}>
                        <Baralho title="Estrutura de Dados" author="Leticiao" onPress={() => { }} />
                        <Text style={styles.baralhoScore}>826/1050</Text>
                    </View>
                </View>

                <VerMaisButton onPress={() => { }} />
            </View>

            <View style={styles.buttomContainer}>
                <EditProfileButton onPress={() => { }} />
            </View>

        </View>
    );
};