import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Trophy, ArrowLeft } from "lucide-react";

interface ClickerGameProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onGameEnd?: (score: number) => void;
}

const ClickerGame = ({ isOpen, onClose, onBack, onGameEnd }: ClickerGameProps) => {
  const [lemons, setLemons] = useState(0);
  const [clickPower, setClickPower] = useState(1);
  const [autoClickers, setAutoClickers] = useState(0);
  const [lemonStands, setLemonStands] = useState(0);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("clicker-highscore");
    if (saved) setHighScore(parseInt(saved));
  }, []);

  useEffect(() => {
    if (autoClickers > 0) {
      const interval = setInterval(() => {
        setLemons((prev) => prev + autoClickers);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [autoClickers]);

  useEffect(() => {
    if (lemonStands > 0) {
      const interval = setInterval(() => {
        setLemons((prev) => prev + lemonStands * 5);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [lemonStands]);

  useEffect(() => {
    if (lemons > highScore) {
      setHighScore(lemons);
      localStorage.setItem("clicker-highscore", lemons.toString());
      onGameEnd?.(lemons);
    }
  }, [lemons, highScore]);

  const handleClick = () => {
    setLemons(lemons + clickPower);
  };

  const upgrades = [
    {
      name: "Stronger Squeeze",
      cost: 10,
      effect: "Click power +1",
      action: () => {
        if (lemons >= 10) {
          setLemons(lemons - 10);
          setClickPower(clickPower + 1);
        }
      },
      canAfford: lemons >= 10,
    },
    {
      name: "Auto Squeezer",
      cost: 50,
      effect: "+1 lemon/sec",
      action: () => {
        if (lemons >= 50) {
          setLemons(lemons - 50);
          setAutoClickers(autoClickers + 1);
        }
      },
      canAfford: lemons >= 50,
    },
    {
      name: "Lemon Stand",
      cost: 200,
      effect: "+5 lemons/sec",
      action: () => {
        if (lemons >= 200) {
          setLemons(lemons - 200);
          setLemonStands(lemonStands + 1);
        }
      },
      canAfford: lemons >= 200,
    },
  ];

  const perSecond = autoClickers + (lemonStands * 5);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="text-sm text-muted-foreground">High Score: {highScore}</div>
        <div className="text-5xl sm:text-7xl font-bold text-primary">{lemons}</div>
        <div className="text-lg font-semibold">Lemons 🍋</div>
        {perSecond > 0 && (
          <div className="text-sm text-muted-foreground">+{perSecond}/sec</div>
        )}
      </div>

      <div className="flex justify-center">
        <Button
          onClick={handleClick}
          size="lg"
          className="h-32 w-32 rounded-full text-6xl hover:scale-105 active:scale-95 transition-transform"
        >
          🍋
        </Button>
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-center">Upgrades</h3>
        <div className="grid gap-2">
          {upgrades.map((upgrade, index) => (
            <Button
              key={index}
              onClick={upgrade.action}
              disabled={!upgrade.canAfford}
              variant="outline"
              className="h-auto flex-col items-start gap-1 p-4"
            >
              <div className="flex w-full justify-between items-center">
                <span className="font-semibold text-sm sm:text-base">{upgrade.name}</span>
                <span className="text-primary font-bold">🍋 {upgrade.cost}</span>
              </div>
              <span className="text-xs text-muted-foreground">{upgrade.effect}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t">
        <div className="text-center">
          <div className="text-2xl font-bold">{clickPower}</div>
          <div className="text-xs text-muted-foreground">Per Click</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">{autoClickers}</div>
          <div className="text-xs text-muted-foreground">Auto Squeezers</div>
        </div>
      </div>

      <Button onClick={onBack} variant="outline" className="w-full">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Menu
      </Button>
    </div>
  );
};

export default ClickerGame;
