import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trophy, Sparkles, Brain, Target, Zap, Keyboard, MousePointer, Gamepad } from "lucide-react";
import RunnerGame from "./RunnerGame";
import WheelGame from "./WheelGame";
import MemoryGame from "./MemoryGame";
import CatchGame from "./CatchGame";
import PokemonGame from "./PokemonGame";
import QuizGame from "./QuizGame";
import TypingGame from "./TypingGame";
import ClickerGame from "./ClickerGame";
import SimonGame from "./SimonGame";
import Leaderboard from "../Leaderboard";

interface GameHubProps {
  isOpen: boolean;
  onClose: () => void;
}

type GameType = "menu" | "runner" | "wheel" | "memory" | "catch" | "pokemon" | "quiz" | "typing" | "clicker" | "simon" | "leaderboard";

const GameHub = ({ isOpen, onClose }: GameHubProps) => {
  const [currentGame, setCurrentGame] = useState<GameType>("menu");

  const games = [
    { id: "runner" as const, name: "Zestmon Runner", description: "Jump over obstacles!", icon: Target, color: "bg-blue-500" },
    { id: "catch" as const, name: "Lemon Catch", description: "Catch falling items!", icon: Target, color: "bg-yellow-500" },
    { id: "pokemon" as const, name: "Zestmon Battle", description: "Turn-based battles!", icon: Zap, color: "bg-red-500" },
    { id: "memory" as const, name: "Flavor Match", description: "Match the pairs!", icon: Brain, color: "bg-green-500" },
    { id: "wheel" as const, name: "Prize Wheel", description: "Spin to win!", icon: Sparkles, color: "bg-purple-500" },
    { id: "quiz" as const, name: "Lemon Quiz", description: "Test your knowledge!", icon: Brain, color: "bg-orange-500" },
    { id: "typing" as const, name: "Speed Typer", description: "Type fast to win!", icon: Keyboard, color: "bg-cyan-500" },
    { id: "clicker" as const, name: "Lemon Clicker", description: "Build your empire!", icon: MousePointer, color: "bg-pink-500" },
    { id: "simon" as const, name: "Simon Says", description: "Remember the pattern!", icon: Gamepad, color: "bg-indigo-500" },
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
      {currentGame === "quiz" && <QuizGame isOpen={true} onClose={handleClose} onBack={handleBack} />}
      {currentGame === "typing" && <TypingGame isOpen={true} onClose={handleClose} onBack={handleBack} />}
      {currentGame === "clicker" && <ClickerGame isOpen={true} onClose={handleClose} onBack={handleBack} />}
      {currentGame === "simon" && <SimonGame isOpen={true} onClose={handleClose} onBack={handleBack} />}

        {currentGame === "menu" && (
          <div className="space-y-6">
            <p className="text-center text-muted-foreground">
              Choose your game and start playing!
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {games.map((game) => {
                const Icon = game.icon;
                return (
                  <Button
                    key={game.id}
                    variant="outline"
                    className="h-auto flex-col gap-2 sm:gap-3 p-3 sm:p-6 hover:scale-105 transition-transform"
                    onClick={() => setCurrentGame(game.id)}
                  >
                    <div className={`${game.color} w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center`}>
                      <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-sm sm:text-base">{game.name}</div>
                      <div className="text-xs sm:text-sm text-muted-foreground hidden sm:block">{game.description}</div>
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