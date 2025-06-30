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
import { Card, CardDeck } from '../types';
import { deckColors, deckBorderColors } from '../constants/deckData';

interface AccordionSectionProps {
  title: string;
  content: string;
  isExpanded: boolean;
  onToggle: () => void;
}

function AccordionSection({ title, content, isExpanded, onToggle }: AccordionSectionProps) {
  return (
    <View style={styles.accordionSection}>
      <TouchableOpacity style={styles.accordionHeader} onPress={onToggle}>
        <Text style={styles.accordionTitle}>{title}</Text>
        <Ionicons 
          name={isExpanded ? "chevron-up" : "chevron-down"} 
          size={20} 
          color="#374151" 
        />
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.accordionContent}>
          <Text style={styles.accordionText}>{content}</Text>
        </View>
      )}
    </View>
  );
}

export default function CardScreen() {
  const [card, setCard] = useState<Card | null>(null);
  const [deck, setDeck] = useState<CardDeck | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  
  const navigation = useNavigation();
  const route = useRoute();
  const { deckKey, cardId } = route.params as { deckKey: string; cardId: number };

  useEffect(() => {
    loadCardData();
  }, [cardId, deckKey]);

  const loadCardData = async () => {
    try {
      const [cardData, deckData] = await Promise.all([
        api.getCard(cardId),
        api.getDeck(deckKey)
      ]);
      setCard(cardData);
      setDeck(deckData);
    } catch (error) {
      console.error('Error loading card data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const toggleSection = (sectionKey: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  const parseAccordionContent = (content: string) => {
    // Parse accordion sections from content
    const emojiPattern = /^(🌱|🔥|💫|👁️|🤝|🎯|👀|👂|💝|❤️|🎭|👑|🏛️|👣|🤲|😡|💪|🏃‍♂️|🚪|📋|🎪|⚖️|🧭|🔍|💎|🎁|🛡️|🕊️|💬|🤗|🌊|✨)/gm;
    
    const sections = content.split('\n\n').filter(section => section.trim());
    const accordionSections: Array<{ title: string; content: string }> = [];
    
    sections.forEach(section => {
      const lines = section.split('\n');
      const firstLine = lines[0];
      
      if (emojiPattern.test(firstLine)) {
        const title = firstLine.trim();
        const content = lines.slice(1).join('\n').trim();
        accordionSections.push({ title, content });
      }
    });
    
    return accordionSections.length > 0 ? accordionSections : null;
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#a48262" />
          <Text style={styles.loadingText}>Loading card...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!card || !deck) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Card not found</Text>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const colors = deckColors[deckKey] || ['#d0a07a', '#e0cfc3'];
  const accordionSections = parseAccordionContent(card.content);

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
          <Text style={styles.headerSubtitle}>Card {card.orderIndex}</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="bookmark-outline" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="share-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        <View style={[
          styles.cardContainer,
          { borderColor: deckBorderColors[deckKey] || '#d0a07a' }
        ]}>
          <Text style={styles.cardTitle}>{card.title}</Text>
          
          {accordionSections ? (
            <View style={styles.accordionContainer}>
              {accordionSections.map((section, index) => (
                <AccordionSection
                  key={`${card.id}-${index}`}
                  title={section.title}
                  content={section.content}
                  isExpanded={expandedSections[`${card.id}-${index}`] || false}
                  onToggle={() => toggleSection(`${card.id}-${index}`)}
                />
              ))}
            </View>
          ) : (
            <Text style={styles.cardContent}>{card.content}</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
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
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
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
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 20,
    textAlign: 'center',
  },
  cardContent: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  accordionContainer: {
    gap: 12,
  },
  accordionSection: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    overflow: 'hidden',
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9fafb',
  },
  accordionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    flex: 1,
  },
  accordionContent: {
    padding: 16,
    backgroundColor: 'white',
  },
  accordionText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
});