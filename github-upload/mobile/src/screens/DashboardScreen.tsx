import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { api } from '../services/api';
import { CardDeck } from '../types';
import { deckBorderColors } from '../constants/deckData';

export default function DashboardScreen() {
  const [decks, setDecks] = useState<CardDeck[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    loadDecks();
  }, []);

  const loadDecks = async () => {
    try {
      const fetchedDecks = await api.getDecks();
      setDecks(fetchedDecks);
    } catch (error) {
      console.error('Error loading decks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeckPress = (deckKey: string) => {
    navigation.navigate('Deck', { deckKey });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#a48262" />
          <Text style={styles.loadingText}>Loading decks...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Conversation Card Decks</Text>
          
          <View style={styles.instructionCard}>
            <Text style={styles.instructionTitle}>How to Use These Cards</Text>
            <Text style={styles.instructionText}>
              These cards are designed to help you build healthier, more connected, and emotionally honest relationships. 
              Each card focuses on a specific relational skill, communication tool, or emotional awareness prompt. 
              You can use them individually, with a partner, in therapy, or in group work.
            </Text>
            
            <Text style={styles.waysTitle}>🛠️ Ways to Use the Cards:</Text>
            <View style={styles.waysList}>
              <View style={styles.wayItem}>
                <Text style={styles.wayText}>• Individual reflection and self-awareness</Text>
              </View>
              <View style={styles.wayItem}>
                <Text style={styles.wayText}>• Partner conversations and check-ins</Text>
              </View>
              <View style={styles.wayItem}>
                <Text style={styles.wayText}>• Therapy sessions and group work</Text>
              </View>
              <View style={styles.wayItem}>
                <Text style={styles.wayText}>• Family meetings and discussions</Text>
              </View>
            </View>
            
            <Text style={styles.goalText}>
              Not to be perfect—but to build awareness, compassion, and connection one interaction at a time. 
              Use the cards as a compass to move out of reactivity and into intentional, healing dialogue.
            </Text>
          </View>
          
          <Text style={styles.subtitle}>
            Choose a deck to begin your journey toward deeper connection
          </Text>
        </View>

        <View style={styles.deckGrid}>
          {decks.map((deck) => (
            <TouchableOpacity
              key={deck.key}
              style={[
                styles.deckCard,
                { borderColor: deckBorderColors[deck.key] || '#d0a07a' }
              ]}
              onPress={() => handleDeckPress(deck.key)}
            >
              <View style={styles.deckImageContainer}>
                <Image
                  source={{ uri: `https://via.placeholder.com/200x250/cccccc/666666?text=${deck.title}` }}
                  style={styles.deckImage}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.deckTitle}>{deck.title}</Text>
              <Text style={styles.deckSubtitle}>{deck.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.allDecksContainer}>
          <TouchableOpacity style={styles.allDecksButton}>
            <Text style={styles.allDecksText}>All Decks</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#f5d7bf',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#f0dfc8',
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 60,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f0dfc8',
    textAlign: 'center',
    marginBottom: 20,
  },
  instructionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  instructionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#92400e',
    textAlign: 'center',
    marginBottom: 12,
  },
  instructionText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 16,
  },
  waysTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#92400e',
    marginBottom: 12,
  },
  waysList: {
    marginBottom: 16,
  },
  wayItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  wayText: {
    fontSize: 14,
    color: '#374151',
  },
  goalText: {
    fontSize: 14,
    color: '#374151',
    fontStyle: 'italic',
    lineHeight: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#e3c3ab',
    textAlign: 'center',
  },
  deckGrid: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  deckCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  deckImageContainer: {
    aspectRatio: 3/4,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deckImage: {
    width: '100%',
    height: '100%',
  },
  deckTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  deckSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  allDecksContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  allDecksButton: {
    backgroundColor: '#a48262',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 12,
  },
  allDecksText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});