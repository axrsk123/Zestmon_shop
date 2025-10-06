import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy, ArrowLeft } from "lucide-react";

interface CatchGameProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
}

const CatchGame = ({ isOpen, onClose, onBack }: CatchGameProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const gameStateRef = useRef({
    basketX: 250,
    items: [] as { x: number; y: number; type: "good" | "bad"; emoji: string }[],
    score: 0,
    lives: 3,
  });

  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const BASKET_WIDTH = 60;
    const BASKET_HEIGHT = 20;
    const ITEM_SIZE = 30;
    const FALL_SPEED = 2;

    let animationFrameId: number;
    let lastItemTime = 0;
    let mouseX = 250;

    const goodItems = ["🍋", "🍊", "🍋", "🍊"];
    const badItems = ["💣", "🗑️"];

    const resetGame = () => {
      gameStateRef.current = {
        basketX: 250,
        items: [],
        score: 0,
        lives: 3,
      };
      setScore(0);
      setLives(3);
      setGameOver(false);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
    };

    const handleClick = () => {
      if (gameOver) {
        resetGame();
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("click", handleClick);

    const gameLoop = (timestamp: number) => {
      const state = gameStateRef.current;

      ctx.fillStyle = "hsl(var(--background))";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      state.basketX = Math.max(0, Math.min(canvas.width - BASKET_WIDTH, mouseX - BASKET_WIDTH / 2));

      if (timestamp - lastItemTime > 1000) {
        const isGood = Math.random() > 0.3;
        const items = isGood ? goodItems : badItems;
        const emoji = items[Math.floor(Math.random() * items.length)];
        
        state.items.push({
          x: Math.random() * (canvas.width - ITEM_SIZE),
          y: 0,
          type: isGood ? "good" : "bad",
          emoji,
        });
        lastItemTime = timestamp;
      }

      state.items = state.items.filter((item) => {
        item.y += FALL_SPEED;

        ctx.font = "30px Arial";
        ctx.fillText(item.emoji, item.x, item.y);

        if (
          item.y + ITEM_SIZE > canvas.height - BASKET_HEIGHT &&
          item.x + ITEM_SIZE > state.basketX &&
          item.x < state.basketX + BASKET_WIDTH
        ) {
          if (item.type === "good") {
            state.score += 10;
            setScore(state.score);
          } else {
            state.lives -= 1;
            setLives(state.lives);
            if (state.lives <= 0) {
              setGameOver(true);
              if (state.score > highScore) {
                setHighScore(state.score);
              }
            }
          }
          return false;
        }

        return item.y < canvas.height;
      });

      ctx.fillStyle = "hsl(var(--primary))";
      ctx.fillRect(state.basketX, canvas.height - BASKET_HEIGHT, BASKET_WIDTH, BASKET_HEIGHT);

      ctx.fillStyle = "hsl(var(--foreground))";
      ctx.font = "20px Arial";
      ctx.fillText(`Score: ${state.score}`, 10, 30);
      ctx.fillText(`Lives: ${"❤️".repeat(state.lives)}`, 10, 60);

      if (gameOver) {
        ctx.fillStyle = "hsl(var(--foreground))";
        ctx.font = "30px Arial";
        ctx.fillText("Game Over!", canvas.width / 2 - 80, canvas.height / 2);
        ctx.font = "16px Arial";
        ctx.fillText("Click to restart", canvas.width / 2 - 60, canvas.height / 2 + 30);
      } else {
        animationFrameId = requestAnimationFrame(gameLoop);
      }
    };

    resetGame();
    animationFrameId = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("click", handleClick);
    };
  }, [isOpen, gameOver, highScore]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Lemon Catch - High Score: {highScore}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <canvas
            ref={canvasRef}
            width={600}
            height={400}
            className="border rounded-lg w-full bg-background cursor-none"
          />
          <div className="text-sm text-muted-foreground text-center">
            Move your mouse to catch lemons! Avoid bombs and trash.
          </div>
          <div className="flex justify-center gap-4">
            <Button onClick={onBack} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Menu
            </Button>
            <Button onClick={() => setGameOver(false)} variant="outline">
              Restart
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CatchGame;