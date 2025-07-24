import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  MapPin, 
  CheckCircle, 
  ArrowRight,
  Wheat,
  Sprout,
  Globe
} from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: <BarChart3 className="h-8 w-8 text-primary" />,
      title: "Real-time Crop Data",
      description: "Access live cultivation data across all states and districts in India"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      title: "Price Predictions",
      description: "AI-powered predictions for crop prices in the next month"
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "For Farmers & Traders",
      description: "Designed specifically for agricultural stakeholders"
    },
    {
      icon: <MapPin className="h-8 w-8 text-primary" />,
      title: "District-wise Analysis",
      description: "Detailed crop data for every district in your state"
    }
  ];

  const benefits = [
    "Make informed decisions about crop selection",
    "Predict market prices and avoid losses",
    "Plan ahead to prevent crop shortages",
    "Access region-specific agricultural data",
    "Get farming recommendations and best practices"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-accent/20 to-earth/20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-4 bg-card p-4 rounded-full shadow-lg">
                <Wheat className="h-8 w-8 text-primary" />
                <Sprout className="h-8 w-8 text-success" />
                <Globe className="h-8 w-8 text-earth" />
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Smart Agriculture
              <span className="block text-primary">Data Platform</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Empowering farmers and traders with real-time crop cultivation data, 
              price predictions, and agricultural insights to make better decisions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="w-full sm:w-auto">
                  View Crop Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/predictions">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Price Predictions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Why Choose CropWatch?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform provides comprehensive agricultural data and insights 
              to help you make informed decisions about crop cultivation and trading.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Benefits for Indian Agriculture
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our platform helps farmers and traders across India make data-driven 
                decisions, leading to better yields, reduced losses, and improved profits.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link to="/about">
                  <Button variant="outline">
                    Learn More About Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-success/20 p-8 rounded-2xl">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-success" />
                      <span>Quick Stats</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">States Covered</span>
                      <span className="font-semibold">15+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Districts</span>
                      <span className="font-semibold">200+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Crops Tracked</span>
                      <span className="font-semibold">50+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Prediction Accuracy</span>
                      <span className="font-semibold text-success">85%+</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Make Smarter Agricultural Decisions?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of farmers and traders who trust CropWatch for 
            reliable agricultural data and market insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Get Started Free
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;