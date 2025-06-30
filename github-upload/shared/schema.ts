import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const cardDecks = pgTable("card_decks", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
  description: text("description").notNull(),
  color: text("color").notNull(),
  imageUrl: text("image_url").notNull(),
  order: integer("order").notNull(),
});

export const cards = pgTable("cards", {
  id: serial("id").primaryKey(),
  deckKey: text("deck_key").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  preview: text("preview").notNull(),
  order: integer("order").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertCardDeckSchema = createInsertSchema(cardDecks).omit({
  id: true,
});

export const insertCardSchema = createInsertSchema(cards).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type CardDeck = typeof cardDecks.$inferSelect;
export type Card = typeof cards.$inferSelect;
export type InsertCardDeck = z.infer<typeof insertCardDeckSchema>;
export type InsertCard = z.infer<typeof insertCardSchema>;
