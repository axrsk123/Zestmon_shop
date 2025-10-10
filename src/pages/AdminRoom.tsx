import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Home, Plus, Trash2, Edit, Shield, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const drinkSchema = z.object({
  name: z.string().trim().min(1).max(100),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
  stock: z.string().regex(/^\d+$/, "Must be a number"),
  category: z.string().trim().min(1).max(50),
});

const AdminRoom = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [drinks, setDrinks] = useState<any[]>([]);
  const [drinkForm, setDrinkForm] = useState({ name: "", price: "", stock: "", category: "Fruit Fusion" });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    checkAdminStatus();
    fetchDrinks();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/");
        return;
      }

      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .single();

      if (error || !data) {
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges. Contact support with your user ID to become admin.",
          variant: "destructive",
        });
        setTimeout(() => navigate("/"), 2000);
        return;
      }

      setIsAdmin(true);
    } catch (error) {
      navigate("/");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDrinks = async () => {
    const { data, error } = await supabase
      .from("drinks_stock")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setDrinks(data);
    }
  };

  const handleSubmit = async () => {
    const result = drinkSchema.safeParse(drinkForm);
    
    if (!result.success) {
      toast({
        title: "Validation Error",
        description: result.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    const drinkData = {
      name: result.data.name,
      price: parseFloat(result.data.price),
      stock: parseInt(result.data.stock),
      category: result.data.category,
    };

    if (editingId) {
      const { error } = await supabase
        .from("drinks_stock")
        .update(drinkData)
        .eq("id", editingId);

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
        return;
      }
      
      toast({ title: "Success", description: "Drink updated!" });
      setEditingId(null);
    } else {
      const { error } = await supabase
        .from("drinks_stock")
        .insert([drinkData]);

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
        return;
      }
      
      toast({ title: "Success", description: "Drink added!" });
    }

    setDrinkForm({ name: "", price: "", stock: "", category: "Fruit Fusion" });
    fetchDrinks();
  };

  const handleEdit = (drink: any) => {
    setDrinkForm({
      name: drink.name,
      price: drink.price.toString(),
      stock: drink.stock.toString(),
      category: drink.category,
    });
    setEditingId(drink.id);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from("drinks_stock")
      .delete()
      .eq("id", id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }

    toast({ title: "Deleted", description: "Drink removed from inventory" });
    fetchDrinks();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-950 via-red-900 to-black flex items-center justify-center">
        <div className="text-red-300 text-2xl animate-pulse">Verifying credentials...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-red-900 to-black text-red-100 font-mono">
      <div className="container mx-auto p-4 min-h-screen">
        <Card className="w-full bg-black/80 border-red-500 mt-8">
          <CardHeader className="text-center border-b border-red-500">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shield className="h-8 w-8 text-red-400" />
              <CardTitle className="text-4xl text-red-400">ADMIN ROOM</CardTitle>
              <Shield className="h-8 w-8 text-red-400" />
            </div>
            <CardDescription className="text-lg text-red-300">
              // RESTRICTED ACCESS - AUTHORIZED PERSONNEL ONLY
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Drink Management */}
            <div className="bg-black/60 p-6 rounded border border-red-500 space-y-4">
              <h3 className="text-2xl font-bold text-red-400">Drink Stock Management</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-red-300">Drink Name</Label>
                  <Input
                    value={drinkForm.name}
                    onChange={(e) => setDrinkForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Strawberry Lemonade"
                    maxLength={100}
                    className="bg-red-950 border-red-500 text-red-100"
                  />
                </div>
                <div>
                  <Label className="text-red-300">Category</Label>
                  <Input
                    value={drinkForm.category}
                    onChange={(e) => setDrinkForm(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="Fruit Fusion"
                    className="bg-red-950 border-red-500 text-red-100"
                  />
                </div>
                <div>
                  <Label className="text-red-300">Price ($)</Label>
                  <Input
                    value={drinkForm.price}
                    onChange={(e) => setDrinkForm(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="5.99"
                    className="bg-red-950 border-red-500 text-red-100"
                  />
                </div>
                <div>
                  <Label className="text-red-300">Stock</Label>
                  <Input
                    value={drinkForm.stock}
                    onChange={(e) => setDrinkForm(prev => ({ ...prev, stock: e.target.value }))}
                    placeholder="100"
                    className="bg-red-950 border-red-500 text-red-100"
                  />
                </div>
              </div>
              <Button
                onClick={handleSubmit}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                {editingId ? <Edit className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
                {editingId ? "Update Drink" : "Add Drink"}
              </Button>
              {editingId && (
                <Button
                  onClick={() => {
                    setEditingId(null);
                    setDrinkForm({ name: "", price: "", stock: "", category: "Fruit Fusion" });
                  }}
                  variant="outline"
                  className="w-full border-red-500 text-red-400"
                >
                  Cancel Edit
                </Button>
              )}
            </div>

            {/* Current Inventory */}
            <div className="bg-black/60 p-6 rounded border border-red-500 space-y-3">
              <h4 className="text-xl font-bold text-red-400">Current Inventory</h4>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {drinks.map((drink) => (
                  <div key={drink.id} className="bg-red-950/50 p-3 rounded border border-red-700 flex items-center justify-between">
                    <div>
                      <div className="text-red-100 font-semibold">{drink.name}</div>
                      <div className="text-sm text-red-300">{drink.category} • ${drink.price} • Stock: {drink.stock}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleEdit(drink)}
                        variant="outline"
                        className="border-red-500 text-red-400 hover:bg-red-500/10"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleDelete(drink.id)}
                        variant="outline"
                        className="border-red-500 text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {drinks.length === 0 && (
                  <div className="text-center text-red-400 py-8">
                    <AlertTriangle className="h-12 w-12 mx-auto mb-2" />
                    No drinks in inventory
                  </div>
                )}
              </div>
            </div>

            {/* Useless Buttons */}
            <div className="bg-black/60 p-6 rounded border border-red-500 space-y-3">
              <h4 className="text-xl font-bold text-red-400">Useless Admin Controls</h4>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  onClick={() => toast({ title: "Beep Boop", description: "Button pressed successfully" })}
                  variant="outline"
                  className="border-red-500 text-red-400 hover:bg-red-500/10"
                >
                  Do Nothing
                </Button>
                <Button
                  onClick={() => toast({ title: "🎉", description: "Congratulations! Nothing happened." })}
                  variant="outline"
                  className="border-red-500 text-red-400 hover:bg-red-500/10"
                >
                  Press Me
                </Button>
                <Button
                  onClick={() => toast({ title: "Error 404", description: "Button functionality not found" })}
                  variant="outline"
                  className="border-red-500 text-red-400 hover:bg-red-500/10"
                >
                  Mystery
                </Button>
                <Button
                  onClick={() => toast({ title: "Success!", description: "Successfully did nothing" })}
                  variant="outline"
                  className="border-red-500 text-red-400 hover:bg-red-500/10"
                >
                  Click Here
                </Button>
                <Button
                  onClick={() => toast({ title: "Loading...", description: "Still loading... forever" })}
                  variant="outline"
                  className="border-red-500 text-red-400 hover:bg-red-500/10"
                >
                  Load
                </Button>
                <Button
                  onClick={() => toast({ title: "Admin Power!", description: "You feel powerful but nothing changed" })}
                  variant="outline"
                  className="border-red-500 text-red-400 hover:bg-red-500/10"
                >
                  Power Mode
                </Button>
              </div>
            </div>

            <Button
              onClick={() => navigate("/")}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              <Home className="mr-2 h-4 w-4" />
              Exit Admin Room
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminRoom;