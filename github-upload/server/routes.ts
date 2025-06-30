import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all card decks
  app.get("/api/decks", async (req, res) => {
    try {
      const decks = await storage.getAllCardDecks();
      res.json(decks);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch decks" });
    }
  });

  // Get specific deck by key
  app.get("/api/decks/:key", async (req, res) => {
    try {
      const deck = await storage.getCardDeck(req.params.key);
      if (!deck) {
        return res.status(404).json({ error: "Deck not found" });
      }
      res.json(deck);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch deck" });
    }
  });

  // Get cards for a specific deck
  app.get("/api/decks/:key/cards", async (req, res) => {
    try {
      const cards = await storage.getCardsByDeck(req.params.key);
      res.json(cards);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch cards" });
    }
  });

  // Get specific card by id
  app.get("/api/cards/:id", async (req, res) => {
    try {
      const cardId = parseInt(req.params.id);
      if (isNaN(cardId)) {
        return res.status(400).json({ error: "Invalid card ID" });
      }
      
      const card = await storage.getCard(cardId);
      if (!card) {
        return res.status(404).json({ error: "Card not found" });
      }
      res.json(card);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch card" });
    }
  });

  // Update card
  app.put("/api/cards/:id", async (req, res) => {
    try {
      const cardId = parseInt(req.params.id);
      if (isNaN(cardId)) {
        return res.status(400).json({ error: "Invalid card ID" });
      }
      
      const updates = req.body;
      const updatedCard = await storage.updateCard(cardId, updates);
      res.json(updatedCard);
    } catch (error) {
      res.status(500).json({ error: "Failed to update card" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
