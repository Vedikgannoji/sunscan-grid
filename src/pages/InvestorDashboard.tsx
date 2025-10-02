import DashboardLayout from "@/components/DashboardLayout";
import KPICard from "@/components/KPICard";
import MapComponent from "@/components/MapComponent";
import { Building2, Zap, TrendingUp, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const monthlyData = [
  { month: "Jan", yield: 4200 },
  { month: "Feb", yield: 4800 },
  { month: "Mar", yield: 5400 },
  { month: "Apr", yield: 6200 },
  { month: "May", yield: 7100 },
  { month: "Jun", yield: 7800 },
  { month: "Jul", yield: 8200 },
  { month: "Aug", yield: 7600 },
  { month: "Sep", yield: 6800 },
  { month: "Oct", yield: 5900 },
  { month: "Nov", yield: 4600 },
  { month: "Dec", yield: 4000 },
];

const roiData = [
  { scenario: "Conservative", roi: 8.2 },
  { scenario: "Base", roi: 12.5 },
  { scenario: "Optimistic", roi: 16.8 },
];

const InvestorDashboard = () => {
  return (
    <DashboardLayout role="Investor">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Investment Dashboard</h1>
          <p className="text-muted-foreground">
            Analyze rooftop solar opportunities and ROI projections
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid md:grid-cols-4 gap-4">
          <KPICard
            title="Total Rooftop Area"
            value="142,500 m²"
            subtitle="Analyzed properties"
            icon={Building2}
            trend={{ value: "12% vs last month", positive: true }}
          />
          <KPICard
            title="PV Capacity"
            value="18.5 MW"
            subtitle="Total installation potential"
            icon={Zap}
            trend={{ value: "8% increase", positive: true }}
          />
          <KPICard
            title="Annual Yield"
            value="24,800 MWh"
            subtitle="Estimated generation"
            icon={Calendar}
            trend={{ value: "15% above target", positive: true }}
          />
          <KPICard
            title="Avg ROI"
            value="12.5%"
            subtitle="3.2 year payback"
            icon={TrendingUp}
            trend={{ value: "2.1% improvement", positive: true }}
          />
        </div>

        {/* Map */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Building Portfolio Map</h2>
          <MapComponent height="500px" />
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Monthly Energy Yield</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="yield" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">ROI Sensitivity Analysis</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={roiData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="scenario" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }}
                />
                <Bar dataKey="roi" fill="hsl(var(--accent))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Export Section */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Export Investment Reports</h3>
              <p className="text-sm text-muted-foreground">
                Download detailed analysis and projections
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

export default InvestorDashboard;