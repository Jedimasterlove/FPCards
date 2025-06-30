import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card as CardType, CardDeck } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function AdminPage() {
  const [selectedDeck, setSelectedDeck] = useState<string>("");
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const [editingCard, setEditingCard] = useState({
    title: "",
    content: "",
    category: "",
    preview: ""
  });
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: decks } = useQuery<CardDeck[]>({
    queryKey: ["/api/decks"],
  });

  const { data: cards } = useQuery<CardType[]>({
    queryKey: [`/api/decks/${selectedDeck}/cards`],
    enabled: !!selectedDeck,
  });

  const updateCardMutation = useMutation({
    mutationFn: async (updatedCard: Partial<CardType>) => {
      return apiRequest(`/api/cards/${selectedCard?.id}`, {
        method: "PUT",
        body: JSON.stringify(updatedCard),
        headers: { "Content-Type": "application/json" }
      });
    },
    onSuccess: () => {
      toast({ title: "Card updated successfully!" });
      queryClient.invalidateQueries({ queryKey: [`/api/decks/${selectedDeck}/cards`] });
      queryClient.invalidateQueries({ queryKey: [`/api/cards/${selectedCard?.id}`] });
    },
    onError: () => {
      toast({ title: "Failed to update card", variant: "destructive" });
    }
  });

  useEffect(() => {
    if (selectedCard) {
      setEditingCard({
        title: selectedCard.title,
        content: selectedCard.content,
        category: selectedCard.category,
        preview: selectedCard.preview
      });
    }
  }, [selectedCard]);

  const handleSave = () => {
    if (!selectedCard) return;
    updateCardMutation.mutate(editingCard);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Card Content Manager</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select Card to Edit</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="deck-select">Deck</Label>
              <Select value={selectedDeck} onValueChange={setSelectedDeck}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a deck" />
                </SelectTrigger>
                <SelectContent>
                  {decks?.map((deck) => (
                    <SelectItem key={deck.key} value={deck.key}>
                      {deck.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {cards && (
              <div>
                <Label>Cards in Deck</Label>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {cards.map((card) => (
                    <button
                      key={card.id}
                      onClick={() => setSelectedCard(card)}
                      className={`w-full text-left p-3 rounded border transition-colors ${
                        selectedCard?.id === card.id
                          ? "bg-amber-50 border-amber-200"
                          : "hover:bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="font-medium">{card.title}</div>
                      <div className="text-sm text-gray-500 truncate">
                        {card.preview}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Card Editor */}
        {selectedCard && (
          <Card>
            <CardHeader>
              <CardTitle>Edit Card: {selectedCard.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={editingCard.title}
                  onChange={(e) => setEditingCard(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={editingCard.category}
                  onChange={(e) => setEditingCard(prev => ({ ...prev, category: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="preview">Preview</Label>
                <Input
                  id="preview"
                  value={editingCard.preview}
                  onChange={(e) => setEditingCard(prev => ({ ...prev, preview: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={editingCard.content}
                  onChange={(e) => setEditingCard(prev => ({ ...prev, content: e.target.value }))}
                  rows={15}
                  className="font-mono text-sm"
                />
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={handleSave}
                  disabled={updateCardMutation.isPending}
                >
                  {updateCardMutation.isPending ? "Saving..." : "Save Changes"}
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setSelectedCard(null)}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Instructions */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Formatting Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm space-y-2">
            <p><strong>Bold text:</strong> Use **text** to make text bold</p>
            <p><strong>Sections:</strong> Use emoji + **Section Title** for accordion sections</p>
            <p><strong>Line breaks:</strong> Use actual line breaks (Enter key) for paragraphs</p>
            <p><strong>Examples:</strong> Lines starting with "Example:" get special styling</p>
            <p><strong>Bullet points:</strong> Use "- " at the start of a line</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}