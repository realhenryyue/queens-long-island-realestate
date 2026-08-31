import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseAnon } from "../supabase";

export default defineTool({
  name: "search_properties",
  title: "Search property listings",
  description:
    "Search active NYC-area real estate listings (Queens, Manhattan, Brooklyn, Bronx, Staten Island, Nassau County) by city, price range, bedrooms, and property type.",
  inputSchema: {
    city: z.string().trim().optional().describe("City name filter, e.g. 'Flushing'."),
    state: z.string().trim().optional().describe("Two-letter state code, e.g. 'NY'."),
    min_price: z.number().int().nonnegative().optional().describe("Minimum price in USD."),
    max_price: z.number().int().nonnegative().optional().describe("Maximum price in USD."),
    min_bedrooms: z.number().int().nonnegative().optional().describe("Minimum bedroom count."),
    property_type: z.string().trim().optional().describe("Property type filter, e.g. 'condo'."),
    limit: z.number().int().min(1).max(50).default(10).describe("Maximum results to return."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ city, state, min_price, max_price, min_bedrooms, property_type, limit }) => {
    const supabase = supabaseAnon();
    let query = supabase
      .from("properties")
      .select(
        "id,title,price,address,city,state,zip_code,bedrooms,bathrooms,square_feet,property_type,price_per_sqft,market_score,value_score,listing_url",
      )
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(limit ?? 10);

    if (city) query = query.ilike("city", `%${city}%`);
    if (state) query = query.ilike("state", state);
    if (typeof min_price === "number") query = query.gte("price", min_price);
    if (typeof max_price === "number") query = query.lte("price", max_price);
    if (typeof min_bedrooms === "number") query = query.gte("bedrooms", min_bedrooms);
    if (property_type) query = query.ilike("property_type", `%${property_type}%`);

    const { data, error } = await query;
    if (error) {
      return { content: [{ type: "text" as const, text: error.message }], isError: true };
    }
    return {
      content: [
        {
          type: "text" as const,
          text:
            data && data.length
              ? JSON.stringify(data, null, 2)
              : "No matching active listings found.",
        },
      ],
      structuredContent: { count: data?.length ?? 0, properties: data ?? [] },
    };
  },
});
