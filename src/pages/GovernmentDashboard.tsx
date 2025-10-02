import DashboardLayout from "@/components/DashboardLayout";
import KPICard from "@/components/KPICard";
import MapComponent from "@/components/MapComponent";
import { Building2, Target, TrendingUp, Map } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const seasonalData = [
  { season: "Spring", generation: 62000 },
  { season: "Summer", generation: 85000 },
  { season: "Fall", generation: 54000 },
  { season: "Winter", generation: 38000 },
];

const wardData = [
  { ward: "Ward 1", potential: 42 },
  { ward: "Ward 2", potential: 68 },
  { ward: "Ward 3", potential: 55 },
  { ward: "Ward 4", potential: 71 },
  { ward: "Ward 5", potential: 49 },
];

const GovernmentDashboard = () => {
  return (
    <DashboardLayout role="Government">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Government Planning Dashboard</h1>
          <p className="text-muted-foreground">
            City-wide solar potential mapping and policy impact analysis
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid md:grid-cols-4 gap-4">
          <KPICard
            title="Total Solar Potential"
            value="285 MW"
            subtitle="City-wide capacity"
            icon={Building2}
          />
          <KPICard
            title="Suitable Rooftops"
            value="68%"
            subtitle="Of total buildings"
            icon={Map}
            trend={{ value: "5% increase", positive: true }}
          />
          <KPICard
            title="Carbon Reduction"
            value="142,000 tons"
            subtitle="Annual CO₂ savings"
            icon={Target}
            trend={{ value: "Target: 150k tons", positive: true }}
          />
          <KPICard
            title="Policy Impact"
            value="+24%"
            subtitle="Adoption vs baseline"
            icon={TrendingUp}
            trend={{ value: "Above projection", positive: true }}
          />
        </div>

        {/* Map */}
        <div>
          <h2 className="text-xl font-semibold mb-4">City Hotspot Zones</h2>
          <MapComponent height="500px" />
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Seasonal Generation Variation</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={seasonalData}>
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
                <Bar dataKey="generation" fill="hsl(var(--accent))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Ward Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={wardData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                <YAxis dataKey="ward" type="category" stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }}
                />
                <Bar dataKey="potential" fill="hsl(var(--primary))" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Export Section */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Export Policy Reports</h3>
              <p className="text-sm text-muted-foreground">
                Download city-wide analysis and sustainability metrics
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

export default GovernmentDashboard;