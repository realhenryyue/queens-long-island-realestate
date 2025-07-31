import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MapPin, Bed, Bath, Square, Star, ExternalLink, Search, Filter } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Property {
  id: string;
  source: string;
  title: string;
  price: number;
  address: string;
  city: string;
  state: string;
  bedrooms: number;
  bathrooms: number;
  square_feet: number;
  property_type: string;
  description: string;
  image_urls: string[];
  listing_url: string;
  price_per_sqft: number;
  market_score: number;
  value_score: number;
  interest_score: number;
  created_at: string;
  listing_date?: string;
}

interface Filters {
  location: string;
  minPrice: string;
  maxPrice: string;
  propertyType: string;
  sortBy: string;
}

// Mock data for demonstration - will be replaced with real Supabase data
const mockProperties: Property[] = [
  {
    id: '1',
    source: 'zillow',
    title: 'Beautiful 3BR House in Queens',
    price: 750000,
    address: '123 Main St',
    city: 'Queens',
    state: 'NY',
    bedrooms: 3,
    bathrooms: 2.5,
    square_feet: 1800,
    property_type: 'house',
    description: 'Stunning home with modern amenities and great location.',
    image_urls: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800'],
    listing_url: 'https://zillow.com/sample',
    price_per_sqft: 416.67,
    market_score: 85,
    value_score: 90,
    interest_score: 78,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    source: 'redfin',
    title: 'Modern 2BR Condo in Manhattan',
    price: 1200000,
    address: '456 Park Ave',
    city: 'Manhattan',
    state: 'NY',
    bedrooms: 2,
    bathrooms: 2,
    square_feet: 1200,
    property_type: 'condo',
    description: 'Luxury condo with amazing city views.',
    image_urls: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800'],
    listing_url: 'https://redfin.com/sample',
    price_per_sqft: 1000,
    market_score: 95,
    value_score: 75,
    interest_score: 92,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    source: 'streeteasy',
    title: 'Spacious 4BR Townhouse in Brooklyn',
    price: 950000,
    address: '789 Brooklyn Ave',
    city: 'Brooklyn',
    state: 'NY',
    bedrooms: 4,
    bathrooms: 3,
    square_feet: 2200,
    property_type: 'townhouse',
    description: 'Family-friendly townhouse with garden and parking.',
    image_urls: ['https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800'],
    listing_url: 'https://streeteasy.com/sample',
    price_per_sqft: 431.82,
    market_score: 88,
    value_score: 95,
    interest_score: 85,
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    source: 'zillow',
    title: 'Luxury 1BR Studio in Long Island City',
    price: 650000,
    address: '321 Court Sq',
    city: 'Long Island City',
    state: 'NY',
    bedrooms: 1,
    bathrooms: 1,
    square_feet: 900,
    property_type: 'condo',
    description: 'Modern studio with waterfront views and amenities.',
    image_urls: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'],
    listing_url: 'https://zillow.com/sample2',
    price_per_sqft: 722.22,
    market_score: 82,
    value_score: 88,
    interest_score: 95,
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    source: 'redfin',
    title: 'Charming 2BR House in Astoria',
    price: 580000,
    address: '567 Astoria Blvd',
    city: 'Astoria',
    state: 'NY',
    bedrooms: 2,
    bathrooms: 1.5,
    square_feet: 1100,
    property_type: 'house',
    description: 'Cozy house with backyard in growing neighborhood.',
    image_urls: ['https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800'],
    listing_url: 'https://redfin.com/sample2',
    price_per_sqft: 527.27,
    market_score: 78,
    value_score: 92,
    interest_score: 88,
    created_at: new Date().toISOString()
  },
  {
    id: '6',
    source: 'streeteasy',
    title: 'Penthouse 3BR Condo in Williamsburg',
    price: 1850000,
    address: '100 Berry St',
    city: 'Williamsburg',
    state: 'NY',
    bedrooms: 3,
    bathrooms: 2.5,
    square_feet: 1600,
    property_type: 'condo',
    description: 'Stunning penthouse with Manhattan views and rooftop access.',
    image_urls: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'],
    listing_url: 'https://streeteasy.com/sample2',
    price_per_sqft: 1156.25,
    market_score: 98,
    value_score: 70,
    interest_score: 96,
    created_at: new Date().toISOString()
  }
];


export const RealEstateSection = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [filters, setFilters] = useState<Filters>({
    location: '',
    minPrice: '',
    maxPrice: '',
    propertyType: 'all',
    sortBy: 'newest'
  });

  // Fetch properties from Supabase edge function
  const fetchProperties = async () => {
    setLoading(true);
    try {
      console.log('Fetching properties with filters:', filters);
      
      // Call the Supabase edge function
      const { data, error } = await supabase.functions.invoke('fetch-properties', {
        body: {
          location: filters.location || 'New York',
          minPrice: filters.minPrice ? parseInt(filters.minPrice) : null,
          maxPrice: filters.maxPrice ? parseInt(filters.maxPrice) : null
        }
      });

      if (error) {
        console.error('Error calling fetch-properties function:', error);
        toast({
          title: "Error",
          description: "Failed to fetch properties. Please try again.",
          variant: "destructive",
        });
        return;
      }

      let fetchedProperties = data?.properties || [];
      console.log('Fetched properties:', fetchedProperties.length);

      // Apply additional client-side filtering
      if (filters.propertyType !== 'all') {
        fetchedProperties = fetchedProperties.filter((p: Property) => 
          p.property_type === filters.propertyType
        );
      }

      // Sort properties
      switch (filters.sortBy) {
        case 'price_low':
          fetchedProperties.sort((a: Property, b: Property) => a.price - b.price);
          break;
        case 'price_high':
          fetchedProperties.sort((a: Property, b: Property) => b.price - a.price);
          break;
        case 'value_score':
          fetchedProperties.sort((a: Property, b: Property) => b.value_score - a.value_score);
          break;
        case 'market_score':
          fetchedProperties.sort((a: Property, b: Property) => b.market_score - a.market_score);
          break;
        default: // newest
          fetchedProperties.sort((a: Property, b: Property) => 
            new Date(b.created_at || b.listing_date).getTime() - new Date(a.created_at || a.listing_date).getTime()
          );
      }

      setProperties(fetchedProperties);
      
      if (fetchedProperties.length > 0) {
        toast({
          title: "Success",
          description: `Found ${fetchedProperties.length} properties`,
        });
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast({
        title: "Error",
        description: "Failed to fetch properties. Please try again.",
        variant: "destructive",
      });
      
      // Fallback to mock data if API fails
      setProperties(mockProperties);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchProperties();
  }, []);

  const handleSearch = () => {
    fetchProperties();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-emerald-500';
    if (score >= 80) return 'bg-green-500';
    if (score >= 70) return 'bg-yellow-500';
    if (score >= 60) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'zillow': return 'bg-blue-500';
      case 'redfin': return 'bg-red-500';
      case 'streeteasy': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-background to-background/80">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {t('realEstate.title') || 'Premium Real Estate Listings'}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('realEstate.subtitle') || 'Intelligently curated properties based on market analysis and value optimization'}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1">
              <Input
                placeholder={t('realEstate.searchPlaceholder')}
                value={filters.location}
                onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                className="h-12"
              />
            </div>
            <Button onClick={handleSearch} className="h-12 px-8" disabled={loading}>
              <Search className="w-4 h-4 mr-2" />
              {loading ? t('realEstate.searching') : t('realEstate.search')}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="h-12 px-6"
            >
              <Filter className="w-4 h-4 mr-2" />
              {t('realEstate.filter')}
            </Button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <Card className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">{t('realEstate.minPrice')}</label>
                  <Input
                    type="number"
                    placeholder="$0"
                    value={filters.minPrice}
                    onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">{t('realEstate.maxPrice')}</label>
                  <Input
                    type="number"
                    placeholder={t('realEstate.noLimit')}
                    value={filters.maxPrice}
                    onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">{t('realEstate.propertyType')}</label>
                  <Select value={filters.propertyType} onValueChange={(value) => 
                    setFilters(prev => ({ ...prev, propertyType: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t('realEstate.allTypes')}</SelectItem>
                      <SelectItem value="house">{t('realEstate.house')}</SelectItem>
                      <SelectItem value="condo">{t('realEstate.condo')}</SelectItem>
                      <SelectItem value="townhouse">{t('realEstate.townhouse')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">{t('realEstate.sortBy')}</label>
                  <Select value={filters.sortBy} onValueChange={(value) => 
                    setFilters(prev => ({ ...prev, sortBy: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">{t('realEstate.newest')}</SelectItem>
                      <SelectItem value="price_low">{t('realEstate.priceLow')}</SelectItem>
                      <SelectItem value="price_high">{t('realEstate.priceHigh')}</SelectItem>
                      <SelectItem value="value_score">{t('realEstate.valueScore')}</SelectItem>
                      <SelectItem value="market_score">{t('realEstate.marketScore')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Properties Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">{t('realEstate.loading')}</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">{t('realEstate.noResults')}</p>
            <p className="text-sm text-muted-foreground mt-2">{t('realEstate.adjustSearch')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
                {/* Property Image */}
                <div className="relative h-48 bg-gray-200">
                  {property.image_urls?.[0] ? (
                    <img
                      src={property.image_urls[0]}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <MapPin className="w-12 h-12 text-muted-foreground" />
                    </div>
                  )}
                  
                  {/* Source Badge */}
                  <Badge className={`absolute top-3 left-3 ${getSourceColor(property.source)} text-white`}>
                    {property.source.toUpperCase()}
                  </Badge>

                  {/* Scores */}
                  <div className="absolute top-3 right-3 flex gap-1">
                    <Badge className={`${getScoreColor(property.value_score)} text-white text-xs`}>
                      {t('realEstate.valueScore.label')} {property.value_score}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-lg line-clamp-2">{property.title}</CardTitle>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {property.address}, {property.city}, {property.state}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      {formatPrice(property.price)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      ${property.price_per_sqft}{t('realEstate.perSqft')}
                    </span>
                  </div>

                  {/* Property Details */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Bed className="w-4 h-4 mr-1" />
                      {property.bedrooms}{t('realEstate.bedrooms')}
                    </div>
                    <div className="flex items-center">
                      <Bath className="w-4 h-4 mr-1" />
                      {property.bathrooms}{t('realEstate.bathrooms')}
                    </div>
                    <div className="flex items-center">
                      <Square className="w-4 h-4 mr-1" />
                      {property.square_feet?.toLocaleString()}{t('realEstate.sqft')}
                    </div>
                  </div>

                  {/* Scores */}
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs">
                      <Star className="w-3 h-3 mr-1" />
                      {t('realEstate.market')} {property.market_score}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {t('realEstate.interest')} {property.interest_score}
                    </Badge>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {property.description}
                  </p>

                  <Separator />

                  {/* View Listing Button */}
                  <Button 
                    className="w-full" 
                    onClick={() => window.open(property.listing_url, '_blank')}
                  >
                    {t('realEstate.viewDetails')}
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};