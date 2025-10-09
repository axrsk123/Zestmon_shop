import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trophy, Medal, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface LeaderboardEntry {
  id: string;
  player_name: string;
  game_name: string;
  score: number;
  created_at: string;
}

const games = [
  "Zestmon Runner",
  "Prize Wheel",
  "Flavor Match",
  "Lemon Catch",
  "Zestmon Battle",
  "Lemon Quiz",
  "Speed Typer",
  "Lemon Clicker",
  "Simon Says",
];

const PublicLeaderboard = () => {
  const [scores, setScores] = useState<LeaderboardEntry[]>([]);
  const [playerName, setPlayerName] = useState("");
  const [selectedGame, setSelectedGame] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
    fetchScores();
    
    const channel = supabase
      .channel('leaderboard-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'leaderboard'
        },
        () => fetchScores()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchScores = async () => {
    const { data, error } = await supabase
      .from('leaderboard')
      .select('*')
      .order('score', { ascending: false })
      .limit(100);

    if (error) {
      console.error('Error fetching scores:', error);
    } else {
      setScores(data || []);
    }
  };

  const uploadScore = async (game: string) => {
    if (!playerName.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your name to upload scores",
        variant: "destructive",
      });
      return;
    }

    const localScore = parseInt(localStorage.getItem(`${game.toLowerCase().replace(/\s/g, "")}-highscore`) || "0");
    
    if (localScore === 0) {
      toast({
        title: "No Score",
        description: "Play the game first to get a score!",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from('leaderboard')
      .insert([
        {
          player_name: playerName.trim(),
          game_name: game,
          score: localScore,
        }
      ]);

    if (error) {
      toast({
        title: "Upload Failed",
        description: "Could not upload score. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Score Uploaded!",
        description: `Your ${game} score has been added to the leaderboard!`,
      });
      fetchScores();
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 0) return <Trophy className="h-5 w-5 text-yellow-500" />;
    if (rank === 1) return <Medal className="h-5 w-5 text-gray-400" />;
    if (rank === 2) return <Medal className="h-5 w-5 text-orange-600" />;
    return <span className="w-5 h-5 flex items-center justify-center font-bold text-sm">{rank + 1}</span>;
  };

  const filteredScores = selectedGame === "all" 
    ? scores 
    : scores.filter(s => s.game_name === selectedGame);

  const topScores = filteredScores.slice(0, 10);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-6 w-6 text-yellow-500" />
          Global Leaderboard
        </CardTitle>
        <CardDescription>Compete with players worldwide!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            maxLength={20}
          />
        </div>

        <Tabs value={selectedGame} onValueChange={setSelectedGame}>
          <TabsList className="grid w-full grid-cols-5 sm:grid-cols-10 gap-1">
            <TabsTrigger value="all" className="text-xs sm:text-sm">All</TabsTrigger>
            {games.map(game => (
              <TabsTrigger 
                key={game} 
                value={game} 
                className="text-xs sm:text-sm"
              >
                {game.split(" ")[0]}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="space-y-4 mt-4">
            {topScores.map((entry, index) => (
              <div key={entry.id} className="flex items-center gap-4 p-3 bg-muted rounded-lg">
                {getRankIcon(index)}
                <div className="flex-1">
                  <div className="font-semibold">{entry.player_name}</div>
                  <div className="text-xs text-muted-foreground">{entry.game_name}</div>
                </div>
                <div className="text-2xl font-bold text-primary">{entry.score}</div>
              </div>
            ))}
          </TabsContent>

          {games.map(game => (
            <TabsContent key={game} value={game} className="space-y-4 mt-4">
              <Button
                onClick={() => uploadScore(game)}
                className="w-full"
                variant="hero"
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload My {game} Score
              </Button>
              
              {filteredScores.slice(0, 10).map((entry, index) => (
                <div key={entry.id} className="flex items-center gap-4 p-3 bg-muted rounded-lg">
                  {getRankIcon(index)}
                  <div className="flex-1">
                    <div className="font-semibold">{entry.player_name}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(entry.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-primary">{entry.score}</div>
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PublicLeaderboard;
