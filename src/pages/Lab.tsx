import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Beaker, Zap, Sparkles, Flame } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Lab = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [experiments, setExperiments] = useState(0);

  const runExperiment = (name: string) => {
    setExperiments(prev => prev + 1);
    toast({
      title: "Experiment Running!",
      description: `🧪 ${name} - Experiment #${experiments + 1}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
      <div className="container mx-auto min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-3xl bg-black/50 backdrop-blur border-purple-500">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl mb-2 text-purple-300">🧪 Secret Lab</CardTitle>
            <CardDescription className="text-lg text-purple-200">
              Experimental Features Zone
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-6xl mb-4 animate-pulse">⚗️</div>
              <p className="text-purple-200 mb-2">Experiments Completed: {experiments}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                onClick={() => runExperiment("Flavor Fusion")}
                className="h-24 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Beaker className="mr-2 h-6 w-6" />
                <div className="text-left">
                  <div className="font-bold">Flavor Fusion</div>
                  <div className="text-xs">Mix new flavors</div>
                </div>
              </Button>

              <Button
                onClick={() => runExperiment("Zest Boost")}
                className="h-24 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
              >
                <Zap className="mr-2 h-6 w-6" />
                <div className="text-left">
                  <div className="font-bold">Zest Boost</div>
                  <div className="text-xs">Enhance citrus power</div>
                </div>
              </Button>

              <Button
                onClick={() => runExperiment("Sparkle Essence")}
                className="h-24 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700"
              >
                <Sparkles className="mr-2 h-6 w-6" />
                <div className="text-left">
                  <div className="font-bold">Sparkle Essence</div>
                  <div className="text-xs">Add magical fizz</div>
                </div>
              </Button>

              <Button
                onClick={() => runExperiment("Fire Lemon")}
                className="h-24 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
              >
                <Flame className="mr-2 h-6 w-6" />
                <div className="text-left">
                  <div className="font-bold">Fire Lemon</div>
                  <div className="text-xs">Spicy experiment</div>
                </div>
              </Button>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => navigate("/dev-room")}
                variant="outline"
                className="flex-1 border-purple-500 text-purple-300 hover:bg-purple-500/10"
              >
                Back to Dev Room
              </Button>
              <Button
                onClick={() => navigate("/")}
                className="flex-1 bg-purple-600 hover:bg-purple-700"
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

export default Lab;
