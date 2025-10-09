import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const Matrix = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState<string[]>([]);

  useEffect(() => {
    const characters = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const columns = Math.floor(window.innerWidth / 20);
    
    const interval = setInterval(() => {
      const newCode = Array.from({ length: columns }, () => 
        characters[Math.floor(Math.random() * characters.length)]
      );
      setCode(newCode);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      <div className="absolute inset-0 flex flex-wrap gap-0">
        {code.map((char, i) => (
          <div
            key={i}
            className="text-green-500 font-mono text-xl animate-pulse"
            style={{
              width: "20px",
              opacity: Math.random(),
            }}
          >
            {char}
          </div>
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center space-y-6 bg-black/80 p-8 rounded-lg border border-green-500">
          <h1 className="text-4xl font-bold text-green-500 font-mono">
            WELCOME TO THE MATRIX
          </h1>
          <p className="text-green-400 font-mono">
            {">"} You have entered the digital realm...
          </p>
          <div className="text-green-300 font-mono text-sm space-y-1">
            <p>{">"} Reality.exe loading...</p>
            <p>{">"} Consciousness uploaded...</p>
            <p>{">"} System online...</p>
          </div>
          <Button
            onClick={() => navigate("/")}
            className="bg-green-600 hover:bg-green-700 text-white font-mono"
          >
            <Home className="mr-2 h-4 w-4" />
            DISCONNECT
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Matrix;
