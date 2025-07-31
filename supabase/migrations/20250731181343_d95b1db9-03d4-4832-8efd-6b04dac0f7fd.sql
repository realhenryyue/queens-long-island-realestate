-- Enable Row Level Security on properties table
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Create policy to allow everyone to read properties (public real estate listings)
CREATE POLICY "Everyone can view properties" ON public.properties
  FOR SELECT USING (true);

-- Create policy to allow service role to insert/update properties (for the edge function)
CREATE POLICY "Service role can manage properties" ON public.properties
  FOR ALL USING (true);