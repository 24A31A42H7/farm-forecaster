import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  IndianRupee, 
  Calendar,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Clock,
  Zap
} from "lucide-react";
import { pricePredictions, PricePrediction } from "@/data/cropData";

const Predictions = () => {
  const [selectedCrop, setSelectedCrop] = useState<string>("");
  
  const selectedPrediction = selectedCrop ? 
    pricePredictions.find(p => p.cropId === selectedCrop) : null;

  // Mock historical data for the selected crop
  const generateHistoricalData = (cropName: string, currentPrice: number) => {
    const months = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan'];
    const basePrice = currentPrice;
    
    return months.map((month, index) => ({
      month,
      price: Math.round(basePrice + (Math.random() - 0.5) * 200 + (index * 50)),
      demand: Math.round(60 + Math.random() * 40),
      supply: Math.round(70 + Math.random() * 30)
    }));
  };

  // Mock crop usage data
  const cropUsageData = [
    { 
      crop: "Rice", 
      lastMonth: 125000, 
      thisMonth: 138000, 
      nextMonth: 152000,
      festival: "Sankranti",
      reason: "Festival consumption increases by 35%" 
    },
    { 
      crop: "Cotton", 
      lastMonth: 89000, 
      thisMonth: 85000, 
      nextMonth: 95000,
      festival: "Wedding Season",
      reason: "Textile demand for wedding season" 
    },
    { 
      crop: "Onion", 
      lastMonth: 67000, 
      thisMonth: 72000, 
      nextMonth: 98000,
      festival: "Festival Season",
      reason: "Increased cooking and festival preparations" 
    },
    { 
      crop: "Turmeric", 
      lastMonth: 15000, 
      thisMonth: 18000, 
      nextMonth: 24000,
      festival: "Wedding Season",
      reason: "Religious ceremonies and wedding preparations" 
    }
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Price Predictions</h1>
          <p className="text-muted-foreground">
            AI-powered price forecasts and market insights for the next month
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {pricePredictions.map((prediction, index) => (
            <Card 
              key={prediction.cropId}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedCrop === prediction.cropId ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedCrop(prediction.cropId)}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>{prediction.cropName}</span>
                  {prediction.changePercentage > 0 ? (
                    <TrendingUp className="h-5 w-5 text-success" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-destructive" />
                  )}
                </CardTitle>
                <Badge 
                  variant={prediction.changePercentage > 15 ? "destructive" : 
                          prediction.changePercentage > 5 ? "default" : "secondary"}
                  className="w-fit"
                >
                  {prediction.changePercentage > 0 ? '+' : ''}{prediction.changePercentage}%
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Current:</span>
                  <span className="font-medium flex items-center">
                    <IndianRupee className="h-3 w-3 mr-1" />
                    {prediction.currentPrice}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Predicted:</span>
                  <span className="font-bold flex items-center text-primary">
                    <IndianRupee className="h-3 w-3 mr-1" />
                    {prediction.predictedPrice}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Confidence:</span>
                    <span className="font-medium">{prediction.confidence}%</span>
                  </div>
                  <Progress value={prediction.confidence} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Analysis */}
        {selectedPrediction ? (
          <div className="space-y-8">
            {/* Selected Crop Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <span>{selectedPrediction.cropName} - Detailed Analysis</span>
                </CardTitle>
                <CardDescription>
                  Comprehensive price prediction and market analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground">Price Movement</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Current Price:</span>
                        <span className="font-medium">₹{selectedPrediction.currentPrice}/quintal</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Predicted Price:</span>
                        <span className="font-bold text-primary">₹{selectedPrediction.predictedPrice}/quintal</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Change:</span>
                        <span className={`font-medium ${
                          selectedPrediction.priceChange > 0 ? 'text-success' : 'text-destructive'
                        }`}>
                          {selectedPrediction.priceChange > 0 ? '+' : ''}₹{selectedPrediction.priceChange}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground">Market Factors</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Demand:</span>
                        <Badge variant={selectedPrediction.demand === 'High' ? 'destructive' : 
                                      selectedPrediction.demand === 'Medium' ? 'default' : 'secondary'}>
                          {selectedPrediction.demand}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Supply:</span>
                        <Badge variant={selectedPrediction.supply === 'Low' ? 'destructive' : 
                                      selectedPrediction.supply === 'Medium' ? 'default' : 'secondary'}>
                          {selectedPrediction.supply}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Confidence:</span>
                        <span className="font-medium">{selectedPrediction.confidence}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground">Prediction Reason</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {selectedPrediction.reason}
                    </p>
                    <div className="flex items-start space-x-2 p-3 bg-muted/50 rounded-lg">
                      {selectedPrediction.changePercentage > 15 ? (
                        <AlertTriangle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                      )}
                      <span className="text-sm">
                        {selectedPrediction.changePercentage > 15 ? 
                          "High price volatility expected" : 
                          "Moderate price movement predicted"
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Historical Price Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Historical Price Trend (Last 5 Months)</CardTitle>
                <CardDescription>
                  Price movement pattern for {selectedPrediction.cropName}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={generateHistoricalData(selectedPrediction.cropName, selectedPrediction.currentPrice)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₹${value}/quintal`, 'Price']} />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--primary))" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Select a Crop for Detailed Analysis
              </h3>
              <p className="text-muted-foreground">
                Click on any crop card above to view detailed price predictions and market insights.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Crop Usage Analysis */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-earth" />
              <span>Crop Usage & Seasonal Demand</span>
            </CardTitle>
            <CardDescription>
              Usage patterns based on last 2-4 months and upcoming festival seasons
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {cropUsageData.map((crop, index) => (
                <div key={crop.crop} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-semibold text-foreground">{crop.crop}</h4>
                      <p className="text-sm text-muted-foreground">
                        Festival Impact: {crop.festival}
                      </p>
                    </div>
                    <Badge variant="outline">
                      {((crop.nextMonth - crop.thisMonth) / crop.thisMonth * 100).toFixed(1)}% increase expected
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-3 bg-muted/30 rounded-lg">
                      <div className="text-sm text-muted-foreground">Last Month</div>
                      <div className="text-lg font-bold">{crop.lastMonth.toLocaleString()} MT</div>
                    </div>
                    <div className="text-center p-3 bg-primary/10 rounded-lg">
                      <div className="text-sm text-muted-foreground">This Month</div>
                      <div className="text-lg font-bold text-primary">{crop.thisMonth.toLocaleString()} MT</div>
                    </div>
                    <div className="text-center p-3 bg-success/10 rounded-lg">
                      <div className="text-sm text-muted-foreground">Next Month (Predicted)</div>
                      <div className="text-lg font-bold text-success">{crop.nextMonth.toLocaleString()} MT</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 p-3 bg-accent/30 rounded-lg">
                    <Calendar className="h-4 w-4 text-earth mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{crop.reason}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Predictions;