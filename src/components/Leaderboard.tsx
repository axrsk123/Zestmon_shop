import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Medal } from "lucide-react";

interface LeaderboardEntry {
  game: string;
  score: number;
  date: string;
}

const Leaderboard = () => {
  const [scores, setScores] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const loadScores = () => {
      const runner = parseInt(localStorage.getItem("runner-highscore") || "0");
      const wheel = parseInt(localStorage.getItem("wheel-highscore") || "0");
      const memory = parseInt(localStorage.getItem("memory-highscore") || "0");
      const catch_ = parseInt(localStorage.getItem("catch-highscore") || "0");
      const pokemon = parseInt(localStorage.getItem("pokemon-highscore") || "0");
      const quiz = parseInt(localStorage.getItem("quiz-highscore") || "0");
      const typing = parseInt(localStorage.getItem("typing-highscore") || "0");
      const clicker = parseInt(localStorage.getItem("clicker-highscore") || "0");
      const simon = parseInt(localStorage.getItem("simon-highscore") || "0");

      setScores({
        "Zestmon Runner": runner,
        "Prize Wheel": wheel,
        "Flavor Match": memory,
        "Lemon Catch": catch_,
        "Zestmon Battle": pokemon,
        "Lemon Quiz": quiz,
        "Speed Typer": typing,
        "Lemon Clicker": clicker,
        "Simon Says": simon,
      });
    };

    loadScores();
    const interval = setInterval(loadScores, 1000);
    return () => clearInterval(interval);
  }, []);

  const getRankIcon = (rank: number) => {
    if (rank === 0) return <Trophy className="h-5 w-5 text-yellow-500" />;
    if (rank === 1) return <Medal className="h-5 w-5 text-gray-400" />;
    if (rank === 2) return <Medal className="h-5 w-5 text-orange-600" />;
    return <span className="w-5 h-5 flex items-center justify-center font-bold text-sm">{rank + 1}</span>;
  };

  const sortedScores = Object.entries(scores).sort(([, a], [, b]) => b - a);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-6 w-6" />
          Leaderboard
        </CardTitle>
        <CardDescription>Your high scores across all games</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-5 sm:grid-cols-10 gap-1">
            <TabsTrigger value="all" className="text-xs sm:text-sm">All</TabsTrigger>
            <TabsTrigger value="runner" className="text-xs sm:text-sm">Run</TabsTrigger>
            <TabsTrigger value="catch" className="text-xs sm:text-sm">Catch</TabsTrigger>
            <TabsTrigger value="pokemon" className="text-xs sm:text-sm">Battle</TabsTrigger>
            <TabsTrigger value="memory" className="text-xs sm:text-sm">Memory</TabsTrigger>
            <TabsTrigger value="wheel" className="text-xs sm:text-sm">Wheel</TabsTrigger>
            <TabsTrigger value="quiz" className="text-xs sm:text-sm">Quiz</TabsTrigger>
            <TabsTrigger value="typing" className="text-xs sm:text-sm">Type</TabsTrigger>
            <TabsTrigger value="clicker" className="text-xs sm:text-sm">Click</TabsTrigger>
            <TabsTrigger value="simon" className="text-xs sm:text-sm">Simon</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 mt-4">
            {sortedScores.map(([game, score], index) => (
              <div key={game} className="flex items-center gap-4 p-3 bg-muted rounded-lg">
                {getRankIcon(index)}
                <div className="flex-1">
                  <div className="font-semibold">{game}</div>
                </div>
                <div className="text-2xl font-bold text-primary">{score}</div>
              </div>
            ))}
          </TabsContent>

          {Object.entries(scores).map(([game, score]) => {
            const gameKey = game.toLowerCase().replace(/\s/g, "");
            return (
              <TabsContent key={gameKey} value={gameKey.replace("zestmon", "").replace("prize", "").replace("flavor", "").replace("lemon", "").replace("battle", "pokemon")} className="mt-4">
                <div className="text-center space-y-4 py-8">
                  <Trophy className="h-16 w-16 mx-auto text-yellow-500" />
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">{game}</div>
                    <div className="text-4xl font-bold text-primary">{score}</div>
                    <div className="text-sm text-muted-foreground mt-2">High Score</div>
                  </div>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
