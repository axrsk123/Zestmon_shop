import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";

interface MiniGameProps {
  isOpen: boolean;
  onClose: () => void;
}

const MiniGame = ({ isOpen, onClose }: MiniGameProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const gameStateRef = useRef({
    playerY: 150,
    playerVelocity: 0,
    obstacles: [] as { x: number; width: number; height: number }[],
    score: 0,
    isJumping: false,
  });

  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const GRAVITY = 0.6;
    const JUMP_STRENGTH = -12;
    const GROUND_Y = 150;
    const PLAYER_SIZE = 30;
    const OBSTACLE_SPEED = 5;

    let animationFrameId: number;
    let lastObstacleTime = 0;

    const resetGame = () => {
      gameStateRef.current = {
        playerY: GROUND_Y,
        playerVelocity: 0,
        obstacles: [],
        score: 0,
        isJumping: false,
      };
      setScore(0);
      setGameOver(false);
    };

    const jump = () => {
      const state = gameStateRef.current;
      if (state.playerY >= GROUND_Y) {
        state.playerVelocity = JUMP_STRENGTH;
        state.isJumping = true;
      }
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space" && !gameOver) {
        e.preventDefault();
        jump();
      }
    };

    const handleClick = () => {
      if (!gameOver) {
        jump();
      } else {
        resetGame();
      }
    };

    canvas.addEventListener("click", handleClick);
    window.addEventListener("keydown", handleKeyPress);

    const gameLoop = (timestamp: number) => {
      const state = gameStateRef.current;

      // Clear canvas
      ctx.fillStyle = "hsl(var(--background))";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update player physics
      state.playerVelocity += GRAVITY;
      state.playerY += state.playerVelocity;

      if (state.playerY >= GROUND_Y) {
        state.playerY = GROUND_Y;
        state.playerVelocity = 0;
        state.isJumping = false;
      }

      // Draw ground
      ctx.fillStyle = "hsl(var(--muted))";
      ctx.fillRect(0, GROUND_Y + PLAYER_SIZE, canvas.width, 10);

      // Draw player (lemon bottle)
      ctx.fillStyle = "hsl(var(--primary))";
      ctx.fillRect(50, state.playerY, PLAYER_SIZE, PLAYER_SIZE);

      // Add obstacles
      if (timestamp - lastObstacleTime > 1500) {
        const height = 20 + Math.random() * 30;
        state.obstacles.push({
          x: canvas.width,
          width: 20,
          height,
        });
        lastObstacleTime = timestamp;
      }

      // Update and draw obstacles
      state.obstacles = state.obstacles.filter((obstacle) => {
        obstacle.x -= OBSTACLE_SPEED;

        // Draw obstacle
        ctx.fillStyle = "hsl(var(--destructive))";
        ctx.fillRect(obstacle.x, GROUND_Y + PLAYER_SIZE - obstacle.height, obstacle.width, obstacle.height);

        // Check collision
        if (
          obstacle.x < 50 + PLAYER_SIZE &&
          obstacle.x + obstacle.width > 50 &&
          state.playerY + PLAYER_SIZE > GROUND_Y + PLAYER_SIZE - obstacle.height
        ) {
          setGameOver(true);
          if (state.score > highScore) {
            setHighScore(state.score);
          }
        }

        // Update score
        if (obstacle.x + obstacle.width < 50 && obstacle.x + obstacle.width > 50 - OBSTACLE_SPEED) {
          state.score += 1;
          setScore(state.score);
        }

        return obstacle.x > -obstacle.width;
      });

      // Draw score
      ctx.fillStyle = "hsl(var(--foreground))";
      ctx.font = "20px Arial";
      ctx.fillText(`Score: ${state.score}`, 10, 30);

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
      canvas.removeEventListener("click", handleClick);
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isOpen, gameOver, highScore]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Zestmon Runner - High Score: {highScore}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <canvas
            ref={canvasRef}
            width={600}
            height={250}
            className="border rounded-lg w-full bg-background"
          />
          <div className="text-sm text-muted-foreground text-center">
            Press SPACE or click to jump! Avoid the obstacles and score points.
          </div>
          <div className="flex justify-center gap-4">
            <Button onClick={() => setGameOver(false)} variant="outline">
              Restart
            </Button>
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MiniGame;
