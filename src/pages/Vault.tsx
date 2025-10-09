import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Lock, Unlock, Trophy, Star, Award } from "lucide-react";

const achievements = [
  { id: "explorer", icon: "🗺️", name: "Explorer", description: "Found 5 secret pages", unlocked: false },
  { id: "gamer", icon: "🎮", name: "Gamer", description: "Played all mini-games", unlocked: false },
  { id: "collector", icon: "💎", name: "Collector", description: "Opened all gift boxes", unlocked: false },
  { id: "developer", icon: "👨‍💻", name: "Developer", description: "Accessed Dev Room", unlocked: true },
  { id: "scientist", icon: "🧪", name: "Scientist", description: "Completed 10 experiments", unlocked: false },
  { id: "master", icon: "👑", name: "Master", description: "Unlocked all achievements", unlocked: false },
];

const Vault = () => {
  const navigate = useNavigate();
  const [unlockedCount, setUnlockedCount] = useState(0);

  useEffect(() => {
    const savedAchievements = JSON.parse(localStorage.getItem("vault-achievements") || "[]");
    setUnlockedCount(savedAchievements.length);
  }, []);

  const unlockAchievement = (id: string) => {
    const saved = JSON.parse(localStorage.getItem("vault-achievements") || "[]");
    if (!saved.includes(id)) {
      saved.push(id);
      localStorage.setItem("vault-achievements", JSON.stringify(saved));
      setUnlockedCount(saved.length);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-900 via-amber-900 to-orange-900 p-4">
      <div className="container mx-auto min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-4xl bg-black/60 backdrop-blur border-yellow-500">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl mb-2 text-yellow-300 flex items-center justify-center gap-2">
              <Lock className="h-8 w-8" />
              The Vault
            </CardTitle>
            <CardDescription className="text-lg text-yellow-200">
              Secret Achievements & Treasures
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-6xl mb-4">🏆</div>
              <p className="text-2xl font-bold text-yellow-300">
                {unlockedCount} / {achievements.length} Unlocked
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {achievements.map((achievement) => {
                const isUnlocked = JSON.parse(localStorage.getItem("vault-achievements") || "[]").includes(achievement.id);
                
                return (
                  <Card
                    key={achievement.id}
                    className={`${
                      isUnlocked
                        ? "bg-yellow-600/20 border-yellow-500"
                        : "bg-gray-800/50 border-gray-600"
                    }`}
                  >
                    <CardContent className="p-4 flex items-start gap-3">
                      <div className="text-4xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-white">{achievement.name}</h3>
                          {isUnlocked ? (
                            <Unlock className="h-4 w-4 text-yellow-400" />
                          ) : (
                            <Lock className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
                        <p className="text-sm text-gray-300">{achievement.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => navigate("/dev-room")}
                variant="outline"
                className="flex-1 border-yellow-500 text-yellow-300 hover:bg-yellow-500/10"
              >
                Back to Dev Room
              </Button>
              <Button
                onClick={() => navigate("/")}
                className="flex-1 bg-yellow-600 hover:bg-yellow-700"
              >
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Vault;
