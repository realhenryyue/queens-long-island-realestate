-- Create properties table for real estate listings
CREATE TABLE public.properties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  source TEXT NOT NULL,
  external_id TEXT NOT NULL,
  title TEXT NOT NULL,
  price BIGINT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code TEXT,
  bedrooms INTEGER,
  bathrooms DECIMAL,
  square_feet INTEGER,
  property_type TEXT,
  listing_date DATE,
  description TEXT,
  image_urls TEXT[],
  listing_url TEXT,
  price_per_sqft DECIMAL,
  market_score INTEGER,
  value_score INTEGER,
  interest_score INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(source, external_id)
);

-- Create index for better performance
CREATE INDEX idx_properties_location ON public.properties(city, state);
CREATE INDEX idx_properties_price ON public.properties(price);
CREATE INDEX idx_properties_active ON public.properties(is_active);
CREATE INDEX idx_properties_created_at ON public.properties(created_at);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON public.properties
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();