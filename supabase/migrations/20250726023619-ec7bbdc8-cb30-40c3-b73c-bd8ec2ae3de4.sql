-- Create states table
CREATE TABLE public.states (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create districts table
CREATE TABLE public.districts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  state_id UUID NOT NULL REFERENCES public.states(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(name, state_id)
);

-- Create crops table
CREATE TABLE public.crops (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  district_id UUID NOT NULL REFERENCES public.districts(id) ON DELETE CASCADE,
  land_used DECIMAL(10,2) NOT NULL DEFAULT 0,
  expected_yield DECIMAL(10,2) NOT NULL DEFAULT 0,
  current_price DECIMAL(10,2) NOT NULL DEFAULT 0,
  season TEXT NOT NULL,
  sowing_month TEXT NOT NULL,
  harvest_month TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create price predictions table
CREATE TABLE public.price_predictions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  crop_name TEXT NOT NULL,
  current_price DECIMAL(10,2) NOT NULL,
  predicted_price DECIMAL(10,2) NOT NULL,
  price_change DECIMAL(10,2) NOT NULL,
  change_percentage DECIMAL(5,2) NOT NULL,
  demand TEXT NOT NULL CHECK (demand IN ('High', 'Medium', 'Low')),
  supply TEXT NOT NULL CHECK (supply IN ('High', 'Medium', 'Low')),
  reason TEXT NOT NULL,
  confidence DECIMAL(3,2) NOT NULL CHECK (confidence >= 0 AND confidence <= 1),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.states ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.districts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.price_predictions ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (since this is agricultural data)
CREATE POLICY "States are viewable by everyone" 
  ON public.states FOR SELECT USING (true);

CREATE POLICY "Districts are viewable by everyone" 
  ON public.districts FOR SELECT USING (true);

CREATE POLICY "Crops are viewable by everyone" 
  ON public.crops FOR SELECT USING (true);

CREATE POLICY "Price predictions are viewable by everyone" 
  ON public.price_predictions FOR SELECT USING (true);

-- Admin policies for insert/update/delete (you'll need authentication later)
CREATE POLICY "Admin can insert states" 
  ON public.states FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin can update states" 
  ON public.states FOR UPDATE USING (true);

CREATE POLICY "Admin can delete states" 
  ON public.states FOR DELETE USING (true);

CREATE POLICY "Admin can insert districts" 
  ON public.districts FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin can update districts" 
  ON public.districts FOR UPDATE USING (true);

CREATE POLICY "Admin can delete districts" 
  ON public.districts FOR DELETE USING (true);

CREATE POLICY "Admin can insert crops" 
  ON public.crops FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin can update crops" 
  ON public.crops FOR UPDATE USING (true);

CREATE POLICY "Admin can delete crops" 
  ON public.crops FOR DELETE USING (true);

CREATE POLICY "Admin can insert price predictions" 
  ON public.price_predictions FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin can update price predictions" 
  ON public.price_predictions FOR UPDATE USING (true);

CREATE POLICY "Admin can delete price predictions" 
  ON public.price_predictions FOR DELETE USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_states_updated_at
  BEFORE UPDATE ON public.states
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_districts_updated_at
  BEFORE UPDATE ON public.districts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_crops_updated_at
  BEFORE UPDATE ON public.crops
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_price_predictions_updated_at
  BEFORE UPDATE ON public.price_predictions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample data
INSERT INTO public.states (name) VALUES 
  ('Maharashtra'),
  ('Punjab'),
  ('Uttar Pradesh'),
  ('Haryana'),
  ('Karnataka');

INSERT INTO public.districts (name, state_id) VALUES 
  ('Pune', (SELECT id FROM public.states WHERE name = 'Maharashtra')),
  ('Mumbai', (SELECT id FROM public.states WHERE name = 'Maharashtra')),
  ('Ludhiana', (SELECT id FROM public.states WHERE name = 'Punjab')),
  ('Amritsar', (SELECT id FROM public.states WHERE name = 'Punjab')),
  ('Agra', (SELECT id FROM public.states WHERE name = 'Uttar Pradesh')),
  ('Lucknow', (SELECT id FROM public.states WHERE name = 'Uttar Pradesh')),
  ('Panipat', (SELECT id FROM public.states WHERE name = 'Haryana')),
  ('Gurgaon', (SELECT id FROM public.states WHERE name = 'Haryana')),
  ('Bangalore', (SELECT id FROM public.states WHERE name = 'Karnataka')),
  ('Mysore', (SELECT id FROM public.states WHERE name = 'Karnataka'));