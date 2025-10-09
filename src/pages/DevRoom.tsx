import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Code, Terminal, GitBranch } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DevRoom = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const runCode = (message: string) => {
    toast({
      title: "Code Executed!",
      description: message,
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-green-400 font-mono">
      <div className="container mx-auto p-4 min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-2xl bg-gray-900 border-green-500">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl mb-2 text-green-400">{'<DevRoom />'}</CardTitle>
            <CardDescription className="text-lg text-green-300">
              // Welcome to the developer's secret space
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-black p-4 rounded border border-green-500">
              <pre className="text-sm">
                <code>{`function secretMessage() {
  console.log("You found the dev room!");
  return "🎉 Keep exploring!";
}

secretMessage();`}</code>
              </pre>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Button
                onClick={() => runCode("console.log('Hello, World!')")}
                variant="outline"
                className="h-20 border-green-500 text-green-400 hover:bg-green-500/10"
              >
                <Terminal className="mr-2" />
                Run Code
              </Button>
              <Button
                onClick={() => runCode("git commit -m 'Found secret!'")}
                variant="outline"
                className="h-20 border-green-500 text-green-400 hover:bg-green-500/10"
              >
                <GitBranch className="mr-2" />
                Git Push
              </Button>
              <Button
                onClick={() => runCode("npm run discover")}
                variant="outline"
                className="h-20 border-green-500 text-green-400 hover:bg-green-500/10"
              >
                <Code className="mr-2" />
                Debug
              </Button>
            </div>

            <Button
              onClick={() => navigate("/")}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              <Home className="mr-2 h-4 w-4" />
              exit()
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DevRoom;
