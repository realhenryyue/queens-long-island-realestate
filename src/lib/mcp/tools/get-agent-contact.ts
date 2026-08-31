import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_agent_contact",
  title: "Get agent contact info",
  description:
    "Return the public contact details and service areas for Henry Yue, the NYC real estate investment agent behind this site.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const info = {
      name: "Henry Yue",
      chinese_name: "岳先生",
      title: "NYC Real Estate Investment Expert",
      phone: "+1 (718) 717-5210",
      email: "RealHenryYue@gmail.com",
      website: "https://www.realhenryyue.com",
      languages: ["English", "Chinese (Mandarin)"],
      service_areas: [
        "Manhattan",
        "Queens",
        "Brooklyn",
        "Bronx",
        "Staten Island",
        "Nassau County",
      ],
      services: [
        "AI-assisted investment analysis",
        "ROI and cash-flow modeling",
        "Residential sales and purchases",
        "Market and neighborhood research",
      ],
    };
    return {
      content: [{ type: "text" as const, text: JSON.stringify(info, null, 2) }],
      structuredContent: info,
    };
  },
});
