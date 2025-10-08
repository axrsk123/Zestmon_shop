import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Trophy, ArrowLeft } from "lucide-react";

interface QuizGameProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onGameEnd?: (score: number) => void;
}

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  emoji: string;
}

const QuizGame = ({ isOpen, onClose, onBack, onGameEnd }: QuizGameProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameState, setGameState] = useState<"playing" | "finished">("playing");
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);

  const questions: Question[] = [
    {
      question: "What is the main ingredient in lemonade?",
      options: ["Oranges", "Lemons", "Limes", "Grapefruits"],
      correctAnswer: 1,
      emoji: "🍋"
    },
    {
      question: "Which vitamin is abundant in lemons?",
      options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
      correctAnswer: 2,
      emoji: "💊"
    },
    {
      question: "What gives lemonade its sour taste?",
      options: ["Sugar", "Water", "Citric acid", "Salt"],
      correctAnswer: 2,
      emoji: "😋"
    },
    {
      question: "Which country is believed to be the origin of lemons?",
      options: ["USA", "India", "Brazil", "Spain"],
      correctAnswer: 1,
      emoji: "🌍"
    },
    {
      question: "What color are ripe lemons?",
      options: ["Green", "Yellow", "Orange", "Red"],
      correctAnswer: 1,
      emoji: "🎨"
    },
  ];

  useEffect(() => {
    const saved = localStorage.getItem("quiz-highscore");
    if (saved) setHighScore(parseInt(saved));
  }, []);

  useEffect(() => {
    if (gameState !== "playing" || selectedAnswer !== null) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleAnswer(-1);
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, currentQuestion, selectedAnswer]);

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    
    const isCorrect = answerIndex === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      const points = Math.max(10, timeLeft * 10);
      setScore(score + points);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setTimeLeft(15);
      } else {
        const finalScore = isCorrect ? score + Math.max(10, timeLeft * 10) : score;
        if (finalScore > highScore) {
          setHighScore(finalScore);
          localStorage.setItem("quiz-highscore", finalScore.toString());
          onGameEnd?.(finalScore);
        }
        setGameState("finished");
      }
    }, 1500);
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setGameState("playing");
    setSelectedAnswer(null);
    setTimeLeft(15);
  };

  const getButtonVariant = (index: number) => {
    if (selectedAnswer === null) return "outline";
    if (index === questions[currentQuestion].correctAnswer) return "default";
    if (index === selectedAnswer) return "destructive";
    return "outline";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">High Score: {highScore}</div>
        <div className="text-sm font-semibold">Score: {score}</div>
      </div>

      {gameState === "playing" && (
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Question {currentQuestion + 1}/{questions.length}</span>
              <span>Time: {timeLeft}s</span>
            </div>
            <Progress value={(timeLeft / 15) * 100} className="h-2" />
          </div>

          <div className="text-center space-y-4">
            <div className="text-6xl">{questions[currentQuestion].emoji}</div>
            <h3 className="text-lg sm:text-xl font-bold px-2">{questions[currentQuestion].question}</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                variant={getButtonVariant(index)}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                className="h-auto py-4 px-4 text-sm sm:text-base"
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      )}

      {gameState === "finished" && (
        <div className="space-y-6 text-center py-8">
          <div className="text-6xl">🏆</div>
          <h3 className="text-2xl font-bold">Quiz Complete!</h3>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-primary">{score} points</p>
            <p className="text-muted-foreground">
              You got {score / 100} out of {questions.length} correct!
            </p>
          </div>
          <div className="flex gap-4 justify-center">
            <Button onClick={resetGame}>Play Again</Button>
            <Button onClick={onBack} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Menu
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizGame;
