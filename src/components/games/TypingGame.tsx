import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Trophy, ArrowLeft } from "lucide-react";

interface TypingGameProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onGameEnd?: (score: number) => void;
}

const TypingGame = ({ isOpen, onClose, onBack, onGameEnd }: TypingGameProps) => {
  const [currentWord, setCurrentWord] = useState("");
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameState, setGameState] = useState<"ready" | "playing" | "finished">("ready");
  const [wordsTyped, setWordsTyped] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const words = [
    "lemon", "fresh", "zesty", "citrus", "juice", "sweet", "tangy", "drink",
    "summer", "refresh", "squeeze", "organic", "natural", "healthy", "vitamin",
    "tasty", "delicious", "cold", "ice", "flavor", "craft", "homemade"
  ];

  useEffect(() => {
    const saved = localStorage.getItem("typing-highscore");
    if (saved) setHighScore(parseInt(saved));
  }, []);

  useEffect(() => {
    if (gameState === "playing") {
      inputRef.current?.focus();
    }
  }, [gameState, currentWord]);

  useEffect(() => {
    if (gameState !== "playing") return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  const startGame = () => {
    setGameState("playing");
    setScore(0);
    setWordsTyped(0);
    setTimeLeft(30);
    setInput("");
    setCurrentWord(words[Math.floor(Math.random() * words.length)]);
  };

  const endGame = () => {
    setGameState("finished");
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("typing-highscore", score.toString());
      onGameEnd?.(score);
    }
  };

  const handleInputChange = (value: string) => {
    setInput(value);

    if (value === currentWord) {
      const points = currentWord.length * 10;
      setScore(score + points);
      setWordsTyped(wordsTyped + 1);
      setInput("");
      setCurrentWord(words[Math.floor(Math.random() * words.length)]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-sm font-semibold">
        <div>High Score: {highScore}</div>
        <div>Score: {score}</div>
      </div>

      {gameState === "ready" && (
        <div className="space-y-6 text-center py-8">
          <div className="text-6xl">⌨️</div>
          <h3 className="text-2xl font-bold">Speed Typing Challenge</h3>
          <p className="text-muted-foreground">
            Type the words as fast as you can!<br />
            You have 30 seconds. Ready?
          </p>
          <Button onClick={startGame} size="lg">Start Game</Button>
        </div>
      )}

      {gameState === "playing" && (
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Words: {wordsTyped}</span>
              <span>Time: {timeLeft}s</span>
            </div>
            <Progress value={(timeLeft / 30) * 100} className="h-2" />
          </div>

          <div className="bg-muted p-8 rounded-lg text-center">
            <div className="text-4xl sm:text-6xl font-bold tracking-wider">
              {currentWord}
            </div>
          </div>

          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Type here..."
            className="text-center text-xl sm:text-2xl h-14"
            autoComplete="off"
          />

          <div className="text-center text-sm text-muted-foreground">
            {input && input === currentWord.slice(0, input.length) ? (
              <span className="text-green-500">✓ Correct so far!</span>
            ) : input ? (
              <span className="text-destructive">✗ Try again</span>
            ) : (
              <span>Start typing...</span>
            )}
          </div>
        </div>
      )}

      {gameState === "finished" && (
        <div className="space-y-6 text-center py-8">
          <div className="text-6xl">🏆</div>
          <h3 className="text-2xl font-bold">Time's Up!</h3>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-primary">{score} points</p>
            <p className="text-muted-foreground">
              You typed {wordsTyped} words correctly!
            </p>
            <p className="text-sm text-muted-foreground">
              WPM: {Math.round((wordsTyped / 30) * 60)}
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
    </div>
  );
};

export default TypingGame;
