export const UI_TEXT = {
  SALES_GRAPH_TITLE: "Sales Graph",
  CURRENT_PRICE: "Current Price",
  PRICE_HISTORY: "Price History (3 Months)",
  NO_DATA_AVAILABLE: "No price history available",
  LOADING: "Loading price history...",
  ERROR_LOADING: "Error loading price history",
  SOMETHING_WENT_WRONG: "Something Went Wrong",
} as const

export const ERROR_MESSAGES = {
  SALES_GRAPH_FETCH_ERROR: "Failed to fetch sales graph data",
  INVALID_PARAMS: "Invalid parameters provided",
} as const

export const CONSOLE_MESSAGES = {
  SALES_GRAPH_FETCHED: "Sales graph data fetched successfully",
  SALES_GRAPH_FETCH_ERROR: "Error fetching sales graph:",
} as const

export const CHART_CONFIG = {
  WIDTH: "100%",
  HEIGHT_PERCENTAGE: 50,
  Y_AXIS_LABEL: "$",
  Y_AXIS_SUFFIX: "k",
  Y_AXIS_INTERVAL: 1,
  DECIMAL_PLACES: 2,
  DOT_RADIUS: 6,
} as const
