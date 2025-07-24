import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  FlaskConical,
  Recycle,
  Droplets,
  Mountain,
  Lightbulb,
  CheckCircle,
  BookOpen,
  Sprout,
  Heart
} from "lucide-react";

const Recommendations = () => {
  const recommendations = [
    {
      id: "soil-fertility",
      icon: <FlaskConical className="h-6 w-6 text-earth" />,
      title: "Soil Fertility Testing",
      category: "Soil Health",
      description: "Test your soil before planting to determine nutrient levels and pH balance",
      details: [
        "Conduct soil testing every 2-3 years or before major crop changes",
        "Test for pH levels (ideal range: 6.0-7.0 for most crops)",
        "Check nitrogen, phosphorus, and potassium levels",
        "Test for organic matter content and micronutrients",
        "Use government soil testing labs for affordable testing",
        "Adjust fertilizer application based on test results"
      ],
      benefits: [
        "Optimize fertilizer usage and reduce costs",
        "Improve crop yield and quality",
        "Prevent soil degradation",
        "Ensure sustainable farming practices"
      ]
    },
    {
      id: "crop-rotation",
      icon: <Recycle className="h-6 w-6 text-success" />,
      title: "Crop Rotation Practices",
      category: "Sustainable Farming",
      description: "Implement crop rotation to maintain soil health and prevent pest buildup",
      details: [
        "Rotate crops every season to different fields",
        "Follow legumes with cereals to utilize nitrogen fixation",
        "Include deep-rooted crops to improve soil structure",
        "Avoid planting same crop family consecutively",
        "Plan 3-4 year rotation cycles for best results",
        "Include cover crops during fallow periods"
      ],
      benefits: [
        "Reduce pest and disease pressure",
        "Improve soil fertility naturally",
        "Break weed cycles",
        "Increase biodiversity on farm"
      ]
    },
    {
      id: "water-conservation",
      icon: <Droplets className="h-6 w-6 text-primary" />,
      title: "Water Conservation & Rainwater Harvesting",
      category: "Water Management",
      description: "Reduce dependence on groundwater through efficient water management",
      details: [
        "Install rainwater harvesting systems on rooftops and fields",
        "Use drip irrigation for efficient water usage",
        "Create farm ponds to store rainwater",
        "Implement mulching to reduce evaporation",
        "Schedule irrigation based on crop water requirements",
        "Avoid over-irrigation that leads to waterlogging"
      ],
      benefits: [
        "Reduce water bills and dependency",
        "Recharge groundwater levels",
        "Ensure water availability during dry spells",
        "Improve crop water use efficiency"
      ]
    },
    {
      id: "contour-farming",
      icon: <Mountain className="h-6 w-6 text-warning" />,
      title: "Contour Farming Techniques",
      category: "Soil Conservation",
      description: "Prevent soil erosion and water runoff on sloped lands",
      details: [
        "Plow and plant along the contour lines of slopes",
        "Create terraces on steep slopes to reduce erosion",
        "Plant cover crops on contour strips",
        "Install check dams in water channels",
        "Use grass strips between crop rows",
        "Maintain proper spacing between contour lines"
      ],
      benefits: [
        "Prevent soil erosion and nutrient loss",
        "Improve water infiltration",
        "Reduce surface runoff",
        "Maintain slope stability"
      ]
    }
  ];

  const quickTips = [
    {
      title: "Best Time for Planting",
      tip: "Plant crops according to local weather patterns and monsoon predictions",
      icon: <Sprout className="h-4 w-4 text-success" />
    },
    {
      title: "Integrated Pest Management",
      tip: "Use biological pest control methods alongside targeted chemical treatments",
      icon: <CheckCircle className="h-4 w-4 text-primary" />
    },
    {
      title: "Market Research",
      tip: "Study market prices and demand before selecting crops for the season",
      icon: <BookOpen className="h-4 w-4 text-earth" />
    },
    {
      title: "Farmer Groups",
      tip: "Join local farmer groups for knowledge sharing and better input prices",
      icon: <Heart className="h-4 w-4 text-destructive" />
    }
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Farming Recommendations</h1>
          <p className="text-muted-foreground">
            Best practices and expert advice for sustainable and profitable farming
          </p>
        </div>

        {/* Encouragement Banner */}
        <Card className="mb-8 bg-gradient-to-r from-primary/10 to-success/10 border-primary/20">
          <CardContent className="py-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary/20 rounded-full">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground mb-2">
                  Building a Better Future for Indian Agriculture
                </h2>
                <p className="text-muted-foreground">
                  Your dedication to farming feeds the nation. These recommendations will help you 
                  achieve better yields, reduce costs, and protect our environment for future generations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Tips */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lightbulb className="h-5 w-5 text-warning" />
              <span>Quick Tips for Better Farming</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickTips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg">
                  {tip.icon}
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{tip.title}</h4>
                    <p className="text-sm text-muted-foreground">{tip.tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Recommendations */}
        <div className="space-y-8">
          {recommendations.map((rec) => (
            <Card key={rec.id} className="border-l-4 border-l-primary">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-muted rounded-lg">
                      {rec.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{rec.title}</CardTitle>
                      <Badge variant="outline" className="mt-1">
                        {rec.category}
                      </Badge>
                    </div>
                  </div>
                </div>
                <CardDescription className="text-base mt-3">
                  {rec.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Implementation Steps */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-4 flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span>How to Implement</span>
                    </h4>
                    <div className="space-y-3">
                      {rec.details.map((detail, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-medium text-primary">{index + 1}</span>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">{detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-4 flex items-center space-x-2">
                      <Heart className="h-4 w-4 text-destructive" />
                      <span>Benefits</span>
                    </h4>
                    <div className="space-y-3">
                      {rec.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-muted-foreground leading-relaxed">{benefit}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Resources */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-earth" />
              <span>Additional Resources</span>
            </CardTitle>
            <CardDescription>
              Government schemes and programs to support farmers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 bg-success/10 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">PM-KISAN Scheme</h4>
                <p className="text-sm text-muted-foreground">
                  Direct income support of ₹6,000 per year to small and marginal farmers
                </p>
              </div>
              <div className="p-4 bg-primary/10 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Soil Health Cards</h4>
                <p className="text-sm text-muted-foreground">
                  Free soil testing and nutrient management recommendations
                </p>
              </div>
              <div className="p-4 bg-earth/10 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Crop Insurance</h4>
                <p className="text-sm text-muted-foreground">
                  Pradhan Mantri Fasal Bima Yojana for crop loss protection
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Final Encouragement */}
        <Card className="mt-8 bg-gradient-to-r from-success/10 to-earth/10 border-success/20">
          <CardContent className="py-6 text-center">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-foreground mb-3">
                Every Small Step Counts
              </h3>
              <p className="text-muted-foreground mb-4">
                Implementing even one of these recommendations can make a significant difference 
                in your farm's productivity and sustainability. Start with what's most feasible 
                for your situation and gradually adopt more practices.
              </p>
              <Badge variant="outline" className="text-success border-success">
                Together, we grow stronger 🌱
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Recommendations;