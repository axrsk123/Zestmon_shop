import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  TrendingUp,
  DollarSign,
  Package,
  Users,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AdminAnalytics = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [analytics, setAnalytics] = useState<any>(null);
  const [lowStockProducts, setLowStockProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdmin();
    fetchAnalytics();
  }, []);

  const checkAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/auth");
      return;
    }

    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .single();

    if (!data) {
      navigate("/");
      toast({
        title: "Access Denied",
        description: "You don't have admin privileges",
        variant: "destructive",
      });
    }
  };

  const fetchAnalytics = async () => {
    setLoading(true);

    // Fetch orders
    const { data: ordersData } = await supabase
      .from("orders")
      .select("*");

    // Fetch customers
    const { data: customersData } = await supabase
      .from("profiles")
      .select("id");

    // Fetch products
    const { data: productsData } = await supabase
      .from("drinks_stock")
      .select("*");

    // Calculate analytics
    const totalOrders = ordersData?.length || 0;
    const totalRevenue = ordersData?.reduce(
      (sum, order) => sum + Number(order.total_amount),
      0
    ) || 0;
    const completedOrders = ordersData?.filter((o) => o.status === "completed").length || 0;
    const pendingOrders = ordersData?.filter((o) => o.status === "pending").length || 0;
    const totalCustomers = customersData?.length || 0;

    // Get low stock products (stock < 20)
    const lowStock = productsData?.filter((p) => p.stock < 20) || [];

    // Calculate average order value
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Get recent orders for trending
    const thisMonth = new Date();
    thisMonth.setDate(1);
    const lastMonth = new Date(thisMonth);
    const newMonth = lastMonth.getMonth() - 1;
    lastMonth.setMonth(newMonth);

    const thisMonthOrders = ordersData?.filter(
      (o) => new Date(o.created_at) >= thisMonth
    ).length || 0;

    const lastMonthOrders = ordersData?.filter(
      (o) =>
        new Date(o.created_at) >= lastMonth &&
        new Date(o.created_at) < thisMonth
    ).length || 0;

    const orderGrowth = lastMonthOrders > 0
      ? ((thisMonthOrders - lastMonthOrders) / lastMonthOrders) * 100
      : 0;

    setAnalytics({
      totalOrders,
      totalRevenue,
      completedOrders,
      pendingOrders,
      totalCustomers,
      avgOrderValue,
      orderGrowth,
      totalProducts: productsData?.length || 0,
    });

    setLowStockProducts(lowStock);
    setLoading(false);
  };

  if (loading || !analytics) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container">
        <Button variant="ghost" onClick={() => navigate("/admin-room")} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Admin Room
        </Button>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Analytics Dashboard</h1>
          <Badge variant={analytics.orderGrowth >= 0 ? "default" : "destructive"}>
            <TrendingUp className="h-4 w-4 mr-1" />
            {analytics.orderGrowth >= 0 ? "+" : ""}
            {analytics.orderGrowth.toFixed(1)}% this month
          </Badge>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-500" />
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${analytics.totalRevenue.toFixed(2)}</div>
              <p className="text-sm text-muted-foreground mt-1">
                Avg: ${analytics.avgOrderValue.toFixed(2)}/order
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Package className="h-4 w-4 text-blue-500" />
                Total Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{analytics.totalOrders}</div>
              <p className="text-sm text-muted-foreground mt-1">
                {analytics.completedOrders} completed, {analytics.pendingOrders} pending
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-500" />
                Total Customers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{analytics.totalCustomers}</div>
              <p className="text-sm text-muted-foreground mt-1">Registered users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Package className="h-4 w-4 text-orange-500" />
                Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{analytics.totalProducts}</div>
              <p className="text-sm text-muted-foreground mt-1">In catalog</p>
            </CardContent>
          </Card>
        </div>

        {lowStockProducts.length > 0 && (
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                Low Stock Alert
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                The following products are running low on stock:
              </p>
              <div className="space-y-2">
                {lowStockProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 bg-destructive/10 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                    </div>
                    <Badge variant="destructive">
                      {product.stock} left
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => navigate("/admin/orders")}
              >
                <Package className="mr-2 h-4 w-4" />
                View All Orders
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => navigate("/admin/customers")}
              >
                <Users className="mr-2 h-4 w-4" />
                View All Customers
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => navigate("/admin-room")}
              >
                <Package className="mr-2 h-4 w-4" />
                Manage Inventory
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Order Completion Rate</span>
                  <span className="text-sm font-semibold">
                    {analytics.totalOrders > 0
                      ? ((analytics.completedOrders / analytics.totalOrders) * 100).toFixed(1)
                      : 0}%
                  </span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{
                      width: `${analytics.totalOrders > 0
                        ? (analytics.completedOrders / analytics.totalOrders) * 100
                        : 0}%`,
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Low Stock Items</span>
                  <span className="text-sm font-semibold">
                    {lowStockProducts.length} / {analytics.totalProducts}
                  </span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-destructive h-2 rounded-full"
                    style={{
                      width: `${analytics.totalProducts > 0
                        ? (lowStockProducts.length / analytics.totalProducts) * 100
                        : 0}%`,
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
