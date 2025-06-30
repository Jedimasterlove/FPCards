import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/header";
import { BottomNav } from "@/components/bottom-nav";
import { Card as CardType, CardDeck } from "@shared/schema";
import { ChevronLeft, ChevronRight, Bookmark, Share2, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import { deckColors } from "@/lib/deck-data";

export default function CardPage() {
  const { key, cardId } = useParams<{ key: string; cardId: string }>();
  const [, setLocation] = useLocation();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const { data: deck } = useQuery<CardDeck>({
    queryKey: [`/api/decks/${key}`],
  });

  const { data: cards } = useQuery<CardType[]>({
    queryKey: [`/api/decks/${key}/cards`],
  });

  const { data: currentCard, isLoading } = useQuery<CardType>({
    queryKey: [`/api/cards/${cardId}`],
  });

  useEffect(() => {
    if (cards && currentCard) {
      const index = cards.findIndex(card => card.id === currentCard.id);
      setCurrentCardIndex(index);
    }
  }, [cards, currentCard]);

  const handleBackClick = () => {
    setLocation(`/deck/${key}`);
  };

  const handlePrevCard = () => {
    if (cards && currentCardIndex > 0) {
      const prevCard = cards[currentCardIndex - 1];
      setLocation(`/deck/${key}/card/${prevCard.id}`);
    }
  };

  const handleNextCard = () => {
    if (cards && currentCardIndex < cards.length - 1) {
      const nextCard = cards[currentCardIndex + 1];
      setLocation(`/deck/${key}/card/${nextCard.id}`);
    }
  };

  const formatContent = (content: string) => {
    // Simple check: if content contains AEIOU sections, use accordion
    if (content.includes('🌟 **Affirmation**') && content.includes('👁️ **Eye Gazing**')) {
      return <AccordionCard content={content} />;
    }
    
    // Simple check: if content contains ATTUNE sections, use accordion
    if (content.includes('👂 **Attend**') && content.includes('🔄 **Turn Toward**')) {
      return <AccordionCard content={content} />;
    }
    
    // Simple check: if content contains ATTACHMENT WOUNDS sections, use accordion
    if (content.includes('🌑 **Loss**') && content.includes('🙈 **Neglect**')) {
      return <AccordionCard content={content} />;
    }
    
    // Simple check: if content contains 8 Core Needs sections, use accordion
    if (content.includes('🤗 **Acceptance**') && content.includes('💝 **Assurance**')) {
      return <AccordionCard content={content} />;
    }
    
    // Simple check: if content contains Shadows of Shame sections, use accordion
    if (content.includes('⚖️ **The Judge**') && content.includes('👑 **The Royal**')) {
      return <AccordionCard content={content} />;
    }
    
    // Simple check: if content contains BRPEs sections, use accordion
    if (content.includes('👆 **Blame**') && content.includes('🛟 **Rescue**')) {
      return <AccordionCard content={content} />;
    }
    
    // Empathic Listening cards
    if (content.includes('Observational Reflections') || 
        content.includes('Emotional Inquiry') ||
        content.includes('Empathic Understanding') ||
        content.includes('Reflective Listening')) {
      return <AccordionCard content={content} />;
    }
    
    // Wounds & Fears cards
    if (content.includes('📝 **What are the facts and the wound?**') || 
        content.includes('🫶 **"When I hear you share this, I feel..."**') ||
        content.includes('📝 **State the Facts**') ||
        content.includes('💔 **Their Attachment Wound**')) {
      return <AccordionCard content={content} />;
    }
    
    // Common Ground cards
    if (content.includes('🙏 **Apologize**') ||
        content.includes('💬 **Don\'t or Do Statements**') ||
        content.includes('🪞 **Practice Mindful Mirroring**') ||
        content.includes('💡 **Creating Safety Examples**') ||
        content.includes('⏰ **When to Use This Card**') ||
        content.includes('💝 **Remember**') ||
        content.includes('👁️ **See their suffering**') ||
        content.includes('✅ **Validate the pain**') ||
        content.includes('💥 **Acknowledge the impact**') ||
        content.includes('🩹 **Clarify what might help address the pain**') ||
        content.includes('💞 **Share how you feel about your actions**') ||
        content.includes('🎯 **Reflect: What is My Intended Outcome?**') ||
        content.includes('🌟 **What do I want for myself in this conversation?**') ||
        content.includes('💝 **What do I want for the other person?**') ||
        content.includes('🤝 **What do I want for the relationship as a whole?**') ||
        content.includes('🤝 **What Are We Already in Agreement About?**') ||
        content.includes('💭 **What Feelings Do We Have in Common?**') ||
        content.includes('✨ **What Is It That We Want to Experience?**') ||
        content.includes('💡 **How Many Strategies Can We Invent?**') ||
        content.includes('🎯 **Are We Clear on the Goal or Outcome?**') ||
        content.includes('🌟 **Final Reflection**') ||
        content.includes('😔 **I am feeling ___, and I am not sure how to...**') ||
        content.includes('😰 **I want to share something, but I am afraid...**')) {
      return <AccordionCard content={content} />;
    }

    // Owning My Part cards
    if (content.includes('🤝 **Ownership Statement**') ||
        content.includes('🎥 **Facts**') ||
        content.includes('🩹 **Wound & Core Belief**') ||
        content.includes('❤️ **Core Emotions**') ||
        content.includes('🕳️ **Shadows of Shame®**') ||
        content.includes('🧠 **Are the Core Beliefs and Messages from the Shadows 100% True?**') ||
        content.includes('🧭 **What is the best decision I can make to resolve the situation, aligned with my value system?**') ||
        content.includes('🔄 **BRPE Reminder**') ||
        content.includes('🧨 **What am I really angry about?**') ||
        content.includes('👑 **The Perfectionist**') ||
        content.includes('🔥 **What shadow was activated in me?**') ||
        content.includes('💡 **Are the messages from my shadows 100% true?**') ||
        content.includes('🎯 **What is the most loving choice I can make right now?**') ||
        content.includes('🛡️ **Boundaries**') ||
        content.includes('🧨 **What am I really angry about?**')) {
      return <AccordionCard content={content} />;
    }

    // Regular formatting for simple cards
    const normalizedContent = content.replace(/\\n/g, '\n');
    
    return normalizedContent.split('\n').map((paragraph, index) => {
      const trimmed = paragraph.trim();
      
      if (!trimmed) {
        return <div key={index} className="h-2" />; // Spacing for empty lines
      }
      
      // Handle full line headers (** at start and end)
      if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
        const headerText = trimmed.slice(2, -2);
        // Special styling for "Core Influences:" header
        if (headerText === 'Core Influences:') {
          return (
            <h3 key={index} className="font-bold text-amber-900 mt-4 mb-2 text-xl">
              {headerText}
            </h3>
          );
        }
        return (
          <h4 key={index} className="font-semibold text-amber-900 mt-4 mb-2 text-lg">
            {headerText}
          </h4>
        );
      } 
      // Handle inline bold text within paragraphs
      else if (trimmed.includes('**')) {
        const parts = trimmed.split('**');
        const formattedParts = parts.map((part, partIndex) => {
          if (partIndex % 2 === 1) {
            // Odd indices are the text between ** markers (should be bold)
            return <strong key={partIndex} className="font-semibold text-amber-900">{part}</strong>;
          }
          return part;
        });
        
        if (trimmed.startsWith('- ')) {
          const bulletContent = trimmed.slice(2); // Remove "- "
          const bulletParts = bulletContent.split('**');
          const formattedBulletParts = bulletParts.map((part, partIndex) => {
            if (partIndex % 2 === 1) {
              return <strong key={partIndex} className="font-semibold text-amber-900">{part}</strong>;
            }
            return part;
          });
          return (
            <div key={index} className="ml-4 mb-2">
              <span className="text-gray-700 leading-relaxed">
                {formattedBulletParts}
              </span>
            </div>
          );
        } else if (trimmed.startsWith('Example:')) {
          return (
            <div key={index} className="bg-amber-50 border-l-4 border-amber-200 p-3 my-3 rounded-r">
              <p className="text-amber-800 italic">
                {formattedParts}
              </p>
            </div>
          );
        } else {
          return (
            <p key={index} className="text-gray-700 leading-relaxed mb-2">
              {formattedParts}
            </p>
          );
        }
      }
      // Regular bullet points
      else if (trimmed.startsWith('- ')) {
        return (
          <div key={index} className="ml-4 mb-2">
            <span className="text-gray-700 leading-relaxed">
              {trimmed.slice(2)}
            </span>
          </div>
        );
      } 
      // Example styling
      else if (trimmed.startsWith('Example:')) {
        return (
          <div key={index} className="bg-amber-50 border-l-4 border-amber-200 p-3 my-3 rounded-r">
            <p className="text-amber-800 italic">
              {trimmed}
            </p>
          </div>
        );
      } 
      // Regular paragraphs
      else {
        return (
          <p key={index} className="text-gray-700 leading-relaxed mb-2">
            {trimmed}
          </p>
        );
      }
    });
  };

  // Universal Accordion Component for all cards with sections
  const AccordionCard = ({ content }: { content: string }) => {
    const [openSections, setOpenSections] = useState<Set<number>>(new Set());
    
    const toggleSection = (index: number) => {
      const newOpenSections = new Set(openSections);
      if (newOpenSections.has(index)) {
        newOpenSections.delete(index);
      } else {
        newOpenSections.add(index);
      }
      setOpenSections(newOpenSections);
    };

    // Parse content into sections
    const lines = content.split('\n');
    const sections: Array<{ title: string; content: string[] }> = [];
    let currentSection: { title: string; content: string[] } | null = null;
    let introContent: string[] = [];
    let inIntro = true;

    for (const line of lines) {
      const trimmed = line.trim();
      
      // Check for emoji section headers with ** formatting - escape unicode properly
      if (trimmed.match(/^[🌟👁️❓🤝👂💛🧘💞🌑🙈❌🚪💔⚠️🤗💝👀🗽🌱✨🛡️⭐⚖️👑🟫😔🔥👆🛟😤📊💡💭🤔💫🌊🫂🪞🎧🎵💬🧠🎯🤲🕊️📝🕰️🫶🧏😰😊🤢😮🧨💪🧭😡🎥🩹❤️🕳️🎭🌿🔄🌬️🔍☮️🙏📋📢📖🛑⏰🌬️⚖️🕊️✅💥💭✨😔😰] \*\*.*\*\*$/u) || 
          trimmed.includes('🌟 **') || 
          trimmed.includes('👁️ **') || 
          trimmed.includes('❓ **') || 
          trimmed.includes('🧩 **') || 
          trimmed.includes('🤝 **') ||
          trimmed.includes('👂 **') ||
          trimmed.includes('🔄 **') ||
          trimmed.includes('💛 **') ||
          trimmed.includes('🧘 **') ||
          trimmed.includes('💞 **') ||
          trimmed.includes('🌑 **') ||
          trimmed.includes('🙈 **') ||
          trimmed.includes('❌ **') ||
          trimmed.includes('🚪 **') ||
          trimmed.includes('💔 **') ||
          trimmed.includes('⚠️ **') ||
          trimmed.includes('🤗 **') ||
          trimmed.includes('💝 **') ||
          trimmed.includes('👀 **') ||
          trimmed.includes('🗽 **') ||
          trimmed.includes('🌱 **') ||
          trimmed.includes('✨ **') ||
          trimmed.includes('🛡️ **') ||
          trimmed.includes('⭐ **') ||
          trimmed.includes('⚖️ **') ||
          trimmed.includes('👑 **') ||
          trimmed.includes('🎭 **') ||
          trimmed.includes('👣 **') ||
          trimmed.includes('😔 **') ||
          trimmed.includes('🔥 **') ||
          trimmed.includes('👆 **') ||
          trimmed.includes('🛟 **') ||
          trimmed.includes('😤 **') ||
          trimmed.includes('🚪 **') ||
          trimmed.includes('🔍 **') ||
          trimmed.includes('📊 **') ||
          trimmed.includes('💡 **') ||
          trimmed.includes('💭 **') ||
          trimmed.includes('🤔 **') ||
          trimmed.includes('💫 **') ||
          trimmed.includes('🌊 **') ||
          trimmed.includes('💝 **') ||
          trimmed.includes('🫂 **') ||
          trimmed.includes('🌟 **') ||
          trimmed.includes('🪞 **') ||
          trimmed.includes('🎧 **') ||
          trimmed.includes('🔄 **') ||
          trimmed.includes('✨ **') ||
          trimmed.includes('🎵 **') ||
          trimmed.includes('🔁 **') ||
          trimmed.includes('💬 **') ||
          trimmed.includes('🧠 **') ||
          trimmed.includes('🎯 **') ||
          trimmed.includes('🤲 **') ||
          trimmed.includes('💝 **') ||
          trimmed.includes('🌊 **') ||
          trimmed.includes('🕊️ **') ||
          trimmed.includes('🤗 **') ||
          trimmed.includes('📝 **') ||
          trimmed.includes('🕰️ **') ||
          trimmed.includes('🫶 **') ||
          trimmed.includes('❤️ **') ||
          trimmed.includes('🧏 **') ||
          trimmed.includes('🤔 **') ||
          trimmed.includes('😰 **') ||
          trimmed.includes('🌱 **') ||
          trimmed.includes('🤝 **') ||
          trimmed.includes('🧩 **') ||
          trimmed.includes('😰 **') ||
          trimmed.includes('😊 **') ||
          trimmed.includes('🤢 **') ||
          trimmed.includes('😮 **') ||
          trimmed.includes('⚖️ **') ||
          trimmed.includes('🧨 **') ||
          trimmed.includes('👆 **') ||
          trimmed.includes('🛟 **') ||
          trimmed.includes('💪 **') ||
          trimmed.includes('🧭 **') ||
          trimmed.includes('😡 **') ||
          trimmed.includes('🎥 **') ||
          trimmed.includes('🩹 **') ||
          trimmed.includes('❤️ **') ||
          trimmed.includes('🕳️ **') ||
          trimmed.includes('🎭 **') ||
          trimmed.includes('🌿 **') ||
          trimmed.includes('💞 **') ||
          trimmed.includes('🔄 **') ||
          trimmed.includes('🌬️ **') ||
          trimmed.includes('🔍 **') ||
          trimmed.includes('☮️ **') ||
          trimmed.includes('🙏 **') ||
          trimmed.includes('🧩 **') ||
          trimmed.includes('📋 **') ||
          trimmed.includes('📢 **') ||
          trimmed.includes('🛟 **') ||
          trimmed.includes('🤔 **') ||
          trimmed.includes('💪 **') ||
          trimmed.includes('🪞 **') ||
          trimmed.includes('👀 **') ||
          trimmed.includes('📖 **') ||
          trimmed.includes('🛑 **') ||
          trimmed.includes('⏰ **') ||
          trimmed.includes('💔 **') ||
          trimmed.includes('🌬️ **') ||
          trimmed.includes('🌱 **') ||
          trimmed.includes('⚖️ **') ||
          trimmed.includes('🕊️ **') ||
          trimmed.includes('✅ **') ||
          trimmed.includes('💥 **') ||
          trimmed.includes('💭 **') ||
          trimmed.includes('✨ **') ||
          trimmed.includes('📋 **') ||
          trimmed.includes('😔 **') ||
          trimmed.includes('😰 **')) {

        inIntro = false;
        if (currentSection) {
          sections.push(currentSection);
        }
        currentSection = {
          title: trimmed,
          content: []
        };
      } else if (currentSection) {
        currentSection.content.push(line);
      } else if (inIntro) {
        introContent.push(line);
      }
    }
    
    if (currentSection) {
      sections.push(currentSection);
    }



    const formatSectionContent = (contentLines: string[]) => {
      return contentLines.map((line, index) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={index} className="h-2" />;
        
        if (trimmed.includes('**') || trimmed.includes('<a href=')) {
          const parts = trimmed.split('**');
          const formattedParts = parts.map((part, partIndex) => {
            if (partIndex % 2 === 1) {
              return <strong key={partIndex} className="font-semibold text-amber-900">{part}</strong>;
            }
            return part;
          });
          return (
            <p key={index} className="text-gray-700 leading-relaxed mb-3" dangerouslySetInnerHTML={{__html: formattedParts.join('')}}>
            </p>
          );
        }
        
        return (
          <p key={index} className="text-gray-700 leading-relaxed mb-3" dangerouslySetInnerHTML={{__html: trimmed}}>
          </p>
        );
      });
    };

    return (
      <div>
        {/* Intro content */}
        <div className="mb-6">
          {introContent.map((line, index) => {
            const trimmed = line.trim();
            if (!trimmed) return <div key={index} className="h-2" />;
            return (
              <p key={index} className="text-gray-700 leading-relaxed mb-3" dangerouslySetInnerHTML={{__html: trimmed}}>
              </p>
            );
          })}
        </div>

        {/* Accordion sections */}
        <div className="space-y-3">
          {sections.map((section, index) => {
            const isOpen = openSections.has(index);
            const title = section.title.replace(/\*\*/g, '').trim();
            
            return (
              <div key={index} className="border border-amber-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection(index)}
                  className="w-full flex items-center justify-between p-4 bg-amber-50 hover:bg-amber-100 transition-colors duration-200"
                >
                  <span className="font-semibold text-amber-900 text-left">
                    {title}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-amber-600" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-amber-600" />
                  )}
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 bg-white">
                        {formatSectionContent(section.content)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto bg-white shadow-2xl min-h-screen">
        <div className="p-4 flex items-center text-white" style={{ background: deckColors[key as keyof typeof deckColors] || 'linear-gradient(135deg, #A0522D 0%, #8B4513 100%)' }}>
          <Skeleton className="h-8 w-8 mr-4 bg-white/20" />
          <div className="flex-1">
            <Skeleton className="h-4 w-24 mb-1 bg-white/20" />
            <Skeleton className="h-3 w-16 bg-white/20" />
          </div>
          <div className="flex space-x-2">
            <Skeleton className="h-8 w-8 bg-white/20" />
            <Skeleton className="h-8 w-8 bg-white/20" />
          </div>
        </div>
        <div className="p-6 pb-24">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <Skeleton className="h-6 w-3/4 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3 mb-4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  if (!currentCard || !deck) {
    return (
      <div className="max-w-md mx-auto bg-white shadow-2xl min-h-screen">
        <Header title="Card Not Found" showBackButton onBackClick={handleBackClick} backgroundColor={deckColors[key as keyof typeof deckColors]} />
        <div className="p-6 text-center">
          <p className="text-gray-600">The requested card could not be found.</p>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-2xl min-h-screen relative overflow-hidden">
      <Header 
        title={deck.title}
        subtitle={`Card ${currentCardIndex + 1} of ${cards?.length || 0}`}
        showBackButton
        onBackClick={handleBackClick}
        backgroundColor={deckColors[key as keyof typeof deckColors]}
      >
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-white/20 text-white"
            onClick={handlePrevCard}
            disabled={currentCardIndex === 0}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-white/20 text-white"
            onClick={handleNextCard}
            disabled={!cards || currentCardIndex === cards.length - 1}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </Header>

      <motion.div 
        className="p-6 pb-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="peace-card-shadow border-0 mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-amber-900 mb-4">
              {currentCard.title}
            </h2>
            <div className="prose prose-gray max-w-none">
              {formatContent(currentCard.content)}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-medium">
            <Bookmark className="mr-2 h-4 w-4" />
            Save for Later
          </Button>
          <Button 
            variant="outline"
            className="w-full border-amber-200 text-amber-900 hover:bg-amber-50 py-3 rounded-lg font-medium"
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share This Card
          </Button>
        </div>
      </motion.div>

      <BottomNav />
    </div>
  );
}
