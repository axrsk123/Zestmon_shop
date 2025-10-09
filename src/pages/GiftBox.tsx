import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Gift } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const gifts = [
  { emoji: "🎁", name: "Mystery Box", description: "What could it be?" },
  { emoji: "🍋", name: "Golden Lemon", description: "Worth 1000 points!" },
  { emoji: "🏆", name: "Trophy", description: "You're a champion!" },
  { emoji: "⭐", name: "Lucky Star", description: "Make a wish!" },
  { emoji: "💎", name: "Diamond", description: "Rare and precious!" },
  { emoji: "🎮", name: "Power-Up", description: "Level up your gaming!" },
  { emoji: "🌈", name: "Rainbow", description: "Pure magic!" },
  { emoji: "🎪", name: "Circus Ticket", description: "Fun times ahead!" },
];

const GiftBox = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [openedGifts, setOpenedGifts] = useState<string[]>([]);

  const openGift = (gift: typeof gifts[0]) => {
    if (openedGifts.includes(gift.name)) return;
    
    setOpenedGifts(prev => [...prev, gift.name]);
    toast({
      title: `You received: ${gift.name}!`,
      description: gift.description,
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 dark:from-pink-900 dark:via-purple-900 dark:to-blue-900 p-4">
      <div className="container mx-auto min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-4xl">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl mb-2">🎁 Gift Box Room</CardTitle>
            <CardDescription className="text-lg">
              Open all the gifts to collect amazing rewards!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {gifts.map((gift) => (
                <button
                  key={gift.name}
                  onClick={() => openGift(gift)}
                  disabled={openedGifts.includes(gift.name)}
                  className={`p-6 rounded-lg border-2 transition-all hover:scale-105 ${
                    openedGifts.includes(gift.name)
                      ? 'bg-muted opacity-50'
                      : 'bg-background hover:bg-accent border-primary'
                  }`}
                >
                  <div className="text-5xl mb-2">{gift.emoji}</div>
                  <div className="text-sm font-medium">{gift.name}</div>
                </button>
              ))}
            </div>

            <div className="text-center">
              <p className="text-lg font-semibold">
                Gifts Opened: {openedGifts.length} / {gifts.length}
              </p>
              {openedGifts.length === gifts.length && (
                <p className="text-2xl mt-2 animate-bounce">
                  🎉 You opened all gifts! 🎉
                </p>
              )}
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => setOpenedGifts([])}
                variant="outline"
                className="flex-1"
              >
                <Gift className="mr-2" />
                Reset Gifts
              </Button>
              <Button
                onClick={() => navigate("/")}
                variant="default"
                className="flex-1"
              >
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GiftBox;
