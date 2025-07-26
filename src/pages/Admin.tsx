import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  Settings,
  Wheat,
  MapPin,
  TrendingUp,
  Database
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Database types
interface DbState {
  id: string;
  name: string;
  created_at?: string;
  updated_at?: string;
}

interface DbDistrict {
  id: string;
  name: string;
  state_id: string;
  created_at?: string;
  updated_at?: string;
}

interface DbCrop {
  id: string;
  name: string;
  district_id: string;
  land_used: number;
  expected_yield: number;
  current_price: number;
  season: string;
  sowing_month: string;
  harvest_month: string;
  created_at?: string;
  updated_at?: string;
}

// Database functions
const dbQueries = {
  async getStates() {
    const { data, error } = await supabase
      .from('states')
      .select('*')
      .order('name')
    
    if (error) throw error
    return data as DbState[]
  },

  async createState(state: Omit<DbState, 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('states')
      .insert(state)
      .select()
      .single()
    
    if (error) throw error
    return data as DbState
  },

  async getDistricts(stateId?: string) {
    let query = supabase.from('districts').select('*')
    
    if (stateId) {
      query = query.eq('state_id', stateId)
    }
    
    const { data, error } = await query.order('name')
    
    if (error) throw error
    return data as DbDistrict[]
  },

  async createDistrict(district: Omit<DbDistrict, 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('districts')
      .insert(district)
      .select()
      .single()
    
    if (error) throw error
    return data as DbDistrict
  },

  async getCrops(districtId?: string) {
    let query = supabase.from('crops').select('*')
    
    if (districtId) {
      query = query.eq('district_id', districtId)
    }
    
    const { data, error } = await query.order('name')
    
    if (error) throw error
    return data as DbCrop[]
  },

  async createCrop(crop: Omit<DbCrop, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('crops')
      .insert(crop)
      .select()
      .single()
    
    if (error) throw error
    return data as DbCrop
  },

  async updateCrop(id: string, updates: Partial<DbCrop>) {
    const { data, error } = await supabase
      .from('crops')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as DbCrop
  },

  async deleteCrop(id: string) {
    const { error } = await supabase
      .from('crops')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
};

const Admin = () => {
  const [crops, setCrops] = useState<DbCrop[]>([]);
  const [states, setStates] = useState<DbState[]>([]);
  const [districts, setDistricts] = useState<DbDistrict[]>([]);
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [isAddCropOpen, setIsAddCropOpen] = useState(false);
  const [isEditCropOpen, setIsEditCropOpen] = useState(false);
  const [editingCrop, setEditingCrop] = useState<DbCrop | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const [newCrop, setNewCrop] = useState({
    name: "",
    district_id: "",
    land_used: 0,
    expected_yield: 0,
    current_price: 0,
    season: "",
    sowing_month: "",
    harvest_month: ""
  });

  const seasons = ["Kharif", "Rabi", "Zaid", "Annual", "Perennial"];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (selectedState) {
      loadDistricts(selectedState);
    }
  }, [selectedState]);

  useEffect(() => {
    if (selectedDistrict) {
      loadCrops(selectedDistrict);
    }
  }, [selectedDistrict]);

  const loadData = async () => {
    try {
      setLoading(true);
      const statesData = await dbQueries.getStates();
      setStates(statesData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load data from database",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const loadDistricts = async (stateId: string) => {
    try {
      const districtsData = await dbQueries.getDistricts(stateId);
      setDistricts(districtsData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load districts",
        variant: "destructive"
      });
    }
  };

  const loadCrops = async (districtId: string) => {
    try {
      const cropsData = await dbQueries.getCrops(districtId);
      setCrops(cropsData);
    } catch (error) {
      toast({
        title: "Error", 
        description: "Failed to load crops",
        variant: "destructive"
      });
    }
  };

  const handleAddCrop = async () => {
    if (!selectedDistrict) {
      toast({
        title: "Error",
        description: "Please select a district first",
        variant: "destructive"
      });
      return;
    }

    try {
      const cropData = {
        ...newCrop,
        district_id: selectedDistrict
      };
      
      await dbQueries.createCrop(cropData);
      
      toast({
        title: "Success",
        description: "Crop added successfully"
      });
      
      setIsAddCropOpen(false);
      setNewCrop({
        name: "",
        district_id: "",
        land_used: 0,
        expected_yield: 0,
        current_price: 0,
        season: "",
        sowing_month: "",
        harvest_month: ""
      });
      
      loadCrops(selectedDistrict);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add crop",
        variant: "destructive"
      });
    }
  };

  const handleEditCrop = async () => {
    if (!editingCrop) return;

    try {
      await dbQueries.updateCrop(editingCrop.id, editingCrop);
      
      toast({
        title: "Success", 
        description: "Crop updated successfully"
      });
      
      setIsEditCropOpen(false);
      setEditingCrop(null);
      
      if (selectedDistrict) {
        loadCrops(selectedDistrict);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update crop",
        variant: "destructive"
      });
    }
  };

  const handleDeleteCrop = async (cropId: string) => {
    try {
      await dbQueries.deleteCrop(cropId);
      
      toast({
        title: "Success",
        description: "Crop deleted successfully"
      });
      
      if (selectedDistrict) {
        loadCrops(selectedDistrict);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete crop",
        variant: "destructive"
      });
    }
  };

  const currentState = states.find(s => s.id === selectedState);
  const currentDistrict = districts.find(d => d.id === selectedDistrict);

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-lg">Loading admin panel...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center space-x-2">
            <Settings className="h-8 w-8" />
            <span>Admin Panel</span>
          </h1>
          <p className="text-muted-foreground">
            Manage crops, update prices, and monitor agricultural data
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Database className="h-5 w-5 text-primary" />
                <span>Total States</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {states.length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg">
                <MapPin className="h-5 w-5 text-success" />
                <span>Total Districts</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                {districts.length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Wheat className="h-5 w-5 text-earth" />
                <span>Total Crops</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-earth">
                {crops.length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg">
                <TrendingUp className="h-5 w-5 text-warning" />
                <span>Avg Price</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">
                ₹{crops.length > 0 ? Math.round(crops.reduce((sum, crop) => sum + crop.current_price, 0) / crops.length) : 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Location Selector */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Select Location</span>
            </CardTitle>
            <CardDescription>
              Choose state and district to manage crops
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="state">State</Label>
                <Select value={selectedState} onValueChange={(value) => {
                  setSelectedState(value);
                  setSelectedDistrict("");
                  setCrops([]);
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a state" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state.id} value={state.id}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="district">District</Label>
                <Select 
                  value={selectedDistrict} 
                  onValueChange={setSelectedDistrict}
                  disabled={!selectedState}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a district" />
                  </SelectTrigger>
                  <SelectContent>
                    {districts.map((district) => (
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

        {/* Crops Management */}
        {selectedDistrict && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Wheat className="h-5 w-5" />
                  <span>Crops Management</span>
                </div>
                <Dialog open={isAddCropOpen} onOpenChange={setIsAddCropOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Crop
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add New Crop</DialogTitle>
                      <DialogDescription>
                        Add a new crop to {currentDistrict?.name} district
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input
                          id="name"
                          value={newCrop.name}
                          onChange={(e) => setNewCrop({...newCrop, name: e.target.value})}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="land_used" className="text-right">
                          Land Used (ha)
                        </Label>
                        <Input
                          id="land_used"
                          type="number"
                          value={newCrop.land_used}
                          onChange={(e) => setNewCrop({...newCrop, land_used: parseFloat(e.target.value) || 0})}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="expected_yield" className="text-right">
                          Expected Yield (MT)
                        </Label>
                        <Input
                          id="expected_yield"
                          type="number"
                          value={newCrop.expected_yield}
                          onChange={(e) => setNewCrop({...newCrop, expected_yield: parseFloat(e.target.value) || 0})}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="current_price" className="text-right">
                          Price (₹/quintal)
                        </Label>
                        <Input
                          id="current_price"
                          type="number"
                          value={newCrop.current_price}
                          onChange={(e) => setNewCrop({...newCrop, current_price: parseFloat(e.target.value) || 0})}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="season" className="text-right">
                          Season
                        </Label>
                        <Select value={newCrop.season} onValueChange={(value) => setNewCrop({...newCrop, season: value})}>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select season" />
                          </SelectTrigger>
                          <SelectContent>
                            {seasons.map((season) => (
                              <SelectItem key={season} value={season}>
                                {season}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="sowing_month" className="text-right">
                          Sowing Month
                        </Label>
                        <Select value={newCrop.sowing_month} onValueChange={(value) => setNewCrop({...newCrop, sowing_month: value})}>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select month" />
                          </SelectTrigger>
                          <SelectContent>
                            {months.map((month) => (
                              <SelectItem key={month} value={month}>
                                {month}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="harvest_month" className="text-right">
                          Harvest Month
                        </Label>
                        <Select value={newCrop.harvest_month} onValueChange={(value) => setNewCrop({...newCrop, harvest_month: value})}>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select month" />
                          </SelectTrigger>
                          <SelectContent>
                            {months.map((month) => (
                              <SelectItem key={month} value={month}>
                                {month}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleAddCrop}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Crop
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardTitle>
              <CardDescription>
                Manage crops for {currentDistrict?.name} district
              </CardDescription>
            </CardHeader>
            <CardContent>
              {crops.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Land Used (ha)</TableHead>
                      <TableHead>Expected Yield (MT)</TableHead>
                      <TableHead>Price (₹/quintal)</TableHead>
                      <TableHead>Season</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {crops.map((crop) => (
                      <TableRow key={crop.id}>
                        <TableCell className="font-medium">{crop.name}</TableCell>
                        <TableCell>{crop.land_used.toLocaleString()}</TableCell>
                        <TableCell>{crop.expected_yield.toLocaleString()}</TableCell>
                        <TableCell>₹{crop.current_price}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{crop.season}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setEditingCrop(crop);
                                setIsEditCropOpen(true);
                              }}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteCrop(crop.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-12">
                  <Wheat className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No crops found
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Add crops to start managing agricultural data for this district.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Edit Crop Dialog */}
        <Dialog open={isEditCropOpen} onOpenChange={setIsEditCropOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Crop</DialogTitle>
              <DialogDescription>
                Update crop information
              </DialogDescription>
            </DialogHeader>
            {editingCrop && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit_name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="edit_name"
                    value={editingCrop.name}
                    onChange={(e) => setEditingCrop({...editingCrop, name: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit_land_used" className="text-right">
                    Land Used (ha)
                  </Label>
                  <Input
                    id="edit_land_used"
                    type="number"
                    value={editingCrop.land_used}
                    onChange={(e) => setEditingCrop({...editingCrop, land_used: parseFloat(e.target.value) || 0})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit_expected_yield" className="text-right">
                    Expected Yield (MT)
                  </Label>
                  <Input
                    id="edit_expected_yield"
                    type="number"
                    value={editingCrop.expected_yield}
                    onChange={(e) => setEditingCrop({...editingCrop, expected_yield: parseFloat(e.target.value) || 0})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit_current_price" className="text-right">
                    Price (₹/quintal)
                  </Label>
                  <Input
                    id="edit_current_price"
                    type="number"
                    value={editingCrop.current_price}
                    onChange={(e) => setEditingCrop({...editingCrop, current_price: parseFloat(e.target.value) || 0})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit_season" className="text-right">
                    Season
                  </Label>
                  <Select value={editingCrop.season} onValueChange={(value) => setEditingCrop({...editingCrop, season: value})}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {seasons.map((season) => (
                        <SelectItem key={season} value={season}>
                          {season}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit_sowing_month" className="text-right">
                    Sowing Month
                  </Label>
                  <Select value={editingCrop.sowing_month} onValueChange={(value) => setEditingCrop({...editingCrop, sowing_month: value})}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month) => (
                        <SelectItem key={month} value={month}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit_harvest_month" className="text-right">
                    Harvest Month
                  </Label>
                  <Select value={editingCrop.harvest_month} onValueChange={(value) => setEditingCrop({...editingCrop, harvest_month: value})}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month) => (
                        <SelectItem key={month} value={month}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button onClick={handleEditCrop}>
                <Save className="h-4 w-4 mr-2" />
                Update Crop
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Admin;