import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import styles from './Style';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';
import ArrowButton from '../../components/Buttons/ArrowButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import Baralho from '../../components/Baralho/Baralho';
import VerMaisButton from '../../components/Buttons/VerMaisButton';
import EditProfileButton from '../../components/Buttons/EditProfileButton';

export default function ProfileScreen({ navigation }) {
    const [baralhos, setBaralhos] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchDados = async () => {
        try {
            setLoading(true);
            
            // Buscar baralhos
            const baralhosResponse = await fetch('http://localhost:3001/baralhos/');
            const baralhosData = await baralhosResponse.json();
            
            // Buscar a quantidade de cards
            const baralhosComCards = await Promise.all(
                baralhosData.map(async (baralho) => {
                    const cardsResponse = await fetch(`http://localhost:3001/cards/baralho/${baralho.id}`);
                    const cardsData = await cardsResponse.json();
                    
                    return {
                        id: baralho.id,
                        titulo: baralho.nome,
                        cardCount: cardsData.length
                    };
                })
            );
            
            setBaralhos(baralhosComCards);
            
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDados();
    }, []);

    // Atualizar dados quando a tela ganhar foco
    useFocusEffect(
        React.useCallback(() => {
            fetchDados();
        }, [])
    );

    return (
        <ScrollView style={styles.container}>
            <StatusBar style="light" />

            <View style={[styles.header, styles.BackgroundTheme]}>
                <ArrowButton style={styles.arrowButton} onPress={() => navigation.navigate('Drawer', { screen: 'Baralhos' })} />

                <Image source={require('../../images/baruffi.jpg')} style={styles.profileImage} />

                <Text style={styles.profileName}>Bruno Baruffi</Text>
            </View>

            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#96D289" />
                </View>
            ) : (
                <>
                    {/* Seção de Baralhos */}
                    <View style={styles.baralhosSection}>
                        <Text style={styles.sectionTitle}>Meus Baralhos</Text>
                        
                        {baralhos.length > 0 ? (
                            baralhos.map((baralho) => (
                                <View 
                                    key={baralho.id} 
                                    style={styles.baralhoItem}
                                >
                                    <View style={styles.baralhoInfo}>
                                        <Ionicons name="folder" size={24} color="#96D289" />
                                        <Text style={styles.baralhoTitulo}>{baralho.titulo}</Text>
                                    </View>
                                    <View style={styles.baralhoRightInfo}>
                                        <Text style={styles.cardCount}>{baralho.cardCount} cards</Text>
                                    </View>
                                </View>
                            ))
                        ) : (
                            <View style={styles.emptyState}>
                                <Ionicons name="folder-open-outline" size={48} color="#ccc" />
                                <Text style={styles.emptyText}>Nenhum baralho criado ainda</Text>
                            </View>
                        )}
                    </View>
                </>
            )}

        </ScrollView>
    );
};