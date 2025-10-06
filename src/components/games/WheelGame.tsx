import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WheelGameProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
}

const WheelGame = ({ isOpen, onClose, onBack }: WheelGameProps) => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [prize, setPrize] = useState<string | null>(null);
  const { toast } = useToast();

  const prizes = [
    { name: "10% OFF", color: "#FFD700", emoji: "🎁" },
    { name: "FREE DRINK", color: "#FF6B6B", emoji: "🥤" },
    { name: "TRY AGAIN", color: "#4ECDC4", emoji: "🔄" },
    { name: "20% OFF", color: "#95E1D3", emoji: "💰" },
    { name: "BUY 1 GET 1", color: "#F38181", emoji: "🎉" },
    { name: "5% OFF", color: "#AA96DA", emoji: "🎈" },
    { name: "SPIN AGAIN", color: "#FCBAD3", emoji: "🎪" },
    { name: "15% OFF", color: "#FED766", emoji: "⭐" },
  ];

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setPrize(null);

    const spins = 5 + Math.random() * 5;
    const extraDegrees = Math.random() * 360;
    const totalRotation = rotation + spins * 360 + extraDegrees;

    setRotation(totalRotation);

    setTimeout(() => {
      const normalizedRotation = totalRotation % 360;
      const segmentSize = 360 / prizes.length;
      const winningIndex = Math.floor((360 - normalizedRotation) / segmentSize) % prizes.length;
      const wonPrize = prizes[winningIndex];
      
      setPrize(wonPrize.name);
      setIsSpinning(false);
      
      toast({
        title: "🎉 You won!",
        description: `${wonPrize.emoji} ${wonPrize.name}`,
      });
    }, 3000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Prize Wheel
          </DialogTitle>
          <DialogDescription>Spin the wheel to win exciting prizes!</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="relative w-full max-w-md mx-auto aspect-square">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10">
              <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-t-[40px] border-l-transparent border-r-transparent border-t-red-500" />
            </div>
            
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: isSpinning ? "transform 3s cubic-bezier(0.17, 0.67, 0.12, 0.99)" : "none",
              }}
            >
              {prizes.map((prize, index) => {
                const angle = (360 / prizes.length) * index;
                const nextAngle = (360 / prizes.length) * (index + 1);
                const startX = 100 + 95 * Math.cos((angle * Math.PI) / 180);
                const startY = 100 + 95 * Math.sin((angle * Math.PI) / 180);
                const endX = 100 + 95 * Math.cos((nextAngle * Math.PI) / 180);
                const endY = 100 + 95 * Math.sin((nextAngle * Math.PI) / 180);

                return (
                  <g key={index}>
                    <path
                      d={`M 100 100 L ${startX} ${startY} A 95 95 0 0 1 ${endX} ${endY} Z`}
                      fill={prize.color}
                      stroke="white"
                      strokeWidth="2"
                    />
                    <text
                      x="100"
                      y="100"
                      fill="white"
                      fontSize="8"
                      fontWeight="bold"
                      textAnchor="middle"
                      transform={`rotate(${angle + 360 / prizes.length / 2} 100 100) translate(0 -60)`}
                    >
                      {prize.emoji}
                    </text>
                    <text
                      x="100"
                      y="100"
                      fill="white"
                      fontSize="5"
                      fontWeight="bold"
                      textAnchor="middle"
                      transform={`rotate(${angle + 360 / prizes.length / 2} 100 100) translate(0 -50)`}
                    >
                      {prize.name}
                    </text>
                  </g>
                );
              })}
              <circle cx="100" cy="100" r="10" fill="white" stroke="#333" strokeWidth="2" />
            </svg>
          </div>

          <div className="text-center space-y-4">
            {prize && (
              <div className="text-2xl font-bold text-primary animate-scale-in">
                🎉 {prize} 🎉
              </div>
            )}
            <Button
              onClick={spinWheel}
              disabled={isSpinning}
              size="lg"
              className="w-full max-w-xs mx-auto"
              variant="hero"
            >
              {isSpinning ? "SPINNING..." : "SPIN THE WHEEL!"}
            </Button>
          </div>

          <div className="flex justify-center gap-4">
            <Button onClick={onBack} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Menu
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WheelGame;