import { CardDeck, Card } from '../types';

// This will need to be updated with your deployed backend URL
const API_BASE_URL = 'http://localhost:5000/api';

export const api = {
  async getDecks(): Promise<CardDeck[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/decks`);
      if (!response.ok) {
        throw new Error('Failed to fetch decks');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching decks:', error);
      throw error;
    }
  },

  async getDeck(key: string): Promise<CardDeck> {
    try {
      const response = await fetch(`${API_BASE_URL}/decks/${key}`);
      if (!response.ok) {
        throw new Error('Failed to fetch deck');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching deck:', error);
      throw error;
    }
  },

  async getCards(deckKey: string): Promise<Card[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/decks/${deckKey}/cards`);
      if (!response.ok) {
        throw new Error('Failed to fetch cards');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching cards:', error);
      throw error;
    }
  },

  async getCard(id: number): Promise<Card> {
    try {
      const response = await fetch(`${API_BASE_URL}/cards/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch card');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching card:', error);
      throw error;
    }
  },
};