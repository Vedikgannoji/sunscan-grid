import DashboardLayout from "@/components/DashboardLayout";
import MapComponent from "@/components/MapComponent";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Save } from "lucide-react";

const PolygonTool = () => {
  return (
    <DashboardLayout role="Polygon Tool">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Polygon Analysis Tool</h1>
          <p className="text-muted-foreground">
            Draw custom polygons to calculate solar potential for specific areas
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2">
            <MapComponent height="650px" />
          </div>

          {/* Results Panel */}
          <Card className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Analysis Results</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <p className="text-sm text-muted-foreground">Selected Area</p>
                  <p className="text-2xl font-bold">0 m²</p>
                </div>

                <div className="p-4 rounded-lg bg-secondary/50">
                  <p className="text-sm text-muted-foreground">Usable Rooftop Area</p>
                  <p className="text-2xl font-bold">0 m²</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    (70% of selected area)
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-primary/10">
                  <p className="text-sm text-muted-foreground">PV Capacity</p>
                  <p className="text-2xl font-bold text-primary">0 MW</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    @200 W/m²
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-accent/10">
                  <p className="text-sm text-muted-foreground">Annual Yield</p>
                  <p className="text-2xl font-bold text-accent">0 MWh</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Based on local irradiance
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-success/10">
                  <p className="text-sm text-muted-foreground">Est. ROI</p>
                  <p className="text-2xl font-bold text-success">0%</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    3.5 year payback period
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t">
              <Button className="w-full" size="lg">
                <Save className="h-4 w-4 mr-2" />
                Save Analysis
              </Button>
              <Button variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Export Results
              </Button>
            </div>

            <div className="p-4 rounded-lg bg-muted/50">
              <h4 className="font-medium mb-2 text-sm">Instructions:</h4>
              <ol className="text-xs space-y-1 text-muted-foreground list-decimal list-inside">
                <li>Click on the map to start drawing</li>
                <li>Click to add polygon points</li>
                <li>Double-click to complete</li>
                <li>Results will auto-calculate</li>
              </ol>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PolygonTool;