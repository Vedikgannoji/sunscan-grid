import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Globe, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role: string, path: string) => {
    toast.success(`Selected ${role} role`);
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Choose Your Role</h1>
          <p className="text-muted-foreground text-lg">
            Select your primary use case to customize your dashboard experience
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-8 space-y-6 hover:shadow-xl transition-all cursor-pointer group">
            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Investor</h2>
              <p className="text-muted-foreground">
                Analyze ROI, payback periods, and investment opportunities across rooftop portfolios
              </p>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✓ ROI & payback calculator</li>
              <li>✓ Building-level assessments</li>
              <li>✓ Risk-adjusted projections</li>
              <li>✓ Portfolio optimization tools</li>
            </ul>
            <Button 
              className="w-full" 
              onClick={() => handleRoleSelect("Investor", "/dashboard/investor")}
            >
              Select Investor
            </Button>
          </Card>

          <Card className="p-8 space-y-6 hover:shadow-xl transition-all cursor-pointer group">
            <div className="h-16 w-16 rounded-2xl bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Globe className="h-8 w-8 text-accent" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Government</h2>
              <p className="text-muted-foreground">
                Map city-wide solar potential and model policy impacts for sustainability goals
              </p>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✓ City-wide potential mapping</li>
              <li>✓ Policy impact modeling</li>
              <li>✓ Sustainability target tracking</li>
              <li>✓ Ward-level comparisons</li>
            </ul>
            <Button 
              className="w-full bg-accent hover:bg-accent/90" 
              onClick={() => handleRoleSelect("Government", "/dashboard/government")}
            >
              Select Government
            </Button>
          </Card>

          <Card className="p-8 space-y-6 hover:shadow-xl transition-all cursor-pointer group">
            <div className="h-16 w-16 rounded-2xl bg-success/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Zap className="h-8 w-8 text-success" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Utility</h2>
              <p className="text-muted-foreground">
                Plan grid capacity and forecast solar integration for demand management
              </p>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✓ Grid capacity planning</li>
              <li>✓ Peak demand analysis</li>
              <li>✓ Integration forecasting</li>
              <li>✓ Hotspot identification</li>
            </ul>
            <Button 
              className="w-full bg-success hover:bg-success/90" 
              onClick={() => handleRoleSelect("Utility", "/dashboard/utility")}
            >
              Select Utility
            </Button>
          </Card>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          You can change your role anytime in settings
        </p>
      </div>
    </div>
  );
};

export default RoleSelection;