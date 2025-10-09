import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Sparkles } from "lucide-react";

const KonamiZone = () => {
  const navigate = useNavigate();
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => [
        ...prev,
        {
          id: Date.now(),
          x: Math.random() * window.innerWidth,
          y: -20
        }
      ].slice(-20));
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 relative overflow-hidden">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute text-4xl animate-fall"
          style={{
            left: particle.x,
            top: particle.y,
            animation: 'fall 3s linear forwards'
          }}
        >
          ⭐
        </div>
      ))}
      
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-xl bg-background/90 backdrop-blur">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl mb-2">⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️🅱️🅰️</CardTitle>
            <CardDescription className="text-lg">
              You entered the Konami Zone!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <p className="text-xl">🎮 Achievement Unlocked! 🎮</p>
              <p className="text-muted-foreground">
                You've discovered one of the oldest gaming secrets!
              </p>
              <div className="text-6xl animate-bounce">🏆</div>
            </div>

            <Button onClick={() => navigate("/")} className="w-full" variant="hero">
              <Home className="mr-2 h-4 w-4" />
              Back to Reality
            </Button>
          </CardContent>
        </Card>
      </div>

      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default KonamiZone;
