import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CardDeck } from "@shared/schema";

interface CardDeckGridProps {
  decks: CardDeck[];
  onDeckClick: (deckKey: string) => void;
}

export function CardDeckGrid({ decks, onDeckClick }: CardDeckGridProps) {
  const getBadgeColor = (deckKey: string) => {
    switch (deckKey) {
      case "foundation":
      case "listening":
        return "bg-amber-700";
      case "wounds":
        return "bg-amber-800";
      case "owning":
        return "bg-blue-600";
      case "common":
        return "bg-green-600";
      case "about":
        return "bg-orange-600";
      default:
        return "bg-amber-700";
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {decks.map((deck, index) => (
        <motion.div
          key={deck.key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card 
            className="cursor-pointer transform transition-all hover:scale-105 peace-card-shadow border-0 overflow-hidden"
            onClick={() => onDeckClick(deck.key)}
          >
            <div className="relative">
              <img 
                src={deck.imageUrl} 
                alt={deck.title}
                className="w-full h-32 object-cover"
              />
            </div>
            <CardContent className="p-4">
              <div className={`${getBadgeColor(deck.key)} text-white text-xs px-2 py-1 rounded mb-2 inline-block`}>
                FINDING PEACE CONVERSATION CARDS
              </div>
              <h4 className="font-semibold text-amber-900 mb-1">{deck.title}</h4>
              <p className="text-xs text-gray-600 line-clamp-2">{deck.subtitle}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
