import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  MapPin, 
  Wheat, 
  TrendingUp, 
  Calendar,
  IndianRupee,
  BarChart3
} from "lucide-react";
import { cropDatabase, State, District, CropData } from "@/data/cropData";

const Dashboard = () => {
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  
  const currentState = selectedState ? cropDatabase.find(s => s.id === selectedState) : null;
  const currentDistrict = selectedDistrict && currentState ? 
    currentState.districts.find(d => d.id === selectedDistrict) : null;

  const displayCrops = currentDistrict ? currentDistrict.crops : 
    currentState ? currentState.districts.flatMap(d => d.crops) : [];

  // Aggregate data for charts
  const cropLandData = displayCrops.reduce((acc: any[], crop) => {
    const existing = acc.find(item => item.name === crop.name);
    if (existing) {
      existing.landUsed += crop.landUsed;
      existing.expectedYield += crop.expectedYield;
    } else {
      acc.push({
        name: crop.name,
        landUsed: crop.landUsed,
        expectedYield: crop.expectedYield,
        currentPrice: crop.currentPrice
      });
    }
    return acc;
  }, []);

  const totalLand = displayCrops.reduce((sum, crop) => sum + crop.landUsed, 0);
  const totalYield = displayCrops.reduce((sum, crop) => sum + crop.expectedYield, 0);

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--success))', 'hsl(var(--earth))', 'hsl(var(--accent))', 'hsl(var(--warning))'];

  const pieData = cropLandData.map(crop => ({
    name: crop.name,
    value: crop.landUsed,
    percentage: ((crop.landUsed / totalLand) * 100).toFixed(1)
  }));

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Crop Data Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time cultivation data across states and districts
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Select Location</span>
            </CardTitle>
            <CardDescription>
              Choose state and district to view specific crop data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">State</label>
                <Select value={selectedState} onValueChange={(value) => {
                  setSelectedState(value);
                  setSelectedDistrict("");
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a state" />
                  </SelectTrigger>
                  <SelectContent>
                    {cropDatabase.map((state) => (
                      <SelectItem key={state.id} value={state.id}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">District</label>
                <Select 
                  value={selectedDistrict} 
                  onValueChange={setSelectedDistrict}
                  disabled={!selectedState}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a district" />
                  </SelectTrigger>
                  <SelectContent>
                    {currentState?.districts.map((district) => (
                      <SelectItem key={district.id} value={district.id}>
                        {district.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {selectedState && (
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="outline">
                  State: {currentState?.name}
                </Badge>
                {selectedDistrict && (
                  <Badge variant="outline">
                    District: {currentDistrict?.name}
                  </Badge>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {displayCrops.length > 0 ? (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    <span>Total Land Used</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">
                    {totalLand.toLocaleString()} hectares
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Across {displayCrops.length} crop varieties
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <Wheat className="h-5 w-5 text-success" />
                    <span>Expected Yield</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-success">
                    {totalYield.toLocaleString()} MT
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Metric tons estimated
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <TrendingUp className="h-5 w-5 text-earth" />
                    <span>Crop Varieties</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-earth">
                    {new Set(displayCrops.map(c => c.name)).size}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Different crops cultivated
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Bar Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Land Usage by Crop</CardTitle>
                  <CardDescription>
                    Hectares of land allocated for each crop
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={cropLandData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value, name) => [
                          `${value.toLocaleString()} hectares`, 
                          'Land Used'
                        ]}
                      />
                      <Bar dataKey="landUsed" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Pie Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Land Distribution</CardTitle>
                  <CardDescription>
                    Percentage breakdown of land usage
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percentage }) => `${name}: ${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`${value.toLocaleString()} hectares`, 'Land Used']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Crop List */}
            <Card>
              <CardHeader>
                <CardTitle>Detailed Crop Information</CardTitle>
                <CardDescription>
                  {currentDistrict ? 
                    `Crops cultivated in ${currentDistrict.name} district` :
                    currentState ?
                    `All crops in ${currentState.name} state` :
                    "Select a location to view crop details"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {displayCrops.map((crop, index) => (
                    <Card key={crop.id} className="border-l-4 border-l-primary">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center space-x-2">
                          <Wheat className="h-4 w-4" />
                          <span>{crop.name}</span>
                        </CardTitle>
                        <Badge variant="secondary" className="w-fit">
                          {crop.season} Season
                        </Badge>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Land Used:</span>
                          <span className="font-medium">{crop.landUsed.toLocaleString()} ha</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Expected Yield:</span>
                          <span className="font-medium">{crop.expectedYield.toLocaleString()} MT</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Current Price:</span>
                          <span className="font-medium flex items-center">
                            <IndianRupee className="h-3 w-3 mr-1" />
                            {crop.currentPrice}/quintal
                          </span>
                        </div>
                        <Separator />
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            Sowing:
                          </span>
                          <span>{crop.sowingMonth}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            Harvest:
                          </span>
                          <span>{crop.harvestMonth}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Select a Location
              </h3>
              <p className="text-muted-foreground mb-6">
                Please select a state and optionally a district to view crop cultivation data.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;