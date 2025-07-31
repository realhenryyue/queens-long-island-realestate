import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    const { location, maxPrice, minPrice } = await req.json()

    // For now, we'll create sample data since real API integration would need API keys
    // In production, this would call real estate APIs
    const sampleProperties = [
      {
        source: 'zillow',
        external_id: 'zil_' + Math.random().toString(36).substr(2, 9),
        title: 'Beautiful 3BR House in Queens',
        price: 750000,
        address: '123 Main St',
        city: 'Queens',
        state: 'NY',
        zip_code: '11375',
        bedrooms: 3,
        bathrooms: 2.5,
        square_feet: 1800,
        property_type: 'house',
        listing_date: new Date().toISOString().split('T')[0],
        description: 'Stunning home with modern amenities and great location.',
        image_urls: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800'],
        listing_url: 'https://zillow.com/sample',
        price_per_sqft: 416.67,
        market_score: 85,
        value_score: 90,
        interest_score: 78
      },
      {
        source: 'redfin',
        external_id: 'ref_' + Math.random().toString(36).substr(2, 9),
        title: 'Modern 2BR Condo in Manhattan',
        price: 1200000,
        address: '456 Park Ave',
        city: 'Manhattan',
        state: 'NY',
        zip_code: '10016',
        bedrooms: 2,
        bathrooms: 2,
        square_feet: 1200,
        property_type: 'condo',
        listing_date: new Date().toISOString().split('T')[0],
        description: 'Luxury condo with amazing city views.',
        image_urls: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800'],
        listing_url: 'https://redfin.com/sample',
        price_per_sqft: 1000,
        market_score: 95,
        value_score: 75,
        interest_score: 92
      },
      {
        source: 'streeteasy',
        external_id: 'se_' + Math.random().toString(36).substr(2, 9),
        title: 'Spacious 4BR Townhouse in Brooklyn',
        price: 950000,
        address: '789 Brooklyn Ave',
        city: 'Brooklyn',
        state: 'NY',
        zip_code: '11201',
        bedrooms: 4,
        bathrooms: 3,
        square_feet: 2200,
        property_type: 'townhouse',
        listing_date: new Date().toISOString().split('T')[0],
        description: 'Family-friendly townhouse with garden and parking.',
        image_urls: ['https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800'],
        listing_url: 'https://streeteasy.com/sample',
        price_per_sqft: 431.82,
        market_score: 88,
        value_score: 95,
        interest_score: 85
      }
    ]

    // Filter by location and price if provided
    let filteredProperties = sampleProperties
    
    if (location && location.toLowerCase() !== 'all') {
      filteredProperties = filteredProperties.filter(prop => 
        prop.city.toLowerCase().includes(location.toLowerCase()) ||
        prop.state.toLowerCase().includes(location.toLowerCase())
      )
    }

    if (minPrice) {
      filteredProperties = filteredProperties.filter(prop => prop.price >= minPrice)
    }

    if (maxPrice) {
      filteredProperties = filteredProperties.filter(prop => prop.price <= maxPrice)
    }

    // Insert or update properties in database
    for (const property of filteredProperties) {
      const { error } = await supabaseClient
        .from('properties')
        .upsert(property, { 
          onConflict: 'source,external_id',
          ignoreDuplicates: false 
        })
      
      if (error) {
        console.error('Error inserting property:', error)
      }
    }

    // Fetch updated properties from database
    const { data: properties, error: fetchError } = await supabaseClient
      .from('properties')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(50)

    if (fetchError) {
      throw fetchError
    }

    return new Response(
      JSON.stringify({ properties }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})