import { useQuery } from "@tanstack/react-query";
import { CardDeck } from "@shared/schema";
import { useLocation } from "wouter";
import logoImage from "@assets/Finding Peace Logo (2)_1750730115689.png";

// Import all deck images
import foundationImage from "@assets/Foundations_1750725175753.png";
import listeningImage from "@assets/Listen_1750725175753.png";
import woundsImage from "@assets/Wounds_1750725175754.png";
import owningImage from "@assets/Owning_1750725175754.png";
import commonImage from "@assets/Common_1750725175752.png";
import aboutImage from "@assets/About_1750725175750.png";

const deckImages: Record<string, string> = {
  foundation: foundationImage,
  listening: listeningImage,
  wounds: woundsImage,
  owning: owningImage,
  common: commonImage,
  about: aboutImage,
};

export default function Dashboard() {
  const [, setLocation] = useLocation();
  
  const { data: decks, isLoading } = useQuery<CardDeck[]>({
    queryKey: ["/api/decks"],
  });

  const handleDeckClick = (deckKey: string) => {
    setLocation(`/deck/${deckKey}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-800">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center text-white">Loading decks...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800">
      {/* Main Content Card - Full Height */}
      <div className="max-w-5xl mx-auto px-6 md:px-8 pt-8">
        <div className="rounded-3xl p-8 md:p-12 shadow-2xl min-h-[calc(100vh-4rem)]" style={{background: '#333333'}}>
          {/* Logo and Title Section */}
          <div className="text-center mb-12">
            <img 
              src={logoImage} 
              alt="Finding Peace - Relationship Building Platform" 
              className="mx-auto mb-8 h-20 md:h-24"
            />
            <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{color: '#f0dfc8'}}>
              Conversation Card Decks
            </h1>
            
            {/* How to Use These Cards Section */}
            <div className="rounded-2xl p-6 mx-4 mb-8 text-left max-w-4xl mx-auto" style={{backgroundColor: '#f0dfc8'}}>
              <h2 className="text-xl font-semibold text-amber-900 mb-3 text-center">How to Use These Cards</h2>
              <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                These cards are designed to help you build healthier, more connected, and emotionally honest relationships. 
                Each card focuses on a specific relational skill, communication tool, or emotional awareness prompt. 
                You can use them individually, with a partner, in therapy, or in group work.
              </p>
              
              <div className="mb-4">
                <h3 className="text-amber-800 font-medium mb-3 flex items-center">
                  <span className="mr-2">🛠️</span>
                  Ways to Use the Cards:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
                  <div className="bg-white/60 rounded-lg p-3">
                    <span className="font-medium text-amber-800">Before a conversation</span>
                    <p className="text-xs mt-1">Use a card to set an intention, clarify what you want, or ground yourself in empathy and presence.</p>
                  </div>
                  <div className="bg-white/60 rounded-lg p-3">
                    <span className="font-medium text-amber-800">During a conversation</span>
                    <p className="text-xs mt-1">Pull a card to guide you in expressing your thoughts, listening with curiosity, or repairing a rupture.</p>
                  </div>
                  <div className="bg-white/60 rounded-lg p-3">
                    <span className="font-medium text-amber-800">After a conflict or trigger</span>
                    <p className="text-xs mt-1">Reflect using a card to better understand your emotional reaction, attachment wound, or the message from your "Shadow."</p>
                  </div>
                  <div className="bg-white/60 rounded-lg p-3">
                    <span className="font-medium text-amber-800">In regular check-ins</span>
                    <p className="text-xs mt-1">Choose 1–3 cards as prompts for weekly couples check-ins or personal growth journaling.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/60 rounded-lg p-3">
                <h3 className="text-amber-800 font-medium mb-2 flex items-center">
                  <span className="mr-2">🌀</span>
                  The Goal:
                </h3>
                <p className="text-gray-700 text-xs leading-relaxed">
                  Not to be perfect—but to build awareness, compassion, and connection one interaction at a time. 
                  Use the cards as a compass to move out of reactivity and into intentional, healing dialogue.
                </p>
              </div>
            </div>
            
            <p className="text-lg" style={{color: '#e3c3ab'}}>
              Choose a deck to begin your journey toward deeper connection
            </p>
          </div>

          {/* Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
            {decks?.map((deck) => (
              <div 
                key={deck.key}
                onClick={() => handleDeckClick(deck.key)}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105"
              >
                <div className="aspect-[3/4] bg-gray-100 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                  <img 
                    src={deckImages[deck.key]} 
                    alt={deck.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="font-bold text-gray-800 text-center mb-2">
                  {deck.title}
                </h3>
                <p className="text-gray-600 text-sm text-center leading-relaxed">
                  {deck.subtitle}
                </p>
              </div>
            ))}
          </div>

          {/* All Decks Button */}
          <div className="text-center">
            <button className="text-white px-8 py-3 rounded-xl font-semibold transition-colors duration-200" style={{backgroundColor: '#a48262'}} onMouseOver={(e) => e.target.style.backgroundColor = '#8d6f4f'} onMouseOut={(e) => e.target.style.backgroundColor = '#a48262'}>
              All Decks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
