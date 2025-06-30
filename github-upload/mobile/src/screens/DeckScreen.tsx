import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { api } from '../services/api';
import { CardDeck, Card } from '../types';
import { deckColors, deckBorderColors } from '../constants/deckData';

export default function DeckScreen() {
  const [deck, setDeck] = useState<CardDeck | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();
  const { deckKey } = route.params as { deckKey: string };

  useEffect(() => {
    loadDeckData();
  }, [deckKey]);

  const loadDeckData = async () => {
    try {
      const [deckData, cardsData] = await Promise.all([
        api.getDeck(deckKey),
        api.getCards(deckKey)
      ]);
      setDeck(deckData);
      setCards(cardsData);
    } catch (error) {
      console.error('Error loading deck data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCardPress = (cardId: number) => {
    navigation.navigate('Card', { deckKey, cardId });
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#a48262" />
          <Text style={styles.loadingText}>Loading cards...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!deck) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Deck not found</Text>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const colors = deckColors[deckKey] || ['#d0a07a', '#e0cfc3'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={[
        styles.header,
        { backgroundColor: colors[0] }
      ]}>
        <TouchableOpacity style={styles.backIconButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>{deck.title}</Text>
          <Text style={styles.headerSubtitle}>{cards.length} cards</Text>
        </View>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.deckDescription}>{deck.description}</Text>
        
        <View style={styles.cardsContainer}>
          {cards.map((card, index) => (
            <TouchableOpacity
              key={card.id}
              style={[
                styles.cardItem,
                { borderLeftColor: deckBorderColors[deckKey] || '#d0a07a' }
              ]}
              onPress={() => handleCardPress(card.id)}
            >
              <View style={styles.cardNumber}>
                <Text style={styles.cardNumberText}>{index + 1}</Text>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{card.title}</Text>
                <Text style={styles.cardPreview} numberOfLines={2}>
                  {card.preview}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6b7280',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#ef4444',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#a48262',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 50,
  },
  backIconButton: {
    padding: 8,
    marginRight: 12,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  deckDescription: {
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 24,
    marginBottom: 24,
  },
  cardsContainer: {
    gap: 12,
  },
  cardItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  cardNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardNumberText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  cardPreview: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
});