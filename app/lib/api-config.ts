import Config from "@/config"

export const getApiUrl = () => {
  // Use Config directly - already switches based on __DEV__
  return Config.API_URL
}

export const buildQueryParams = (params: Record<string, string | number | undefined>) => {
  const query = Object.entries(params)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
    .join("&")

  return query ? `?${query}` : ""
}
