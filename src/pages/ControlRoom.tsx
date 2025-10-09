import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Power, Zap, Settings, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ControlRoom = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [systemStatus, setSystemStatus] = useState({
    power: true,
    security: true,
    database: true,
    api: true,
  });

  const toggleSystem = (system: keyof typeof systemStatus) => {
    setSystemStatus(prev => ({ ...prev, [system]: !prev[system] }));
    toast({
      title: `System ${!systemStatus[system] ? "Activated" : "Deactivated"}`,
      description: `${system.toUpperCase()} is now ${!systemStatus[system] ? "online" : "offline"}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <div className="container mx-auto min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-4xl bg-slate-900/90 backdrop-blur border-blue-500">
          <CardHeader className="text-center border-b border-blue-500">
            <CardTitle className="text-4xl mb-2 text-blue-300 flex items-center justify-center gap-2">
              <Settings className="h-8 w-8 animate-spin" style={{ animationDuration: "3s" }} />
              Control Room
            </CardTitle>
            <CardDescription className="text-lg text-blue-200">
              Master System Controls
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className={`${systemStatus.power ? "bg-green-900/50 border-green-500" : "bg-red-900/50 border-red-500"}`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Power className="h-5 w-5" />
                        Main Power
                      </h3>
                      <p className="text-sm text-gray-300">
                        {systemStatus.power ? "Online" : "Offline"}
                      </p>
                    </div>
                    <Button
                      onClick={() => toggleSystem("power")}
                      variant={systemStatus.power ? "default" : "destructive"}
                      size="sm"
                    >
                      Toggle
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className={`${systemStatus.security ? "bg-green-900/50 border-green-500" : "bg-red-900/50 border-red-500"}`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <AlertCircle className="h-5 w-5" />
                        Security
                      </h3>
                      <p className="text-sm text-gray-300">
                        {systemStatus.security ? "Protected" : "Vulnerable"}
                      </p>
                    </div>
                    <Button
                      onClick={() => toggleSystem("security")}
                      variant={systemStatus.security ? "default" : "destructive"}
                      size="sm"
                    >
                      Toggle
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className={`${systemStatus.database ? "bg-green-900/50 border-green-500" : "bg-red-900/50 border-red-500"}`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Settings className="h-5 w-5" />
                        Database
                      </h3>
                      <p className="text-sm text-gray-300">
                        {systemStatus.database ? "Connected" : "Disconnected"}
                      </p>
                    </div>
                    <Button
                      onClick={() => toggleSystem("database")}
                      variant={systemStatus.database ? "default" : "destructive"}
                      size="sm"
                    >
                      Toggle
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className={`${systemStatus.api ? "bg-green-900/50 border-green-500" : "bg-red-900/50 border-red-500"}`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Zap className="h-5 w-5" />
                        API Services
                      </h3>
                      <p className="text-sm text-gray-300">
                        {systemStatus.api ? "Active" : "Inactive"}
                      </p>
                    </div>
                    <Button
                      onClick={() => toggleSystem("api")}
                      variant={systemStatus.api ? "default" : "destructive"}
                      size="sm"
                    >
                      Toggle
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-blue-950 p-4 rounded border border-blue-500">
              <h3 className="text-lg font-semibold mb-2 text-blue-300">System Status</h3>
              <div className="text-sm text-blue-200 space-y-1 font-mono">
                <p>{">"} All systems: {Object.values(systemStatus).every(Boolean) ? "OPERATIONAL ✓" : "WARNING ⚠"}</p>
                <p>{">"} Uptime: 99.9%</p>
                <p>{">"} Active connections: 42</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => navigate("/dev-room")}
                variant="outline"
                className="flex-1 border-blue-500 text-blue-300 hover:bg-blue-500/10"
              >
                Back to Dev Room
              </Button>
              <Button
                onClick={() => navigate("/")}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
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

export default ControlRoom;
