import DashboardLayout from "@/components/DashboardLayout";
import KPICard from "@/components/KPICard";
import MapComponent from "@/components/MapComponent";
import { Zap, Activity, AlertCircle, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const peakData = [
  { time: "6AM", solar: 0, demand: 45 },
  { time: "9AM", solar: 35, demand: 70 },
  { time: "12PM", solar: 85, demand: 82 },
  { time: "3PM", solar: 75, demand: 90 },
  { time: "6PM", solar: 20, demand: 95 },
  { time: "9PM", solar: 0, demand: 60 },
];

const seasonalPeak = [
  { season: "Spring", availability: 72 },
  { season: "Summer", availability: 88 },
  { season: "Fall", availability: 65 },
  { season: "Winter", availability: 48 },
];

const UtilityDashboard = () => {
  return (
    <DashboardLayout role="Utility">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Utility Planning Dashboard</h1>
          <p className="text-muted-foreground">
            Grid capacity analysis and solar integration forecasting
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid md:grid-cols-4 gap-4">
          <KPICard
            title="Grid Capacity"
            value="420 MW"
            subtitle="Current available"
            icon={Zap}
          />
          <KPICard
            title="Solar Potential"
            value="285 MW"
            subtitle="Rooftop generation"
            icon={TrendingUp}
            trend={{ value: "68% of capacity", positive: true }}
          />
          <KPICard
            title="Peak Match"
            value="82%"
            subtitle="Solar-demand alignment"
            icon={Activity}
            trend={{ value: "12% improvement", positive: true }}
          />
          <KPICard
            title="Hotspot Zones"
            value="14"
            subtitle="High integration areas"
            icon={AlertCircle}
          />
        </div>

        {/* Map */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Grid Demand vs Supply Heatmap</h2>
          <MapComponent height="500px" />
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Peak Solar vs Demand</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={peakData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="solar" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth={2}
                  name="Solar Generation"
                />
                <Line 
                  type="monotone" 
                  dataKey="demand" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Grid Demand"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Seasonal Solar Availability</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={seasonalPeak}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="season" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }}
                />
                <Bar dataKey="availability" fill="hsl(var(--success))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Export Section */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Export Grid Analysis Reports</h3>
              <p className="text-sm text-muted-foreground">
                Download capacity planning and integration forecasts
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Export CSV</Button>
              <Button>Generate PDF Report</Button>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UtilityDashboard;