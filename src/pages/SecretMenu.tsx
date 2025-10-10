import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Sparkles, Trophy, Gift, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SecretMenu = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-accent/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl mb-2">🎉 Secret Menu!</CardTitle>
          <CardDescription className="text-lg">
            You found the hidden menu! Here are all the secret features.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button
              onClick={() => navigate("/treasure")}
              className="h-20 text-lg"
              variant="hero"
            >
              <Trophy className="mr-2 h-6 w-6" />
              Treasure Room
            </Button>
            <Button
              onClick={() => navigate("/konami")}
              className="h-20 text-lg"
              variant="secondary"
            >
              <Sparkles className="mr-2 h-6 w-6" />
              Konami Zone
            </Button>
            <Button
              onClick={() => navigate("/dev-room")}
              className="h-20 text-lg"
              variant="outline"
            >
              <Zap className="mr-2 h-6 w-6" />
              Dev Room
            </Button>
            <Button
              onClick={() => navigate("/gift-box")}
              className="h-20 text-lg"
              variant="default"
            >
              <Gift className="mr-2 h-6 w-6" />
              Gift Box
            </Button>
          </div>

          <div className="grid grid-cols-4 gap-2 mt-4">
            <Button
              onClick={() => toast({ title: "Beep", description: "🤖" })}
              variant="outline"
              size="sm"
              className="border-purple-500 text-purple-400"
            >
              Beep
            </Button>
            <Button
              onClick={() => toast({ title: "Boop", description: "🎵" })}
              variant="outline"
              size="sm"
              className="border-purple-500 text-purple-400"
            >
              Boop
            </Button>
            <Button
              onClick={() => toast({ title: "Buzz", description: "⚡" })}
              variant="outline"
              size="sm"
              className="border-purple-500 text-purple-400"
            >
              Buzz
            </Button>
            <Button
              onClick={() => navigate("/admin-room")}
              variant="outline"
              size="sm"
              className="border-red-500 text-red-400 hover:bg-red-500/10"
            >
              🛡️
            </Button>
          </div>

          <Button
            onClick={() => navigate("/")}
            className="w-full"
            variant="ghost"
          >
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecretMenu;
