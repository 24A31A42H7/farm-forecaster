// Agricultural data for different states and districts
export interface CropData {
  id: string;
  name: string;
  landUsed: number; // in hectares
  expectedYield: number; // in metric tons
  currentPrice: number; // per quintal in INR
  season: string;
  sowingMonth: string;
  harvestMonth: string;
}

export interface District {
  id: string;
  name: string;
  crops: CropData[];
}

export interface State {
  id: string;
  name: string;
  districts: District[];
}

export const cropDatabase: State[] = [
  {
    id: "telangana",
    name: "Telangana",
    districts: [
      {
        id: "hyderabad",
        name: "Hyderabad",
        crops: [
          {
            id: "rice-hyd",
            name: "Rice",
            landUsed: 12500,
            expectedYield: 38750,
            currentPrice: 2100,
            season: "Kharif",
            sowingMonth: "June",
            harvestMonth: "October"
          },
          {
            id: "maize-hyd",
            name: "Maize",
            landUsed: 8200,
            expectedYield: 32800,
            currentPrice: 1850,
            season: "Kharif",
            sowingMonth: "June",
            harvestMonth: "September"
          },
          {
            id: "cotton-hyd",
            name: "Cotton",
            landUsed: 15600,
            expectedYield: 9360,
            currentPrice: 5800,
            season: "Kharif",
            sowingMonth: "May",
            harvestMonth: "December"
          },
          {
            id: "turmeric-hyd",
            name: "Turmeric",
            landUsed: 3200,
            expectedYield: 19200,
            currentPrice: 7500,
            season: "Kharif",
            sowingMonth: "July",
            harvestMonth: "February"
          }
        ]
      },
      {
        id: "warangal",
        name: "Warangal",
        crops: [
          {
            id: "rice-war",
            name: "Rice",
            landUsed: 28500,
            expectedYield: 88350,
            currentPrice: 2100,
            season: "Kharif",
            sowingMonth: "June",
            harvestMonth: "October"
          },
          {
            id: "cotton-war",
            name: "Cotton",
            landUsed: 35200,
            expectedYield: 21120,
            currentPrice: 5800,
            season: "Kharif",
            sowingMonth: "May",
            harvestMonth: "December"
          },
          {
            id: "soybean-war",
            name: "Soybean",
            landUsed: 12800,
            expectedYield: 19200,
            currentPrice: 4200,
            season: "Kharif",
            sowingMonth: "June",
            harvestMonth: "October"
          },
          {
            id: "redgram-war",
            name: "Red Gram",
            landUsed: 9500,
            expectedYield: 8550,
            currentPrice: 6800,
            season: "Kharif",
            sowingMonth: "June",
            harvestMonth: "December"
          }
        ]
      },
      {
        id: "nizamabad",
        name: "Nizamabad",
        crops: [
          {
            id: "rice-niz",
            name: "Rice",
            landUsed: 22000,
            expectedYield: 68200,
            currentPrice: 2100,
            season: "Kharif",
            sowingMonth: "June",
            harvestMonth: "October"
          },
          {
            id: "maize-niz",
            name: "Maize",
            landUsed: 18500,
            expectedYield: 74000,
            currentPrice: 1850,
            season: "Kharif",
            sowingMonth: "June",
            harvestMonth: "September"
          },
          {
            id: "turmeric-niz",
            name: "Turmeric",
            landUsed: 8900,
            expectedYield: 53400,
            currentPrice: 7500,
            season: "Kharif",
            sowingMonth: "July",
            harvestMonth: "February"
          }
        ]
      }
    ]
  },
  {
    id: "andhra-pradesh",
    name: "Andhra Pradesh",
    districts: [
      {
        id: "visakhapatnam",
        name: "Visakhapatnam",
        crops: [
          {
            id: "rice-vis",
            name: "Rice",
            landUsed: 35000,
            expectedYield: 108500,
            currentPrice: 2100,
            season: "Kharif",
            sowingMonth: "June",
            harvestMonth: "October"
          },
          {
            id: "sugarcane-vis",
            name: "Sugarcane",
            landUsed: 12000,
            expectedYield: 840000,
            currentPrice: 350,
            season: "Annual",
            sowingMonth: "February",
            harvestMonth: "December"
          },
          {
            id: "cashew-vis",
            name: "Cashew",
            landUsed: 8500,
            expectedYield: 5950,
            currentPrice: 18000,
            season: "Perennial",
            sowingMonth: "June",
            harvestMonth: "March"
          }
        ]
      },
      {
        id: "guntur",
        name: "Guntur",
        crops: [
          {
            id: "chilli-gun",
            name: "Red Chilli",
            landUsed: 25000,
            expectedYield: 50000,
            currentPrice: 12000,
            season: "Rabi",
            sowingMonth: "August",
            harvestMonth: "February"
          },
          {
            id: "cotton-gun",
            name: "Cotton",
            landUsed: 18500,
            expectedYield: 11100,
            currentPrice: 5800,
            season: "Kharif",
            sowingMonth: "May",
            harvestMonth: "December"
          },
          {
            id: "tobacco-gun",
            name: "Tobacco",
            landUsed: 15200,
            expectedYield: 22800,
            currentPrice: 15000,
            season: "Rabi",
            sowingMonth: "September",
            harvestMonth: "February"
          }
        ]
      }
    ]
  },
  {
    id: "maharashtra",
    name: "Maharashtra",
    districts: [
      {
        id: "pune",
        name: "Pune",
        crops: [
          {
            id: "sugarcane-pun",
            name: "Sugarcane",
            landUsed: 45000,
            expectedYield: 3150000,
            currentPrice: 350,
            season: "Annual",
            sowingMonth: "February",
            harvestMonth: "December"
          },
          {
            id: "onion-pun",
            name: "Onion",
            landUsed: 28000,
            expectedYield: 560000,
            currentPrice: 2500,
            season: "Rabi",
            sowingMonth: "November",
            harvestMonth: "April"
          },
          {
            id: "grapes-pun",
            name: "Grapes",
            landUsed: 18500,
            expectedYield: 370000,
            currentPrice: 8000,
            season: "Annual",
            sowingMonth: "June",
            harvestMonth: "February"
          }
        ]
      },
      {
        id: "nashik",
        name: "Nashik",
        crops: [
          {
            id: "onion-nas",
            name: "Onion",
            landUsed: 35000,
            expectedYield: 700000,
            currentPrice: 2500,
            season: "Rabi",
            sowingMonth: "November",
            harvestMonth: "April"
          },
          {
            id: "grapes-nas",
            name: "Grapes",
            landUsed: 22000,
            expectedYield: 440000,
            currentPrice: 8000,
            season: "Annual",
            sowingMonth: "June",
            harvestMonth: "February"
          },
          {
            id: "wheat-nas",
            name: "Wheat",
            landUsed: 18500,
            expectedYield: 55500,
            currentPrice: 2200,
            season: "Rabi",
            sowingMonth: "November",
            harvestMonth: "April"
          }
        ]
      }
    ]
  }
];

// Price prediction data for next month
export interface PricePrediction {
  cropId: string;
  cropName: string;
  currentPrice: number;
  predictedPrice: number;
  priceChange: number;
  changePercentage: number;
  demand: "High" | "Medium" | "Low";
  supply: "High" | "Medium" | "Low";
  reason: string;
  confidence: number;
}

export const pricePredictions: PricePrediction[] = [
  {
    cropId: "rice",
    cropName: "Rice",
    currentPrice: 2100,
    predictedPrice: 2280,
    priceChange: 180,
    changePercentage: 8.57,
    demand: "High",
    supply: "Medium",
    reason: "Festival season approaching, increased consumption expected",
    confidence: 85
  },
  {
    cropId: "cotton",
    cropName: "Cotton",
    currentPrice: 5800,
    predictedPrice: 6100,
    priceChange: 300,
    changePercentage: 5.17,
    demand: "High",
    supply: "Low",
    reason: "Export demand increasing, reduced cultivation in some areas",
    confidence: 78
  },
  {
    cropId: "onion",
    cropName: "Onion",
    currentPrice: 2500,
    predictedPrice: 3200,
    priceChange: 700,
    changePercentage: 28,
    demand: "High",
    supply: "Low",
    reason: "Monsoon damage in key producing regions, festival demand",
    confidence: 92
  },
  {
    cropId: "turmeric",
    cropName: "Turmeric",
    currentPrice: 7500,
    predictedPrice: 8100,
    priceChange: 600,
    changePercentage: 8,
    demand: "High",
    supply: "Medium",
    reason: "Wedding season and export orders increasing demand",
    confidence: 80
  }
];