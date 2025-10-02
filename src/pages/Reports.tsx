import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar, Eye } from "lucide-react";

const reports = [
  {
    id: 1,
    title: "Q1 2025 Investment Analysis",
    type: "Investment Report",
    date: "2025-03-31",
    size: "2.4 MB",
  },
  {
    id: 2,
    title: "City-wide Solar Potential Assessment",
    type: "Policy Report",
    date: "2025-03-15",
    size: "5.1 MB",
  },
  {
    id: 3,
    title: "Grid Integration Forecast",
    type: "Utility Report",
    date: "2025-03-10",
    size: "3.2 MB",
  },
  {
    id: 4,
    title: "Rooftop Portfolio Analysis",
    type: "Investment Report",
    date: "2025-02-28",
    size: "1.8 MB",
  },
];

const Reports = () => {
  return (
    <DashboardLayout role="Reports">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Reports</h1>
            <p className="text-muted-foreground">
              View and download your generated analysis reports
            </p>
          </div>
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            Generate New Report
          </Button>
        </div>

        <div className="grid gap-4">
          {reports.map((report) => (
            <Card key={report.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{report.title}</h3>
                    <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(report.date).toLocaleDateString()}
                      </span>
                      <span>{report.type}</span>
                      <span>{report.size}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-8 text-center">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Need a Custom Report?</h3>
          <p className="text-muted-foreground mb-4">
            Generate custom reports based on specific criteria and date ranges
          </p>
          <Button variant="outline">Configure Custom Report</Button>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Reports;