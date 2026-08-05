export interface ApiVersionData {
  current_version: string
  force_update: boolean
  id?: number
  name?: string
}

export interface ApiVersionResponse {
  data: ApiVersionData
}

export interface ApiResponseDetails {
  id: number
  name: string
}
