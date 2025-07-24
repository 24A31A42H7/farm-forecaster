import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  Users, 
  BarChart3, 
  Shield, 
  Globe, 
  Heart,
  CheckCircle,
  Lightbulb,
  TrendingUp
} from "lucide-react";

const About = () => {
  const features = [
    {
      icon: <BarChart3 className="h-6 w-6 text-primary" />,
      title: "Real-time Data Analytics",
      description: "Live crop cultivation data across all major agricultural states and districts"
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-success" />,
      title: "AI-Powered Predictions", 
      description: "Machine learning algorithms predict price movements and market trends"
    },
    {
      icon: <Shield className="h-6 w-6 text-earth" />,
      title: "Reliable Information",
      description: "Verified data from government sources and agricultural departments"
    },
    {
      icon: <Globe className="h-6 w-6 text-warning" />,
      title: "Pan-India Coverage",
      description: "Comprehensive coverage of crops across all Indian states and regions"
    }
  ];

  const benefits = [
    {
      title: "For Farmers",
      description: "Make informed decisions about crop selection and timing",
      points: [
        "Choose the right crops based on market demand",
        "Optimize planting and harvesting schedules",
        "Access government scheme information",
        "Get personalized farming recommendations"
      ]
    },
    {
      title: "For Traders & Buyers",
      description: "Plan procurement and avoid supply shortages",
      points: [
        "Predict crop availability in advance",
        "Plan inventory and storage needs",
        "Identify potential price fluctuations",
        "Connect with farming communities"
      ]
    },
    {
      title: "For Citizens",
      description: "Stay informed about food security and pricing",
      points: [
        "Understand seasonal price variations",
        "Track food production trends",
        "Support local farming initiatives",
        "Make informed purchasing decisions"
      ]
    }
  ];

  const team = [
    {
      role: "Agricultural Data Scientists",
      description: "Experts in crop analysis and agricultural economics"
    },
    {
      role: "Software Engineers",
      description: "Building scalable and user-friendly platforms"
    },
    {
      role: "Field Researchers",
      description: "Collecting ground-truth data from farming communities"
    },
    {
      role: "Policy Advisors",
      description: "Ensuring alignment with government agricultural policies"
    }
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">About CropWatch</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Empowering India's agricultural ecosystem with data-driven insights, 
            helping farmers and traders make smarter decisions for a more sustainable future.
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="mb-12 bg-gradient-to-r from-primary/10 to-success/10 border-primary/20">
          <CardContent className="py-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-primary/20 rounded-full">
                  <Target className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To bridge the information gap in Indian agriculture by providing accessible, 
                accurate, and actionable data that empowers farmers to increase productivity, 
                helps traders make informed decisions, and contributes to national food security.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* How It Helps */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            How CropWatch Helps
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-l-4 border-l-primary">
                <CardHeader>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  <CardDescription className="text-base">
                    {benefit.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {benefit.points.map((point, pointIndex) => (
                      <div key={pointIndex} className="flex items-start space-x-3">
                        <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{point}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Platform Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-muted rounded-lg">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Data Sources & Methodology */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-earth" />
              <span>Data Sources & Methodology</span>
            </CardTitle>
            <CardDescription>
              Our commitment to accuracy and reliability
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-foreground mb-4">Data Sources</h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Ministry of Agriculture & Farmers Welfare
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      State Agriculture Departments
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Agricultural Market Committees (APMCs)
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Field surveys and farmer inputs
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-4">AI Methodology</h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Lightbulb className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Machine learning models trained on historical data
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Lightbulb className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Weather pattern analysis and seasonal factors
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Lightbulb className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Market demand and supply chain analysis
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Lightbulb className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Festival and seasonal consumption patterns
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <span>Our Team</span>
            </CardTitle>
            <CardDescription>
              Dedicated professionals working towards agricultural innovation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {team.map((member, index) => (
                <div key={index} className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">{member.role}</h4>
                  <p className="text-sm text-muted-foreground">{member.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Vision for Future */}
        <Card className="bg-gradient-to-r from-success/10 to-earth/10 border-success/20">
          <CardContent className="py-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-success/20 rounded-full">
                  <Heart className="h-8 w-8 text-success" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Vision for the Future</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                We envision a future where every farmer in India has access to the data and 
                insights they need to thrive. Through technology and collaboration, we aim to 
                create a more resilient, profitable, and sustainable agricultural sector that 
                feeds our growing nation.
              </p>
              <div className="flex justify-center space-x-4">
                <Badge variant="outline" className="text-success border-success">
                  Sustainable Farming
                </Badge>
                <Badge variant="outline" className="text-primary border-primary">
                  Data-Driven Decisions
                </Badge>
                <Badge variant="outline" className="text-earth border-earth">
                  Farmer Empowerment
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;