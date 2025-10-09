import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, Code, Terminal, GitBranch, Package, BarChart3, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const stockSchema = z.object({
  name: z.string().trim().min(1).max(100),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
  stock: z.string().regex(/^\d+$/, "Must be a number"),
});

const DevRoom = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [stockForm, setStockForm] = useState({ name: "", price: "", stock: "" });
  const [stats, setStats] = useState({
    products: 10,
    orders: 47,
    revenue: 1234.56,
    visitors: 892,
  });

  const handleAddStock = () => {
    const result = stockSchema.safeParse(stockForm);
    
    if (!result.success) {
      toast({
        title: "Validation Error",
        description: result.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    const currentStock = JSON.parse(localStorage.getItem("dev-stock") || "[]");
    currentStock.push({
      id: Date.now(),
      name: result.data.name,
      price: parseFloat(result.data.price),
      stock: parseInt(result.data.stock),
    });
    localStorage.setItem("dev-stock", JSON.stringify(currentStock));
    
    toast({
      title: "Stock Added!",
      description: `${result.data.name} added to inventory`,
    });
    
    setStockForm({ name: "", price: "", stock: "" });
    setStats(prev => ({ ...prev, products: prev.products + 1 }));
  };

  const runCommand = (cmd: string, message: string) => {
    toast({
      title: `$ ${cmd}`,
      description: message,
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-green-400 font-mono">
      <div className="container mx-auto p-4 min-h-screen">
        <Card className="w-full bg-gray-900 border-green-500 mt-8">
          <CardHeader className="text-center border-b border-green-500">
            <CardTitle className="text-4xl mb-2 text-green-400">{'<DevRoom />'}</CardTitle>
            <CardDescription className="text-lg text-green-300">
              // Developer Control Panel - Authorized Personnel Only
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs defaultValue="stock" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-black border border-green-500">
                <TabsTrigger value="stock" className="data-[state=active]:bg-green-600">
                  <Package className="h-4 w-4 mr-2" />
                  Stock
                </TabsTrigger>
                <TabsTrigger value="stats" className="data-[state=active]:bg-green-600">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Stats
                </TabsTrigger>
                <TabsTrigger value="terminal" className="data-[state=active]:bg-green-600">
                  <Terminal className="h-4 w-4 mr-2" />
                  Terminal
                </TabsTrigger>
              </TabsList>

              <TabsContent value="stock" className="space-y-4 mt-6">
                <div className="bg-black p-6 rounded border border-green-500 space-y-4">
                  <h3 className="text-xl font-bold text-green-400">Add New Product</h3>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-green-400">Product Name</Label>
                      <Input
                        value={stockForm.name}
                        onChange={(e) => setStockForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Lemon Deluxe"
                        maxLength={100}
                        className="bg-gray-900 border-green-500 text-green-400"
                      />
                    </div>
                    <div>
                      <Label className="text-green-400">Price ($)</Label>
                      <Input
                        value={stockForm.price}
                        onChange={(e) => setStockForm(prev => ({ ...prev, price: e.target.value }))}
                        placeholder="4.99"
                        className="bg-gray-900 border-green-500 text-green-400"
                      />
                    </div>
                    <div>
                      <Label className="text-green-400">Stock Quantity</Label>
                      <Input
                        value={stockForm.stock}
                        onChange={(e) => setStockForm(prev => ({ ...prev, stock: e.target.value }))}
                        placeholder="100"
                        className="bg-gray-900 border-green-500 text-green-400"
                      />
                    </div>
                    <Button
                      onClick={handleAddStock}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Package className="mr-2 h-4 w-4" />
                      Add to Inventory
                    </Button>
                  </div>
                </div>

                <div className="bg-black p-4 rounded border border-green-500">
                  <h4 className="text-lg font-semibold mb-2 text-green-400">Quick Actions</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      onClick={() => navigate("/lab")}
                      variant="outline"
                      className="border-green-500 text-green-400 hover:bg-green-500/10"
                    >
                      <Zap className="mr-2 h-4 w-4" />
                      Open Lab
                    </Button>
                    <Button
                      onClick={() => navigate("/vault")}
                      variant="outline"
                      className="border-green-500 text-green-400 hover:bg-green-500/10"
                    >
                      <Code className="mr-2 h-4 w-4" />
                      Access Vault
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="stats" className="space-y-4 mt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black p-6 rounded border border-green-500">
                    <div className="text-sm text-green-300">Total Products</div>
                    <div className="text-3xl font-bold text-green-400">{stats.products}</div>
                  </div>
                  <div className="bg-black p-6 rounded border border-green-500">
                    <div className="text-sm text-green-300">Orders</div>
                    <div className="text-3xl font-bold text-green-400">{stats.orders}</div>
                  </div>
                  <div className="bg-black p-6 rounded border border-green-500">
                    <div className="text-sm text-green-300">Revenue</div>
                    <div className="text-3xl font-bold text-green-400">${stats.revenue}</div>
                  </div>
                  <div className="bg-black p-6 rounded border border-green-500">
                    <div className="text-sm text-green-300">Visitors</div>
                    <div className="text-3xl font-bold text-green-400">{stats.visitors}</div>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    setStats({
                      products: Math.floor(Math.random() * 50) + 10,
                      orders: Math.floor(Math.random() * 100) + 20,
                      revenue: parseFloat((Math.random() * 5000 + 1000).toFixed(2)),
                      visitors: Math.floor(Math.random() * 2000) + 500,
                    });
                    toast({ title: "Stats Refreshed!", description: "📊 Data updated" });
                  }}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Refresh Stats
                </Button>
              </TabsContent>

              <TabsContent value="terminal" className="space-y-4 mt-6">
                <div className="bg-black p-4 rounded border border-green-500">
                  <pre className="text-sm mb-4">
                    <code>{`$ zestmon-cli v2.0.0
> System operational
> All services running
> Ready for commands...`}</code>
                  </pre>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={() => runCommand("deploy --production", "🚀 Deploying to production...")}
                    variant="outline"
                    className="border-green-500 text-green-400 hover:bg-green-500/10"
                  >
                    <GitBranch className="mr-2" />
                    Deploy
                  </Button>
                  <Button
                    onClick={() => runCommand("test --all", "✅ Running test suite...")}
                    variant="outline"
                    className="border-green-500 text-green-400 hover:bg-green-500/10"
                  >
                    <Terminal className="mr-2" />
                    Test
                  </Button>
                  <Button
                    onClick={() => navigate("/matrix")}
                    variant="outline"
                    className="border-green-500 text-green-400 hover:bg-green-500/10"
                  >
                    <Code className="mr-2" />
                    Matrix
                  </Button>
                  <Button
                    onClick={() => navigate("/control-room")}
                    variant="outline"
                    className="border-green-500 text-green-400 hover:bg-green-500/10"
                  >
                    <BarChart3 className="mr-2" />
                    Control
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            <Button
              onClick={() => navigate("/")}
              className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white"
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
