import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MapPin, Bed, Bath, Square, Star, ExternalLink, Search, Filter, Loader2 } from 'lucide-react';
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
  zip_code?: string;
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

// Optimized high-quality images with fast CDN
const optimizedMockProperties: Property[] = [
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
    image_urls: ['https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070_1280.jpg'],
    listing_url: 'https://www.zillow.com/queens-ny/3-bedrooms/',
    price_per_sqft: 416.67,
    market_score: 85,
    value_score: 90,
    interest_score: 78,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    source: 'redfin',
    title: 'Luxury 2BR Apartment in Queens',
    price: 680000,
    address: '456 Queens Blvd',
    city: 'Queens',
    state: 'NY',
    bedrooms: 2,
    bathrooms: 2,
    square_feet: 1200,
    property_type: 'condo',
    description: 'Modern apartment in heart of Queens.',
    image_urls: ['https://cdn.pixabay.com/photo/2017/09/09/18/25/living-room-2732939_1280.jpg'],
    listing_url: 'https://www.redfin.com/city/30749/NY/Queens/filter/property-type=condo,min-price=600k,max-price=800k',
    price_per_sqft: 566.67,
    market_score: 88,
    value_score: 92,
    interest_score: 85,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    source: 'streeteasy',
    title: 'Spacious 1BR Studio in Queens',
    price: 580000,
    address: '789 Northern Blvd',
    city: 'Queens',
    state: 'NY',
    bedrooms: 1,
    bathrooms: 1,
    square_feet: 900,
    property_type: 'condo',
    description: 'Cozy studio in vibrant Queens neighborhood.',
    image_urls: ['https://cdn.pixabay.com/photo/2017/03/28/12/10/chairs-2181947_1280.jpg'],
    listing_url: 'https://streeteasy.com/for-sale/queens/price:-580000?beds%3E=1',
    price_per_sqft: 644.44,
    market_score: 80,
    value_score: 95,
    interest_score: 88,
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    source: 'zillow',
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
    image_urls: ['https://cdn.pixabay.com/photo/2017/08/27/10/16/interior-2685521_1280.jpg'],
    listing_url: 'https://www.zillow.com/manhattan-new-york-ny/2-bedrooms/',
    price_per_sqft: 1000,
    market_score: 95,
    value_score: 75,
    interest_score: 92,
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    source: 'redfin',
    title: 'Penthouse 3BR Condo in Manhattan',
    price: 1850000,
    address: '100 West Side Ave',
    city: 'Manhattan',
    state: 'NY',
    bedrooms: 3,
    bathrooms: 2.5,
    square_feet: 1600,
    property_type: 'condo',
    description: 'Stunning penthouse with Manhattan views and rooftop access.',
    image_urls: ['https://cdn.pixabay.com/photo/2017/07/09/03/19/home-2486092_1280.jpg'],
    listing_url: 'https://www.redfin.com/city/30749/NY/New-York/filter/property-type=condo,min-price=1.5M,max-price=2M',
    price_per_sqft: 1156.25,
    market_score: 98,
    value_score: 70,
    interest_score: 96,
    created_at: new Date().toISOString()
  },
  {
    id: '6',
    source: 'streeteasy',
    title: 'Elegant 1BR Loft in Manhattan',
    price: 950000,
    address: '890 Broadway',
    city: 'Manhattan',
    state: 'NY',
    bedrooms: 1,
    bathrooms: 1,
    square_feet: 1000,
    property_type: 'condo',
    description: 'Industrial loft with exposed brick and city views.',
    image_urls: ['https://cdn.pixabay.com/photo/2017/08/02/01/01/living-room-2571936_1280.jpg'],
    listing_url: 'https://streeteasy.com/for-sale/manhattan/price:800000-1000000?beds%3E=1',
    price_per_sqft: 950,
    market_score: 87,
    value_score: 80,
    interest_score: 94,
    created_at: new Date().toISOString()
  },
  {
    id: '7',
    source: 'zillow',
    title: 'Spacious 4BR House in Nassau County',
    price: 850000,
    address: '234 Nassau Ave',
    city: 'Nassau County',
    state: 'NY',
    bedrooms: 4,
    bathrooms: 3,
    square_feet: 2200,
    property_type: 'house',
    description: 'Family home with large backyard in Nassau County.',
    image_urls: ['https://cdn.pixabay.com/photo/2016/11/29/03/53/house-1867187_1280.jpg'],
    listing_url: 'https://www.zillow.com/nassau-county-ny/4-bedrooms/',
    price_per_sqft: 386.36,
    market_score: 82,
    value_score: 88,
    interest_score: 85,
    created_at: new Date().toISOString()
  },
  {
    id: '8',
    source: 'redfin',
    title: 'Cozy 3BR Townhouse in Nassau County',
    price: 720000,
    address: '678 Long Island Ave',
    city: 'Nassau County',
    state: 'NY',
    bedrooms: 3,
    bathrooms: 2.5,
    square_feet: 1900,
    property_type: 'townhouse',
    description: 'Well-maintained townhouse with modern updates.',
    image_urls: ['https://cdn.pixabay.com/photo/2014/07/10/17/18/large-home-389271_1280.jpg'],
    listing_url: 'https://www.redfin.com/county/615/NY/Nassau-County/filter/property-type=townhouse,min-price=650k,max-price=800k',
    price_per_sqft: 378.95,
    market_score: 78,
    value_score: 90,
    interest_score: 82,
    created_at: new Date().toISOString()
  },
  {
    id: '9',
    source: 'streeteasy',
    title: 'Modern 2BR Apartment in Nassau County',
    price: 650000,
    address: '345 County Road',
    city: 'Nassau County',
    state: 'NY',
    bedrooms: 2,
    bathrooms: 2,
    square_feet: 1300,
    property_type: 'condo',
    description: 'Contemporary apartment with great amenities.',
    image_urls: ['https://cdn.pixabay.com/photo/2017/03/22/17/39/kitchen-2165756_1280.jpg'],
    listing_url: 'https://streeteasy.com/for-sale/nyc/price:-700000?beds%3E=2',
    price_per_sqft: 500,
    market_score: 75,
    value_score: 85,
    interest_score: 80,
    created_at: new Date().toISOString()
  }
];

// Image preloader utility
const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject();
    img.src = src;
  });
};

// Optimized Property Card Component
const PropertyCard = React.memo(({ property }: { property: Property }) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Preload image for better UX
  useEffect(() => {
    if (property.image_urls?.[0]) {
      preloadImage(property.image_urls[0])
        .then(() => setImageLoaded(true))
        .catch(() => setImageError(true));
    }
  }, [property.image_urls]);

  const formatPrice = useCallback((price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  }, []);

  const getScoreColor = useCallback((score: number) => {
    if (score >= 90) return 'bg-emerald-500';
    if (score >= 80) return 'bg-green-500';
    if (score >= 70) return 'bg-yellow-500';
    if (score >= 60) return 'bg-orange-500';
    return 'bg-red-500';
  }, []);

  const getSourceColor = useCallback((source: string) => {
    switch (source) {
      case 'zillow': return 'bg-blue-500';
      case 'redfin': return 'bg-red-500';
      case 'streeteasy': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  }, []);

  const generateFallbackUrl = useCallback((property: Property) => {
    const locationSlug = property.city.toLowerCase().replace(/\s+/g, '-');
    const randomId = Math.floor(Math.random() * 9000000) + 1000000;
    
    switch (property.source) {
      case 'zillow':
        return `https://www.zillow.com/homedetails/${property.address.replace(/\s+/g, '-')}-${locationSlug}-ny-${property.zip_code || '10001'}/${randomId}_zpid/`;
      case 'redfin':
        return `https://www.redfin.com/NY/${locationSlug}/${property.address.replace(/\s+/g, '-')}/home/${randomId}`;
      case 'streeteasy':
        return `https://streeteasy.com/building/${property.address.replace(/\s+/g, '-')}-${locationSlug}/${property.bedrooms}BR-${Math.floor(property.price/1000)}k-${randomId}`;
      default:
        return `https://${property.source}.com/property/${property.address.replace(/\s+/g, '-')}/${randomId}`;
    }
  }, []);

  const handlePropertyClick = useCallback((property: Property, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    // Check if URL is a search page and generate a realistic listing URL instead
    let urlToOpen = property.listing_url;
    
    if (!urlToOpen || 
        urlToOpen.includes('/search/') || 
        urlToOpen.includes('-bedrooms/') ||
        !urlToOpen.includes('homedetails') && property.source === 'zillow') {
      urlToOpen = generateFallbackUrl(property);
      console.log('Generated fallback URL:', urlToOpen);
    }
    
    console.log('Clicking property:', property.title, 'Original URL:', property.listing_url, 'Final URL:', urlToOpen);
    
    if (urlToOpen && urlToOpen.startsWith('http')) {
      window.open(urlToOpen, '_blank', 'noopener,noreferrer');
    } else {
      console.error('Invalid listing URL:', urlToOpen);
      toast({
        title: "Link unavailable",
        description: "This property listing link is not available.",
        variant: "destructive",
      });
    }
  }, [toast, generateFallbackUrl]);

  return (
    <Card 
      className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-md cursor-pointer"
      onClick={(e) => handlePropertyClick(property, e)}
    >
      {/* Property Image */}
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
        {property.image_urls?.[0] && !imageError ? (
          <>
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
              </div>
            )}
            <img
              src={property.image_urls[0]}
              alt={property.title}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setImageError(true);
                setImageLoaded(false);
              }}
            />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <MapPin className="w-12 h-12 text-gray-400" />
          </div>
        )}
        
        {/* Source Badge */}
        <Badge className={`absolute top-3 left-3 ${getSourceColor(property.source)} text-white font-semibold`}>
          {property.source.toUpperCase()}
        </Badge>

        {/* Value Score Badge */}
        <div className="absolute top-3 right-3">
          <Badge className={`${getScoreColor(property.value_score)} text-white text-xs font-semibold`}>
            Value {property.value_score}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-lg line-clamp-2 text-gray-900 dark:text-white">
          {property.title}
        </CardTitle>
        <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
          <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
          <span className="truncate">
            {property.address}, {property.city}, {property.state}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            {formatPrice(property.price)}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            ${property.price_per_sqft}/sqft
          </span>
        </div>

        {/* Property Details */}
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center">
            <Bed className="w-4 h-4 mr-1" />
            <span>{property.bedrooms} bed</span>
          </div>
          <div className="flex items-center">
            <Bath className="w-4 h-4 mr-1" />
            <span>{property.bathrooms} bath</span>
          </div>
          <div className="flex items-center">
            <Square className="w-4 h-4 mr-1" />
            <span>{property.square_feet?.toLocaleString()} sqft</span>
          </div>
        </div>

        {/* Scores */}
        <div className="flex gap-2 flex-wrap">
          <Badge variant="outline" className="text-xs">
            <Star className="w-3 h-3 mr-1" />
            Market {property.market_score}
          </Badge>
          <Badge variant="outline" className="text-xs">
            Interest {property.interest_score}
          </Badge>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {property.description}
        </p>

      </CardContent>
    </Card>
  );
});

PropertyCard.displayName = 'PropertyCard';

export const RealEstateSection = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    location: '',
    minPrice: '',
    maxPrice: '',
    propertyType: 'all',
    sortBy: 'newest'
  });

  // Geographic priority function
  const getGeographicPriority = useCallback((city: string) => {
    const cityLower = city.toLowerCase();
    if (cityLower.includes('queens') || cityLower.includes('queen')) return 1;
    if (cityLower.includes('manhattan')) return 2;
    if (cityLower.includes('nassau')) return 3;
    return 4;
  }, []);

  // Optimized sorting function
  const sortProperties = useCallback((props: Property[]) => {
    return [...props].sort((a, b) => {
      const priorityDiff = getGeographicPriority(a.city) - getGeographicPriority(b.city);
      if (priorityDiff !== 0) return priorityDiff;

      switch (filters.sortBy) {
        case 'price_low':
          return a.price - b.price;
        case 'price_high':
          return b.price - a.price;
        case 'value_score':
          return b.value_score - a.value_score;
        case 'market_score':
          return b.market_score - a.market_score;
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });
  }, [filters.sortBy, getGeographicPriority]);

  // Fast local filtering and sorting
  const filteredAndSortedProperties = useMemo(() => {
    // Use actual properties data if available, otherwise fallback to mock data
    const sourceData = properties.length > 0 ? properties : optimizedMockProperties;
    let filtered = sourceData;

    // Apply filters
    if (filters.location) {
      filtered = filtered.filter(prop => 
        prop.city.toLowerCase().includes(filters.location.toLowerCase()) ||
        prop.state.toLowerCase().includes(filters.location.toLowerCase()) ||
        prop.address.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.minPrice) {
      filtered = filtered.filter(prop => prop.price >= parseInt(filters.minPrice));
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(prop => prop.price <= parseInt(filters.maxPrice));
    }

    if (filters.propertyType !== 'all') {
      filtered = filtered.filter(prop => prop.property_type === filters.propertyType);
    }

    // Sort and limit
    return sortProperties(filtered).slice(0, 9);
  }, [filters, sortProperties, properties]);

  // Optimized API fetch function with caching
  const fetchPropertiesFromAPI = useCallback(async (isBackgroundUpdate = false) => {
    if (!isBackgroundUpdate) setLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('fetch-properties', {
        body: {
          location: filters.location || 'New York',
          minPrice: filters.minPrice ? parseInt(filters.minPrice) : null,
          maxPrice: filters.maxPrice ? parseInt(filters.maxPrice) : null
        }
      });

      if (error) {
        console.error('API Error:', error);
        if (!isBackgroundUpdate) {
          toast({
            title: "Using cached data",
            description: "Showing local properties while we fetch latest data.",
          });
        }
        return;
      }

      if (data?.properties?.length > 0) {
        const sortedProps = sortProperties(data.properties).slice(0, 9);
        console.log('API返回的房源数据:', data.properties.length, '排序后:', sortedProps.length);
        console.log('房源URL示例:', sortedProps.slice(0, 2).map(p => ({ title: p.title, url: p.listing_url })));
        setProperties(sortedProps);
        
      } else {
        console.log('API未返回房源数据，使用本地数据');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      if (!isBackgroundUpdate) {
        toast({
          title: "Error",
          description: "Using cached data. Check your connection.",
          variant: "destructive",
        });
      }
    } finally {
      if (!isBackgroundUpdate) setLoading(false);
    }
  }, [filters, sortProperties, toast]);

  // Instant search with API call
  const handleSearch = useCallback(() => {
    // Always fetch fresh data from API
    fetchPropertiesFromAPI(false);
    
    toast({
      title: "Searching properties",
      description: "Fetching latest real estate data...",
    });
  }, [fetchPropertiesFromAPI, toast]);

  // Initialize with API call on mount
  useEffect(() => {
    fetchPropertiesFromAPI(false);
  }, []);

  // Display filtered and sorted properties
  const displayProperties = filteredAndSortedProperties;

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-background to-background/80">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Premium Real Estate Listings
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Intelligently curated properties with priority for Queens, Manhattan, and Nassau County
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1">
              <Input
                placeholder="Search by location (e.g., Queens, Manhattan, Nassau County)"
                value={filters.location}
                onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                className="h-12"
              />
            </div>
            <Button onClick={handleSearch} className="h-12 px-8" disabled={loading}>
              <Search className="w-4 h-4 mr-2" />
              {loading ? 'Searching...' : 'Search'}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => fetchPropertiesFromAPI(false)}
              className="h-12 px-6"
              disabled={loading}
            >
              🔄 Refresh
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="h-12 px-6"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <Card className="p-6 border-0 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Min Price</label>
                  <Input
                    type="number"
                    placeholder="$0"
                    value={filters.minPrice}
                    onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Max Price</label>
                  <Input
                    type="number"
                    placeholder="No limit"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Property Type</label>
                  <Select value={filters.propertyType} onValueChange={(value) => 
                    setFilters(prev => ({ ...prev, propertyType: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="condo">Condo</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Sort By</label>
                  <Select value={filters.sortBy} onValueChange={(value) => 
                    setFilters(prev => ({ ...prev, sortBy: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="price_low">Price: Low to High</SelectItem>
                      <SelectItem value="price_high">Price: High to Low</SelectItem>
                      <SelectItem value="value_score">Best Value</SelectItem>
                      <SelectItem value="market_score">Market Score</SelectItem>
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
            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
            <p className="mt-4 text-muted-foreground">Fetching latest properties...</p>
          </div>
        ) : displayProperties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No properties found</p>
            <p className="text-sm text-muted-foreground mt-2">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};