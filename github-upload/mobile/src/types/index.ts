export interface CardDeck {
  id: number;
  key: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
}

export interface Card {
  id: number;
  deckKey: string;
  title: string;
  category: string;
  preview: string;
  content: string;
  orderIndex: number;
}

export type RootStackParamList = {
  Dashboard: undefined;
  Deck: { deckKey: string };
  Card: { deckKey: string; cardId: number };
};