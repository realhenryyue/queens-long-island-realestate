import FirecrawlApp from '@mendable/firecrawl-js';

interface ErrorResponse {
  success: false;
  error: string;
}

interface CrawlStatusResponse {
  success: true;
  status: string;
  completed: number;
  total: number;
  creditsUsed: number;
  expiresAt: string;
  data: any[];
}

type CrawlResponse = CrawlStatusResponse | ErrorResponse;

export class FirecrawlService {
  private static API_KEY_STORAGE_KEY = 'firecrawl_api_key';
  private static firecrawlApp: FirecrawlApp | null = null;

  static saveApiKey(apiKey: string): void {
    localStorage.setItem(this.API_KEY_STORAGE_KEY, apiKey);
    this.firecrawlApp = new FirecrawlApp({ apiKey });
    console.log('API key saved successfully');
  }

  static getApiKey(): string | null {
    return localStorage.getItem(this.API_KEY_STORAGE_KEY);
  }

  static async testApiKey(apiKey: string): Promise<boolean> {
    try {
      console.log('Testing API key with Firecrawl API');
      this.firecrawlApp = new FirecrawlApp({ apiKey });
      // A simple test crawl to verify the API key
      const testResponse = await this.firecrawlApp.crawlUrl('https://example.com', {
        limit: 1
      });
      return testResponse.success;
    } catch (error) {
      console.error('Error testing API key:', error);
      return false;
    }
  }

  static async searchRealEstateProperties(location: string, filters: any): Promise<{ success: boolean; error?: string; data?: any }> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      return { success: false, error: 'API key not found. Please configure Firecrawl API key first.' };
    }

    try {
      console.log('Searching real estate properties for:', location);
      if (!this.firecrawlApp) {
        this.firecrawlApp = new FirecrawlApp({ apiKey });
      }

      const searchUrls = this.generateSearchUrls(location, filters);
      const allProperties: any[] = [];

      for (const searchUrl of searchUrls) {
        try {
          console.log('Crawling:', searchUrl.url);
          const crawlResponse = await this.firecrawlApp.crawlUrl(searchUrl.url, {
            limit: 10,
            scrapeOptions: {
              formats: ['markdown', 'html'],
              onlyMainContent: true
            }
          }) as CrawlResponse;

          if (crawlResponse.success) {
            const extractedProperties = this.extractPropertiesFromCrawlData(crawlResponse.data, searchUrl.source);
            allProperties.push(...extractedProperties);
          }
        } catch (error) {
          console.error(`Error crawling ${searchUrl.source}:`, error);
          // Continue with other sources even if one fails
        }
      }

      return { 
        success: true,
        data: allProperties 
      };
    } catch (error) {
      console.error('Error during real estate search:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to search real estate properties' 
      };
    }
  }

  private static generateSearchUrls(location: string, filters: any): Array<{url: string, source: string}> {
    const encodedLocation = encodeURIComponent(location);
    const urls: Array<{url: string, source: string}> = [];

    // Zillow search URL
    let zillowUrl = `https://www.zillow.com/homes/${encodedLocation}_rb/`;
    if (filters.minPrice) zillowUrl += `${filters.minPrice}-`;
    if (filters.maxPrice) zillowUrl += `${filters.maxPrice}`;
    zillowUrl += '_price/';
    urls.push({ url: zillowUrl, source: 'zillow' });

    // Redfin search URL
    let redfinUrl = `https://www.redfin.com/city/${encodedLocation.replace(/\s+/g, '-').toLowerCase()}`;
    urls.push({ url: redfinUrl, source: 'redfin' });

    // StreetEasy search URL (primarily NYC)
    if (location.toLowerCase().includes('new york') || location.toLowerCase().includes('nyc') || 
        location.toLowerCase().includes('manhattan') || location.toLowerCase().includes('brooklyn') ||
        location.toLowerCase().includes('queens') || location.toLowerCase().includes('bronx')) {
      let streetEasyUrl = `https://streeteasy.com/for-sale/${encodedLocation.replace(/\s+/g, '-').toLowerCase()}`;
      urls.push({ url: streetEasyUrl, source: 'streeteasy' });
    }

    return urls;
  }

  private static extractPropertiesFromCrawlData(crawlData: any[], source: string): any[] {
    const properties: any[] = [];

    crawlData.forEach((page, index) => {
      if (page.markdown) {
        // Extract property information from markdown content
        const propertyData = this.parsePropertyFromContent(page.markdown, source, page.url);
        if (propertyData) {
          propertyData.id = `${source}_${index}_${Date.now()}`;
          properties.push(propertyData);
        }
      }
    });

    return properties;
  }

  private static parsePropertyFromContent(content: string, source: string, url: string): any | null {
    try {
      // Basic property extraction using regex patterns
      const priceMatch = content.match(/\$[\d,]+/g);
      const bedroomMatch = content.match(/(\d+)\s*(?:bed|br|bedroom)/i);
      const bathroomMatch = content.match(/(\d+(?:\.\d+)?)\s*(?:bath|ba|bathroom)/i);
      const sqftMatch = content.match(/(\d+,?\d*)\s*(?:sq\.?\s*ft|sqft|square feet)/i);

      if (!priceMatch || priceMatch.length === 0) {
        return null; // No price found, likely not a property listing
      }

      const price = parseInt(priceMatch[0].replace(/[\$,]/g, ''));
      const bedrooms = bedroomMatch ? parseInt(bedroomMatch[1]) : 1;
      const bathrooms = bathroomMatch ? parseFloat(bathroomMatch[1]) : 1;
      const sqft = sqftMatch ? parseInt(sqftMatch[1].replace(/,/g, '')) : 1000;

      // Extract title from content (first meaningful line)
      const lines = content.split('\n').filter(line => line.trim().length > 0);
      const title = lines.find(line => line.length > 20 && line.length < 100) || `Property in ${source}`;

      // Generate property object
      return {
        source,
        title: title.substring(0, 100),
        price,
        address: 'Address from listing',
        city: 'City from search',
        state: 'NY',
        bedrooms,
        bathrooms,
        square_feet: sqft,
        property_type: bedrooms > 2 ? 'house' : 'condo',
        description: content.substring(0, 200) + '...',
        image_urls: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800'],
        listing_url: url,
        price_per_sqft: Math.round(price / sqft),
        market_score: Math.floor(Math.random() * 20) + 80, // Random score between 80-100
        value_score: Math.floor(Math.random() * 20) + 80,
        interest_score: Math.floor(Math.random() * 20) + 80,
        created_at: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error parsing property content:', error);
      return null;
    }
  }
}