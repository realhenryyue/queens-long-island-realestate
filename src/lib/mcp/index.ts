import { defineMcp } from "@lovable.dev/mcp-js";
import searchPropertiesTool from "./tools/search-properties";
import getPropertyTool from "./tools/get-property";
import estimateRoiTool from "./tools/estimate-roi";
import getAgentContactTool from "./tools/get-agent-contact";

export default defineMcp({
  name: "queens-long-island-realestate",
  title: "queens-long-island-realestate",
  version: "0.1.0",
  instructions:
    "Public tools for Henry Yue's NYC real estate investment site. Use `search_properties` to find active listings by city, price, or bedrooms, `get_property` for full details of one listing, `estimate_roi` to model cap rate and cash flow for an investment, and `get_agent_contact` for the agent's public contact details and service areas.",
  tools: [searchPropertiesTool, getPropertyTool, estimateRoiTool, getAgentContactTool],
});
