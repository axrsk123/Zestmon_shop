import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Copy, LogOut, Shield, Sparkles, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/auth");
      return;
    }
    setUser(user);

    // Check if admin
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .single();

    if (data) {
      setIsAdmin(true);
    }
  };

  const copyUserId = () => {
    if (user) {
      navigator.clipboard.writeText(user.id);
      toast({
        title: "Copied!",
        description: "User ID copied to clipboard",
      });
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed Out",
      description: "See you soon!",
    });
    navigate("/");
  };

  const handleSecretClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    if (newCount === 5) {
      toast({
        title: "🎉 Secret Unlocked!",
        description: "You found the secret! Check the Dev Room...",
      });
    } else if (newCount === 10) {
      toast({
        title: "🌟 Super Secret!",
        description: "You're persistent! Here's a cookie: 🍪",
      });
    } else if (newCount === 20) {
      toast({
        title: "🚀 Ultimate Secret!",
        description: "Okay you win! You get... absolutely nothing! 😄",
      });
      setClickCount(0);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-accent/20 p-4">
      <div className="container mx-auto max-w-4xl mt-8">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Your Profile</CardTitle>
            <CardDescription>Account information and settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* User Info */}
            <div className="bg-muted/50 p-6 rounded-lg space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Email</h3>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">User ID</h3>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-background p-3 rounded text-sm break-all">
                    {user.id}
                  </code>
                  <Button onClick={copyUserId} size="icon" variant="outline">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Share this with admin to get special access
                </p>
              </div>

              {isAdmin && (
                <div className="bg-red-500/10 border border-red-500 p-4 rounded">
                  <div className="flex items-center gap-2 text-red-500">
                    <Shield className="h-5 w-5" />
                    <span className="font-bold">ADMIN ACCESS GRANTED</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-2">
                {isAdmin && (
                  <Button
                    onClick={() => navigate("/admin-room")}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Admin Room
                  </Button>
                )}
                <Button
                  onClick={() => navigate("/dev-room")}
                  variant="outline"
                >
                  <Zap className="mr-2 h-4 w-4" />
                  Dev Room
                </Button>
                <Button
                  onClick={() => navigate("/secret-menu")}
                  variant="outline"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Secret Menu
                </Button>
                <Button
                  onClick={handleSecretClick}
                  variant="outline"
                >
                  🎯 Click Me
                </Button>
              </div>
            </div>

            {/* Useless Fun Buttons */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Fun Zone</h3>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  onClick={() => toast({ title: "Boop!", description: "👃" })}
                  variant="outline"
                  size="sm"
                >
                  Boop
                </Button>
                <Button
                  onClick={() => toast({ title: "Honk!", description: "🚗" })}
                  variant="outline"
                  size="sm"
                >
                  Honk
                </Button>
                <Button
                  onClick={() => toast({ title: "Meow!", description: "🐱" })}
                  variant="outline"
                  size="sm"
                >
                  Meow
                </Button>
                <Button
                  onClick={() => toast({ title: "Woof!", description: "🐶" })}
                  variant="outline"
                  size="sm"
                >
                  Woof
                </Button>
                <Button
                  onClick={() => toast({ title: "Quack!", description: "🦆" })}
                  variant="outline"
                  size="sm"
                >
                  Quack
                </Button>
                <Button
                  onClick={() => toast({ title: Math.random() > 0.5 ? "Heads!" : "Tails!", description: "🪙" })}
                  variant="outline"
                  size="sm"
                >
                  Flip Coin
                </Button>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => navigate("/")}
                variant="outline"
                className="flex-1"
              >
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
              <Button
                onClick={handleSignOut}
                variant="destructive"
                className="flex-1"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>

            {clickCount > 0 && clickCount < 20 && (
              <p className="text-center text-xs text-muted-foreground">
                Secret clicks: {clickCount}/20
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;