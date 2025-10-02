import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Settings, LogOut, FileText, Map } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface DashboardLayoutProps {
  children: ReactNode;
  role: string;
}

const DashboardLayout = ({ children, role }: DashboardLayoutProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <Sun className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">City PV Estimator</span>
            </Link>
            <span className="text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
              {role}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/polygon-tool">
              <Button variant="ghost" size="sm">
                <Map className="h-4 w-4 mr-2" />
                Polygon Tool
              </Button>
            </Link>
            <Link to="/reports">
              <Button variant="ghost" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Reports
              </Button>
            </Link>
            <Link to="/settings">
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </Link>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;