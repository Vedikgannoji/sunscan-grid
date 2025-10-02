import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sun, MapPin, BarChart3, ChevronRight, Zap, TrendingUp, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      {/* Navbar */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sun className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">City PV Estimator</span>
          </div>
          <div className="flex gap-3">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-gradient-to-r from-primary to-accent">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-fade-in">
            Unlock Your City's Solar Potential
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Advanced analytics platform for estimating rooftop photovoltaic capacity across urban areas. 
            Data-driven insights for investors, governments, and utilities.
          </p>
          <div className="flex gap-4 justify-center pt-6">
            <Link to="/signup">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent text-lg">
                Start Free Trial <ChevronRight className="ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="p-6 space-y-4 hover:shadow-lg transition-all">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">1. Select Area</h3>
            <p className="text-muted-foreground">
              Use our interactive map to draw polygons and select target areas for analysis
            </p>
          </Card>

          <Card className="p-6 space-y-4 hover:shadow-lg transition-all">
            <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
              <Zap className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold">2. Estimate Potential</h3>
            <p className="text-muted-foreground">
              AI-powered algorithms calculate solar capacity, yield, and ROI based on local data
            </p>
          </Card>

          <Card className="p-6 space-y-4 hover:shadow-lg transition-all">
            <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-success" />
            </div>
            <h3 className="text-xl font-semibold">3. View Reports</h3>
            <p className="text-muted-foreground">
              Generate comprehensive reports with visualizations, exports, and actionable insights
            </p>
          </Card>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-secondary/30 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Built for Every Stakeholder</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 space-y-4">
              <TrendingUp className="h-10 w-10 text-primary" />
              <h3 className="text-2xl font-semibold">Investors</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• ROI & payback analysis</li>
                <li>• Building-level assessments</li>
                <li>• Risk-adjusted projections</li>
                <li>• Portfolio optimization</li>
              </ul>
            </Card>

            <Card className="p-8 space-y-4">
              <Globe className="h-10 w-10 text-accent" />
              <h3 className="text-2xl font-semibold">Government</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• City-wide potential mapping</li>
                <li>• Policy impact modeling</li>
                <li>• Sustainability targets</li>
                <li>• Ward-level comparisons</li>
              </ul>
            </Card>

            <Card className="p-8 space-y-4">
              <Zap className="h-10 w-10 text-success" />
              <h3 className="text-2xl font-semibold">Utilities</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Grid capacity planning</li>
                <li>• Peak demand analysis</li>
                <li>• Integration forecasting</li>
                <li>• Hotspot identification</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">Trusted by Industry Leaders</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="p-6 space-y-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Sun key={i} className="h-5 w-5 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-muted-foreground italic">
              "This platform reduced our site assessment time by 80%. The ROI calculator is incredibly accurate."
            </p>
            <div>
              <p className="font-semibold">Sarah Chen</p>
              <p className="text-sm text-muted-foreground">Investment Director, SolarVest Capital</p>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Sun key={i} className="h-5 w-5 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-muted-foreground italic">
              "Essential tool for our renewable energy transition planning. The policy insights are game-changing."
            </p>
            <div>
              <p className="font-semibold">Michael Torres</p>
              <p className="text-sm text-muted-foreground">Urban Planning Commissioner</p>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-accent py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join hundreds of organizations making data-driven solar investment decisions
          </p>
          <Link to="/signup">
            <Button size="lg" variant="secondary" className="text-lg">
              Start Your Free Trial <ChevronRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sun className="h-6 w-6 text-primary" />
                <span className="font-bold">City PV Estimator</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Professional solar analytics for urban environments
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Features</li>
                <li>Pricing</li>
                <li>Case Studies</li>
                <li>Documentation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About Us</li>
                <li>Careers</li>
                <li>Contact</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Cookie Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2025 City PV Estimator. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;