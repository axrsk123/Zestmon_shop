import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MemoryGameProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
}

interface Card {
  id: number;
  flavor: string;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryGame = ({ isOpen, onClose, onBack }: MemoryGameProps) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const { toast } = useToast();

  const flavors = [
    { name: "Classic", emoji: "🍋" },
    { name: "Strawberry", emoji: "🍓" },
    { name: "Blueberry", emoji: "🫐" },
    { name: "Peach", emoji: "🍑" },
    { name: "Watermelon", emoji: "🍉" },
    { name: "Mango", emoji: "🥭" },
  ];

  const initializeGame = () => {
    const gameCards: Card[] = [];
    flavors.forEach((flavor, index) => {
      gameCards.push(
        {
          id: index * 2,
          flavor: flavor.name,
          emoji: flavor.emoji,
          isFlipped: false,
          isMatched: false,
        },
        {
          id: index * 2 + 1,
          flavor: flavor.name,
          emoji: flavor.emoji,
          isFlipped: false,
          isMatched: false,
        }
      );
    });
    
    setCards(gameCards.sort(() => Math.random() - 0.5));
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
  };

  useEffect(() => {
    if (isOpen) {
      initializeGame();
    }
  }, [isOpen]);

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2) return;
    if (flippedCards.includes(cardId)) return;
    if (cards.find((c) => c.id === cardId)?.isMatched) return;

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);

    setCards((prev) =>
      prev.map((card) =>
        card.id === cardId ? { ...card, isFlipped: true } : card
      )
    );

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [first, second] = newFlipped;
      const firstCard = cards.find((c) => c.id === first);
      const secondCard = cards.find((c) => c.id === second);

      if (firstCard?.flavor === secondCard?.flavor) {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === first || card.id === second
                ? { ...card, isMatched: true }
                : card
            )
          );
          setMatches((m) => m + 1);
          setFlippedCards([]);
          
          if (matches + 1 === flavors.length) {
            toast({
              title: "🎉 You Won!",
              description: `Completed in ${moves + 1} moves!`,
            });
          }
        }, 500);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === first || card.id === second
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Flavor Match - Moves: {moves}
          </DialogTitle>
          <DialogDescription>Match all the flavor pairs to win!</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 gap-3">
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`aspect-square rounded-lg text-4xl flex items-center justify-center transition-all transform hover:scale-105 ${
                  card.isFlipped || card.isMatched
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
                disabled={card.isMatched}
              >
                {card.isFlipped || card.isMatched ? card.emoji : "?"}
              </button>
            ))}
          </div>

          <div className="text-center text-muted-foreground">
            Matches: {matches} / {flavors.length}
          </div>

          <div className="flex justify-center gap-4">
            <Button onClick={onBack} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Menu
            </Button>
            <Button onClick={initializeGame} variant="outline">
              New Game
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MemoryGame;