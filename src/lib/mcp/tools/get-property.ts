import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseAnon } from "../supabase";

export default defineTool({
  name: "get_property",
  title: "Get property details",
  description: "Fetch the full details of one property listing by its id.",
  inputSchema: {
    id: z.string().uuid().describe("The property id returned by search_properties."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ id }) => {
    const supabase = supabaseAnon();
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("id", id)
      .eq("is_active", true)
      .maybeSingle();

    if (error) {
      return { content: [{ type: "text" as const, text: error.message }], isError: true };
    }
    if (!data) {
      return {
        content: [{ type: "text" as const, text: `No active listing found for id ${id}.` }],
        isError: true,
      };
    }
    return {
      content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
      structuredContent: { property: data },
    };
  },
});
