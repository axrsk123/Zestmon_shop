import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trophy, Sparkles, Brain, Target, Zap } from "lucide-react";
import RunnerGame from "./RunnerGame";
import WheelGame from "./WheelGame";
import MemoryGame from "./MemoryGame";
import CatchGame from "./CatchGame";
import PokemonGame from "./PokemonGame";
import Leaderboard from "../Leaderboard";

interface GameHubProps {
  isOpen: boolean;
  onClose: () => void;
}

type GameType = "menu" | "runner" | "wheel" | "memory" | "catch" | "pokemon" | "leaderboard";

const GameHub = ({ isOpen, onClose }: GameHubProps) => {
  const [currentGame, setCurrentGame] = useState<GameType>("menu");

  const games = [
    { id: "runner" as const, name: "Zestmon Runner", description: "Jump over obstacles!", icon: Target, color: "bg-blue-500" },
    { id: "wheel" as const, name: "Prize Wheel", description: "Spin to win!", icon: Sparkles, color: "bg-purple-500" },
    { id: "memory" as const, name: "Flavor Match", description: "Match the pairs!", icon: Brain, color: "bg-green-500" },
    { id: "catch" as const, name: "Lemon Catch", description: "Catch falling items!", icon: Target, color: "bg-yellow-500" },
    { id: "pokemon" as const, name: "Zestmon Battle", description: "Battle wild Zestmons!", icon: Zap, color: "bg-red-500" },
  ];

  const handleBack = () => {
    setCurrentGame("menu");
  };

  const handleClose = () => {
    setCurrentGame("menu");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="h-6 w-6" />
            Zestmon Game Arcade
          </DialogTitle>
          <DialogDescription>Play mini-games and compete for high scores!</DialogDescription>
        </DialogHeader>

      {currentGame === "runner" && <RunnerGame isOpen={true} onClose={handleClose} onBack={handleBack} />}
      {currentGame === "wheel" && <WheelGame isOpen={true} onClose={handleClose} onBack={handleBack} />}
      {currentGame === "memory" && <MemoryGame isOpen={true} onClose={handleClose} onBack={handleBack} />}
      {currentGame === "catch" && <CatchGame isOpen={true} onClose={handleClose} onBack={handleBack} />}
      {currentGame === "pokemon" && <PokemonGame isOpen={true} onClose={handleClose} onBack={handleBack} />}

        {currentGame === "menu" && (
          <div className="space-y-6">
            <p className="text-center text-muted-foreground">
              Choose your game and start playing!
            </p>
            <div className="grid grid-cols-2 gap-4">
              {games.map((game) => {
                const Icon = game.icon;
                return (
                  <Button
                    key={game.id}
                    variant="outline"
                    className="h-auto flex-col gap-3 p-6 hover:scale-105 transition-transform"
                    onClick={() => setCurrentGame(game.id)}
                  >
                    <div className={`${game.color} w-16 h-16 rounded-full flex items-center justify-center`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-lg">{game.name}</div>
                      <div className="text-sm text-muted-foreground">{game.description}</div>
                    </div>
                  </Button>
                );
              })}
            </div>

            <div className="pt-4 border-t">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setCurrentGame("leaderboard")}
              >
                <Trophy className="h-4 w-4 mr-2" />
                View Leaderboard
              </Button>
            </div>
          </div>
        )}

        {currentGame === "leaderboard" && (
          <div className="space-y-4">
            <Leaderboard />
            <Button onClick={handleBack} variant="outline" className="w-full">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Menu
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GameHub;