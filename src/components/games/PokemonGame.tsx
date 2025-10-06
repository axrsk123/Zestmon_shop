import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Trophy, ArrowLeft, Zap, Heart, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PokemonGameProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onGameEnd?: (score: number) => void;
}

interface Pokemon {
  name: string;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  emoji: string;
}

const PokemonGame = ({ isOpen, onClose, onBack, onGameEnd }: PokemonGameProps) => {
  const { toast } = useToast();
  const [gameState, setGameState] = useState<"select" | "battle" | "victory" | "defeat">("select");
  const [playerPokemon, setPlayerPokemon] = useState<Pokemon | null>(null);
  const [enemyPokemon, setEnemyPokemon] = useState<Pokemon | null>(null);
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const availablePokemon: Pokemon[] = [
    { name: "Zestizard", hp: 100, maxHp: 100, attack: 20, defense: 10, emoji: "🦎" },
    { name: "Lemonchu", hp: 90, maxHp: 90, attack: 25, defense: 5, emoji: "⚡" },
    { name: "Citrusaur", hp: 110, maxHp: 110, attack: 15, defense: 15, emoji: "🌿" },
  ];

  useEffect(() => {
    const savedHighScore = localStorage.getItem("pokemon-highscore");
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
  }, []);

  const startBattle = (pokemon: Pokemon) => {
    const enemy = availablePokemon[Math.floor(Math.random() * availablePokemon.length)];
    setPlayerPokemon({ ...pokemon });
    setEnemyPokemon({ ...enemy });
    setGameState("battle");
    setBattleLog([`A wild ${enemy.name} appeared!`]);
  };

  const attack = () => {
    if (!playerPokemon || !enemyPokemon) return;

    const playerDamage = Math.max(5, playerPokemon.attack - enemyPokemon.defense / 2 + Math.random() * 10);
    const newEnemyHp = Math.max(0, enemyPokemon.hp - playerDamage);
    
    const newLog = [...battleLog, `${playerPokemon.name} dealt ${Math.round(playerDamage)} damage!`];

    if (newEnemyHp <= 0) {
      const newScore = score + 100;
      setScore(newScore);
      newLog.push(`${enemyPokemon.name} fainted! You won!`);
      setBattleLog(newLog);
      setEnemyPokemon({ ...enemyPokemon, hp: 0 });
      
      setTimeout(() => {
        setGameState("victory");
        if (newScore > highScore) {
          setHighScore(newScore);
          localStorage.setItem("pokemon-highscore", newScore.toString());
          onGameEnd?.(newScore);
        }
      }, 1500);
      return;
    }

    setEnemyPokemon({ ...enemyPokemon, hp: newEnemyHp });

    setTimeout(() => {
      const enemyDamage = Math.max(5, enemyPokemon.attack - playerPokemon.defense / 2 + Math.random() * 10);
      const newPlayerHp = Math.max(0, playerPokemon.hp - enemyDamage);
      
      newLog.push(`${enemyPokemon.name} dealt ${Math.round(enemyDamage)} damage!`);
      setBattleLog(newLog);

      if (newPlayerHp <= 0) {
        setPlayerPokemon({ ...playerPokemon, hp: 0 });
        newLog.push(`${playerPokemon.name} fainted! You lost!`);
        setBattleLog(newLog);
        setTimeout(() => {
          setGameState("defeat");
          if (score > highScore) {
            setHighScore(score);
            localStorage.setItem("pokemon-highscore", score.toString());
            onGameEnd?.(score);
          }
        }, 1500);
      } else {
        setPlayerPokemon({ ...playerPokemon, hp: newPlayerHp });
      }
    }, 1000);
  };

  const defend = () => {
    if (!playerPokemon || !enemyPokemon) return;

    const newLog = [...battleLog, `${playerPokemon.name} is defending!`];
    setBattleLog(newLog);

    setTimeout(() => {
      const enemyDamage = Math.max(2, (enemyPokemon.attack - playerPokemon.defense * 1.5) / 2 + Math.random() * 5);
      const newPlayerHp = Math.max(0, playerPokemon.hp - enemyDamage);
      
      newLog.push(`${enemyPokemon.name} dealt ${Math.round(enemyDamage)} damage!`);
      setBattleLog(newLog);

      if (newPlayerHp <= 0) {
        setPlayerPokemon({ ...playerPokemon, hp: 0 });
        newLog.push(`${playerPokemon.name} fainted! You lost!`);
        setBattleLog(newLog);
        setTimeout(() => setGameState("defeat"), 1500);
      } else {
        setPlayerPokemon({ ...playerPokemon, hp: newPlayerHp });
      }
    }, 1000);
  };

  const resetGame = () => {
    setGameState("select");
    setPlayerPokemon(null);
    setEnemyPokemon(null);
    setBattleLog([]);
    setScore(0);
  };

  const continueGame = () => {
    if (!playerPokemon) return;
    const healedPokemon = { ...playerPokemon, hp: Math.min(playerPokemon.maxHp, playerPokemon.hp + 30) };
    const enemy = availablePokemon[Math.floor(Math.random() * availablePokemon.length)];
    setPlayerPokemon(healedPokemon);
    setEnemyPokemon({ ...enemy });
    setGameState("battle");
    setBattleLog([`A wild ${enemy.name} appeared!`]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Zestmon Battle - High Score: {highScore}
          </DialogTitle>
          <DialogDescription>Choose your Zestmon and battle wild creatures!</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {gameState === "select" && (
            <div className="space-y-4">
              <p className="text-center text-muted-foreground">Choose your Zestmon to start battling!</p>
              <div className="grid grid-cols-3 gap-4">
                {availablePokemon.map((pokemon) => (
                  <Button
                    key={pokemon.name}
                    variant="outline"
                    className="h-auto flex-col gap-2 p-6"
                    onClick={() => startBattle(pokemon)}
                  >
                    <div className="text-4xl">{pokemon.emoji}</div>
                    <div className="font-semibold">{pokemon.name}</div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div className="flex items-center gap-1">
                        <Heart className="h-3 w-3" /> HP: {pokemon.maxHp}
                      </div>
                      <div className="flex items-center gap-1">
                        <Zap className="h-3 w-3" /> ATK: {pokemon.attack}
                      </div>
                      <div className="flex items-center gap-1">
                        <Shield className="h-3 w-3" /> DEF: {pokemon.defense}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {gameState === "battle" && playerPokemon && enemyPokemon && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <div className="text-center text-sm font-semibold">Your {playerPokemon.name}</div>
                  <div className="text-6xl text-center">{playerPokemon.emoji}</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>HP</span>
                      <span>{Math.round(playerPokemon.hp)}/{playerPokemon.maxHp}</span>
                    </div>
                    <Progress value={(playerPokemon.hp / playerPokemon.maxHp) * 100} className="h-2" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-center text-sm font-semibold">Wild {enemyPokemon.name}</div>
                  <div className="text-6xl text-center">{enemyPokemon.emoji}</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>HP</span>
                      <span>{Math.round(enemyPokemon.hp)}/{enemyPokemon.maxHp}</span>
                    </div>
                    <Progress value={(enemyPokemon.hp / enemyPokemon.maxHp) * 100} className="h-2" />
                  </div>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg h-32 overflow-y-auto">
                {battleLog.map((log, i) => (
                  <div key={i} className="text-sm">{log}</div>
                ))}
              </div>

              <div className="flex justify-center gap-4">
                <Button onClick={attack} disabled={playerPokemon.hp <= 0 || enemyPokemon.hp <= 0}>
                  <Zap className="h-4 w-4 mr-2" />
                  Attack
                </Button>
                <Button onClick={defend} variant="outline" disabled={playerPokemon.hp <= 0 || enemyPokemon.hp <= 0}>
                  <Shield className="h-4 w-4 mr-2" />
                  Defend
                </Button>
              </div>
            </div>
          )}

          {gameState === "victory" && (
            <div className="space-y-4 text-center py-8">
              <div className="text-6xl">🏆</div>
              <h3 className="text-2xl font-bold">Victory!</h3>
              <p className="text-muted-foreground">Score: {score}</p>
              <div className="flex justify-center gap-4">
                <Button onClick={continueGame}>Continue Battle</Button>
                <Button onClick={resetGame} variant="outline">New Game</Button>
              </div>
            </div>
          )}

          {gameState === "defeat" && (
            <div className="space-y-4 text-center py-8">
              <div className="text-6xl">💔</div>
              <h3 className="text-2xl font-bold">Defeated!</h3>
              <p className="text-muted-foreground">Final Score: {score}</p>
              <Button onClick={resetGame}>Try Again</Button>
            </div>
          )}

          <div className="flex justify-center gap-4 pt-4 border-t">
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

export default PokemonGame;
