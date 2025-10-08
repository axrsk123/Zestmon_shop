import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Trophy, ArrowLeft } from "lucide-react";

interface SimonGameProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onGameEnd?: (score: number) => void;
}

const SimonGame = ({ isOpen, onClose, onBack, onGameEnd }: SimonGameProps) => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameState, setGameState] = useState<"ready" | "showing" | "playing" | "gameover">("ready");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [activeButton, setActiveButton] = useState<number | null>(null);

  const colors = [
    { id: 0, color: "bg-red-500", emoji: "🍓", sound: "C" },
    { id: 1, color: "bg-blue-500", emoji: "🫐", sound: "E" },
    { id: 2, color: "bg-green-500", emoji: "🍋", sound: "G" },
    { id: 3, color: "bg-yellow-500", emoji: "🍌", sound: "A" },
  ];

  useEffect(() => {
    const saved = localStorage.getItem("simon-highscore");
    if (saved) setHighScore(parseInt(saved));
  }, []);

  const startGame = () => {
    const firstColor = Math.floor(Math.random() * 4);
    setSequence([firstColor]);
    setPlayerSequence([]);
    setScore(0);
    setGameState("showing");
    setTimeout(() => showSequence([firstColor]), 500);
  };

  const showSequence = (seq: number[]) => {
    let index = 0;
    setIsPlaying(true);

    const interval = setInterval(() => {
      if (index < seq.length) {
        setActiveButton(seq[index]);
        setTimeout(() => setActiveButton(null), 400);
        index++;
      } else {
        clearInterval(interval);
        setIsPlaying(false);
        setGameState("playing");
      }
    }, 600);
  };

  const handleColorClick = (colorId: number) => {
    if (gameState !== "playing" || isPlaying) return;

    const newPlayerSequence = [...playerSequence, colorId];
    setPlayerSequence(newPlayerSequence);

    setActiveButton(colorId);
    setTimeout(() => setActiveButton(null), 200);

    if (newPlayerSequence[newPlayerSequence.length - 1] !== sequence[newPlayerSequence.length - 1]) {
      setGameState("gameover");
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem("simon-highscore", score.toString());
        onGameEnd?.(score);
      }
      return;
    }

    if (newPlayerSequence.length === sequence.length) {
      const newScore = score + 1;
      setScore(newScore);
      setPlayerSequence([]);
      
      setTimeout(() => {
        const nextColor = Math.floor(Math.random() * 4);
        const newSequence = [...sequence, nextColor];
        setSequence(newSequence);
        setGameState("showing");
        setTimeout(() => showSequence(newSequence), 500);
      }, 1000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="text-sm text-muted-foreground">High Score: {highScore}</div>
        <div className="text-4xl font-bold text-primary">Level {score + 1}</div>
      </div>

      {gameState === "ready" && (
        <div className="space-y-6 text-center py-8">
          <div className="text-6xl">🎮</div>
          <h3 className="text-2xl font-bold">Simon Says: Lemon Edition</h3>
          <p className="text-muted-foreground px-4">
            Watch the pattern and repeat it!<br />
            Each level adds one more step.
          </p>
          <Button onClick={startGame} size="lg">Start Game</Button>
        </div>
      )}

      {(gameState === "showing" || gameState === "playing") && (
        <div className="space-y-6">
          <div className="text-center text-sm text-muted-foreground">
            {gameState === "showing" ? "Watch carefully..." : "Your turn!"}
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            {colors.map((color) => (
              <Button
                key={color.id}
                onClick={() => handleColorClick(color.id)}
                disabled={gameState !== "playing" || isPlaying}
                className={`h-24 sm:h-32 text-4xl sm:text-6xl ${color.color} hover:opacity-80 transition-all ${
                  activeButton === color.id ? "scale-95 brightness-150" : ""
                }`}
              >
                {color.emoji}
              </Button>
            ))}
          </div>

          <div className="text-center">
            <div className="text-sm text-muted-foreground">
              Pattern length: {sequence.length}
            </div>
          </div>
        </div>
      )}

      {gameState === "gameover" && (
        <div className="space-y-6 text-center py-8">
          <div className="text-6xl">💔</div>
          <h3 className="text-2xl font-bold">Game Over!</h3>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-primary">Level {score}</p>
            <p className="text-muted-foreground">
              You remembered {score} {score === 1 ? "pattern" : "patterns"}!
            </p>
          </div>
          <div className="flex gap-4 justify-center">
            <Button onClick={startGame}>Play Again</Button>
            <Button onClick={onBack} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Menu
            </Button>
          </div>
        </div>
      )}

      {gameState === "ready" && (
        <Button onClick={onBack} variant="outline" className="w-full">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Menu
        </Button>
      )}
    </div>
  );
};

export default SimonGame;
