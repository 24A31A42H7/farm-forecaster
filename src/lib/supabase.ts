import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for database tables
export interface DbState {
  id: string
  name: string
  created_at?: string
  updated_at?: string
}

export interface DbDistrict {
  id: string
  name: string
  state_id: string
  created_at?: string
  updated_at?: string
}

export interface DbCrop {
  id: string
  name: string
  district_id: string
  land_used: number
  expected_yield: number
  current_price: number
  season: string
  sowing_month: string
  harvest_month: string
  created_at?: string
  updated_at?: string
}

export interface DbPricePrediction {
  id: string
  crop_name: string
  current_price: number
  predicted_price: number
  price_change: number
  change_percentage: number
  demand: 'High' | 'Medium' | 'Low'
  supply: 'High' | 'Medium' | 'Low'
  reason: string
  confidence: number
  created_at?: string
  updated_at?: string
}

// Database functions
export const dbQueries = {
  // States
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

  // Districts
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

  // Crops
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
  },

  // Price Predictions
  async getPricePredictions() {
    const { data, error } = await supabase
      .from('price_predictions')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as DbPricePrediction[]
  },

  async createPricePrediction(prediction: Omit<DbPricePrediction, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('price_predictions')
      .insert(prediction)
      .select()
      .single()
    
    if (error) throw error
    return data as DbPricePrediction
  },

  // Combined queries for dashboard
  async getStatesWithDistricts() {
    const { data, error } = await supabase
      .from('states')
      .select(`
        *,
        districts (
          *,
          crops (*)
        )
      `)
      .order('name')
    
    if (error) throw error
    return data
  }
}