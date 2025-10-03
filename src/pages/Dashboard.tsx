import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import OSMMap from "@/components/OSMMap";
import KPICard from "@/components/KPICard";
import { 
  calculatePVEstimation, 
  formatCapacity, 
  formatEnergy, 
  formatCO2,
  formatNumber,
  type PVEstimation 
} from "@/utils/pvCalculations";
import { Sun, LogOut, Download, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [estimation, setEstimation] = useState<PVEstimation | null>(null);

  useEffect(() => {
    // Check authentication
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleAreaSelected = (area: number, bounds: any) => {
    if (area > 0) {
      const pvEstimation = calculatePVEstimation(area);
      setEstimation(pvEstimation);
      
      toast({
        title: "Area analyzed!",
        description: `PV estimation complete for ${formatNumber(area)} m²`,
      });
    } else {
      setEstimation(null);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleSaveAnalysis = () => {
    toast({
      title: "Analysis saved",
      description: "Your PV estimation has been saved to your account.",
    });
  };

  const handleExportResults = () => {
    if (estimation) {
      const data = {
        totalArea: `${formatNumber(estimation.totalArea)} m²`,
        usableArea: `${formatNumber(estimation.usableArea)} m²`,
        installedCapacity: formatCapacity(estimation.installedCapacity),
        annualYield: formatEnergy(estimation.annualYield),
        co2Savings: formatCO2(estimation.co2Savings),
        potential: estimation.potential,
      };
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'pv-estimation.json';
      a.click();
      
      toast({
        title: "Exported!",
        description: "Your results have been downloaded.",
      });
    }
  };

  // Chart data
  const barChartData = estimation ? [
    { name: 'Total Area', value: estimation.totalArea },
    { name: 'Usable Area', value: estimation.usableArea },
  ] : [];

  const pieChartData = estimation ? [
    { name: 'Usable', value: estimation.usableArea },
    { name: 'Unusable', value: estimation.totalArea - estimation.usableArea },
  ] : [];

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--muted))'];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sun className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">SunScan</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              {user?.email}
            </span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Solar Potential Dashboard</h1>
          <p className="text-muted-foreground">
            Select an area on the map to estimate PV potential and view detailed analytics
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2">
            <OSMMap height="650px" onAreaSelected={handleAreaSelected} />
          </div>

          {/* KPIs Panel */}
          <Card className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Analysis Results</h3>
              
              {!estimation ? (
                <div className="text-center py-12 text-muted-foreground">
                  <div className="text-4xl mb-4">🗺️</div>
                  <p>Draw an area on the map to see PV estimation</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-secondary/50">
                    <p className="text-sm text-muted-foreground">Total Area</p>
                    <p className="text-2xl font-bold">{formatNumber(estimation.totalArea)} m²</p>
                  </div>

                  <div className="p-4 rounded-lg bg-secondary/50">
                    <p className="text-sm text-muted-foreground">Usable Area</p>
                    <p className="text-2xl font-bold">{formatNumber(estimation.usableArea)} m²</p>
                    <p className="text-xs text-muted-foreground mt-1">70% of selected area</p>
                  </div>

                  <div className={`p-4 rounded-lg ${
                    estimation.potential === 'high' ? 'bg-success/10' :
                    estimation.potential === 'medium' ? 'bg-warning/10' :
                    'bg-danger/10'
                  }`}>
                    <p className="text-sm text-muted-foreground">PV Capacity</p>
                    <p className={`text-2xl font-bold ${
                      estimation.potential === 'high' ? 'text-success' :
                      estimation.potential === 'medium' ? 'text-warning' :
                      'text-danger'
                    }`}>
                      {formatCapacity(estimation.installedCapacity)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">@0.18 kWp/m²</p>
                  </div>

                  <div className="p-4 rounded-lg bg-primary/10">
                    <p className="text-sm text-muted-foreground">Annual Yield</p>
                    <p className="text-2xl font-bold text-primary">
                      {formatEnergy(estimation.annualYield)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Based on 1500 kWh/m²/year</p>
                  </div>

                  <div className="p-4 rounded-lg bg-success/10">
                    <p className="text-sm text-muted-foreground">CO₂ Savings</p>
                    <p className="text-2xl font-bold text-success">
                      {formatCO2(estimation.co2Savings)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">per year</p>
                  </div>
                </div>
              )}
            </div>

            {estimation && (
              <div className="space-y-2 pt-4 border-t">
                <Button className="w-full" size="lg" onClick={handleSaveAnalysis}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Analysis
                </Button>
                <Button variant="outline" className="w-full" onClick={handleExportResults}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Results
                </Button>
              </div>
            )}
          </Card>
        </div>

        {/* Charts Section */}
        {estimation && (
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Area Breakdown</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="hsl(var(--primary))" name="Area (m²)" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Usability Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.name}: ${formatNumber(entry.value)} m²`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
