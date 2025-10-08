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

interface Item {
  id: string;
  name: string;
  emoji: string;
  effect: "heal" | "boost";
  value: number;
}

const PokemonGame = ({ isOpen, onClose, onBack, onGameEnd }: PokemonGameProps) => {
  const { toast } = useToast();
  const [gameState, setGameState] = useState<"select" | "battle" | "victory" | "defeat" | "menu">("select");
  const [playerPokemon, setPlayerPokemon] = useState<Pokemon | null>(null);
  const [enemyPokemon, setEnemyPokemon] = useState<Pokemon | null>(null);
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [inventory, setInventory] = useState<Item[]>([
    { id: "1", name: "Potion", emoji: "🧪", effect: "heal", value: 30 },
    { id: "2", name: "Super Potion", emoji: "💊", effect: "heal", value: 50 },
    { id: "3", name: "Power Up", emoji: "⚡", effect: "boost", value: 10 },
  ]);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [showInventory, setShowInventory] = useState(false);

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
    if (!playerPokemon || !enemyPokemon || !isPlayerTurn) return;

    setIsPlayerTurn(false);
    const playerDamage = Math.max(5, playerPokemon.attack - enemyPokemon.defense / 2 + Math.random() * 10);
    const newEnemyHp = Math.max(0, enemyPokemon.hp - playerDamage);
    
    const newLog = [...battleLog, `${playerPokemon.name} used Attack! Dealt ${Math.round(playerDamage)} damage!`];
    setBattleLog(newLog);

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
    enemyTurn(newLog);
  };

  const enemyTurn = (currentLog: string[]) => {
    setTimeout(() => {
      if (!playerPokemon || !enemyPokemon) return;
      
      const enemyDamage = Math.max(5, enemyPokemon.attack - playerPokemon.defense / 2 + Math.random() * 10);
      const newPlayerHp = Math.max(0, playerPokemon.hp - enemyDamage);
      
      const newLog = [...currentLog, `${enemyPokemon.name} attacked! Dealt ${Math.round(enemyDamage)} damage!`];
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
        setIsPlayerTurn(true);
      }
    }, 1500);
  };

  const useItem = (item: Item) => {
    if (!playerPokemon || !enemyPokemon || !isPlayerTurn) return;

    setIsPlayerTurn(false);
    setShowInventory(false);

    if (item.effect === "heal") {
      const newHp = Math.min(playerPokemon.maxHp, playerPokemon.hp + item.value);
      setPlayerPokemon({ ...playerPokemon, hp: newHp });
      const newLog = [...battleLog, `Used ${item.name}! Restored ${item.value} HP!`];
      setBattleLog(newLog);
      enemyTurn(newLog);
    } else if (item.effect === "boost") {
      setPlayerPokemon({ ...playerPokemon, attack: playerPokemon.attack + item.value });
      const newLog = [...battleLog, `Used ${item.name}! Attack increased!`];
      setBattleLog(newLog);
      enemyTurn(newLog);
    }

    setInventory(inventory.filter(i => i.id !== item.id));
  };

  const flee = () => {
    const newLog = [...battleLog, `${playerPokemon?.name} fled from battle!`];
    setBattleLog(newLog);
    setTimeout(() => {
      setGameState("defeat");
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem("pokemon-highscore", score.toString());
        onGameEnd?.(score);
      }
    }, 1000);
  };

  const resetGame = () => {
    setGameState("select");
    setPlayerPokemon(null);
    setEnemyPokemon(null);
    setBattleLog([]);
    setScore(0);
    setIsPlayerTurn(true);
    setShowInventory(false);
    setInventory([
      { id: "1", name: "Potion", emoji: "🧪", effect: "heal", value: 30 },
      { id: "2", name: "Super Potion", emoji: "💊", effect: "heal", value: 50 },
      { id: "3", name: "Power Up", emoji: "⚡", effect: "boost", value: 10 },
    ]);
  };

  const continueGame = () => {
    if (!playerPokemon) return;
    const healedPokemon = { ...playerPokemon, hp: Math.min(playerPokemon.maxHp, playerPokemon.hp + 30) };
    const enemy = availablePokemon[Math.floor(Math.random() * availablePokemon.length)];
    setPlayerPokemon(healedPokemon);
    setEnemyPokemon({ ...enemy });
    setGameState("battle");
    setBattleLog([`A wild ${enemy.name} appeared!`]);
    setIsPlayerTurn(true);
    setShowInventory(false);
    setInventory([
      { id: "1", name: "Potion", emoji: "🧪", effect: "heal", value: 30 },
      { id: "2", name: "Super Potion", emoji: "💊", effect: "heal", value: 50 },
      { id: "3", name: "Power Up", emoji: "⚡", effect: "boost", value: 10 },
    ]);
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
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                <div className="space-y-2">
                  <div className="text-center text-sm font-semibold">Your {playerPokemon.name}</div>
                  <div className="text-4xl sm:text-6xl text-center">{playerPokemon.emoji}</div>
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
                  <div className="text-4xl sm:text-6xl text-center">{enemyPokemon.emoji}</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>HP</span>
                      <span>{Math.round(enemyPokemon.hp)}/{enemyPokemon.maxHp}</span>
                    </div>
                    <Progress value={(enemyPokemon.hp / enemyPokemon.maxHp) * 100} className="h-2" />
                  </div>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg h-32 overflow-y-auto text-xs sm:text-sm">
                {battleLog.map((log, i) => (
                  <div key={i}>{log}</div>
                ))}
              </div>

              {!showInventory ? (
                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                  <Button 
                    onClick={attack} 
                    disabled={!isPlayerTurn || playerPokemon.hp <= 0 || enemyPokemon.hp <= 0}
                    className="h-auto py-4"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Attack
                  </Button>
                  <Button 
                    onClick={() => setShowInventory(true)} 
                    variant="outline"
                    disabled={!isPlayerTurn || inventory.length === 0}
                    className="h-auto py-4"
                  >
                    <span className="mr-2">🎒</span>
                    Inventory ({inventory.length})
                  </Button>
                  <Button 
                    onClick={() => {
                      setGameState("menu");
                      setShowInventory(false);
                    }} 
                    variant="outline"
                    disabled={!isPlayerTurn}
                    className="h-auto py-4"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Menu
                  </Button>
                  <Button 
                    onClick={flee} 
                    variant="destructive"
                    disabled={!isPlayerTurn}
                    className="h-auto py-4"
                  >
                    <span className="mr-2">🏃</span>
                    Flee
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="font-semibold text-center">Choose an Item</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {inventory.map((item) => (
                      <Button
                        key={item.id}
                        variant="outline"
                        onClick={() => useItem(item)}
                        className="h-auto flex-col gap-2 p-4"
                      >
                        <div className="text-2xl">{item.emoji}</div>
                        <div className="text-xs text-center">{item.name}</div>
                      </Button>
                    ))}
                  </div>
                  <Button onClick={() => setShowInventory(false)} variant="outline" className="w-full">
                    Back
                  </Button>
                </div>
              )}
            </div>
          )}

          {gameState === "menu" && (
            <div className="space-y-4 text-center py-8">
              <h3 className="text-2xl font-bold">Battle Menu</h3>
              <p className="text-muted-foreground">What will you do?</p>
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                <Button onClick={() => setGameState("battle")} size="lg">
                  Continue Battle
                </Button>
                <Button onClick={flee} variant="destructive" size="lg">
                  Flee Battle
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
