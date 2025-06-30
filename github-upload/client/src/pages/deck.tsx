import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/header";
import { BottomNav } from "@/components/bottom-nav";
import { CardDeck, Card as CardType } from "@shared/schema";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { deckColors } from "@/lib/deck-data";

export default function DeckPage() {
  const { key } = useParams<{ key: string }>();
  const [, setLocation] = useLocation();

  const { data: deck, isLoading: deckLoading } = useQuery<CardDeck>({
    queryKey: [`/api/decks/${key}`],
  });

  const { data: cards, isLoading: cardsLoading } = useQuery<CardType[]>({
    queryKey: [`/api/decks/${key}/cards`],
  });

  const handleBackClick = () => {
    setLocation("/");
  };

  const handleCardClick = (cardId: number) => {
    setLocation(`/deck/${key}/card/${cardId}`);
  };

  if (deckLoading || cardsLoading) {
    return (
      <div className="max-w-md mx-auto bg-white shadow-2xl min-h-screen">
        <div className="peace-gradient p-4 flex items-center text-white">
          <Skeleton className="h-8 w-8 mr-4 bg-white/20" />
          <div className="flex-1">
            <Skeleton className="h-5 w-32 mb-1 bg-white/20" />
            <Skeleton className="h-4 w-48 bg-white/20" />
          </div>
        </div>
        <div className="p-4 pb-24 space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-4 border-l-4 border-orange-500">
              <Skeleton className="h-5 w-48 mb-2" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-3/4 mb-3" />
              <div className="flex justify-between items-center">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-4 w-4" />
              </div>
            </div>
          ))}
        </div>
        <BottomNav />
      </div>
    );
  }

  if (!deck || !cards) {
    return (
      <div className="max-w-md mx-auto bg-white shadow-2xl min-h-screen">
        <Header title="Deck Not Found" showBackButton onBackClick={handleBackClick} />
        <div className="p-6 text-center">
          <p className="text-gray-600">The requested deck could not be found.</p>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-2xl min-h-screen relative overflow-hidden">
      <Header 
        title={deck.title}
        subtitle={deck.subtitle}
        showBackButton
        onBackClick={handleBackClick}
        backgroundColor={deckColors[key as keyof typeof deckColors]}
      />

      <div className="p-4 pb-24">
        <div className="space-y-3">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className="cursor-pointer border-l-4 hover:shadow-lg transition-shadow peace-card-shadow"
                style={{ borderLeftColor: key === 'foundation' ? '#d0a07a' : 
                         key === 'listening' ? '#636566' : 
                         key === 'wounds' ? '#d4a47a' : 
                         key === 'owning' ? '#293765' : 
                         key === 'common' ? '#483c2e' : 
                         key === 'about' ? '#602929' : '#d0a07a' }}
                onClick={() => handleCardClick(card.id)}
              >
                <CardContent className="p-4">
                  <h4 className="font-medium text-amber-900 mb-2">{card.title}</h4>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">{card.preview}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{card.category}</span>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
