import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Trophy, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TreasureRoom = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [coins, setCoins] = useState(0);

  const collectTreasure = () => {
    const amount = Math.floor(Math.random() * 100) + 10;
    setCoins(prev => prev + amount);
    toast({
      title: "Treasure Collected!",
      description: `You found ${amount} lemon coins! 🍋`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-yellow-100 to-amber-200 dark:from-yellow-900 dark:via-yellow-800 dark:to-amber-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl mb-2">💰 Treasure Room</CardTitle>
          <CardDescription className="text-lg">
            Click the chest to collect lemon coins!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-6xl mb-4 cursor-pointer hover:scale-110 transition-transform" onClick={collectTreasure}>
              🎁
            </div>
            <div className="text-3xl font-bold text-primary mb-2">{coins} 🍋</div>
            <p className="text-muted-foreground">Lemon Coins Collected</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Button onClick={collectTreasure} variant="hero" className="h-16">
              <Trophy className="mr-2" />
              Collect Treasure
            </Button>
            <Button onClick={() => setCoins(0)} variant="outline" className="h-16">
              <Sparkles className="mr-2" />
              Reset Coins
            </Button>
          </div>

          <Button onClick={() => navigate("/")} className="w-full" variant="ghost">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TreasureRoom;
