import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Gamepad2, Trophy, Sparkles, Brain, Target } from "lucide-react";
import RunnerGame from "./RunnerGame";
import WheelGame from "./WheelGame";
import MemoryGame from "./MemoryGame";
import CatchGame from "./CatchGame";

interface GameHubProps {
  isOpen: boolean;
  onClose: () => void;
}

type GameType = "menu" | "runner" | "wheel" | "memory" | "catch";

const GameHub = ({ isOpen, onClose }: GameHubProps) => {
  const [currentGame, setCurrentGame] = useState<GameType>("menu");

  const games = [
    {
      id: "runner" as GameType,
      name: "Zestmon Runner",
      description: "Jump over obstacles and score points!",
      icon: Gamepad2,
      color: "from-primary to-accent",
    },
    {
      id: "wheel" as GameType,
      name: "Prize Wheel",
      description: "Spin the wheel and win prizes!",
      icon: Sparkles,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "memory" as GameType,
      name: "Flavor Match",
      description: "Match the lemonade flavors!",
      icon: Brain,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "catch" as GameType,
      name: "Lemon Catch",
      description: "Catch falling lemons!",
      icon: Target,
      color: "from-yellow-500 to-orange-500",
    },
  ];

  const handleBack = () => {
    setCurrentGame("menu");
  };

  const handleClose = () => {
    setCurrentGame("menu");
    onClose();
  };

  if (currentGame === "runner") {
    return <RunnerGame isOpen={isOpen} onClose={handleClose} onBack={handleBack} />;
  }

  if (currentGame === "wheel") {
    return <WheelGame isOpen={isOpen} onClose={handleClose} onBack={handleBack} />;
  }

  if (currentGame === "memory") {
    return <MemoryGame isOpen={isOpen} onClose={handleClose} onBack={handleBack} />;
  }

  if (currentGame === "catch") {
    return <CatchGame isOpen={isOpen} onClose={handleClose} onBack={handleBack} />;
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Zestmon Game Arcade
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          {games.map((game) => {
            const Icon = game.icon;
            return (
              <Button
                key={game.id}
                onClick={() => setCurrentGame(game.id)}
                className={`h-auto flex-col items-start p-6 bg-gradient-to-br ${game.color} text-white hover:scale-105 transition-transform`}
              >
                <Icon className="h-8 w-8 mb-2" />
                <h3 className="font-bold text-lg mb-1">{game.name}</h3>
                <p className="text-sm opacity-90 text-left">{game.description}</p>
              </Button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GameHub;