/** Form/API payload for update profile */
export interface UpdateProfilePayload {
  storeName: string
  name: string
  number: string
  location: string
  city: string
  zipCode: string
  peerGroup: string
  state?: string
  email?: string
  password?: string
}

export interface UpdateProfileRequest {
  retailerId: string
  data: UpdateProfilePayload
}

export interface UpdateProfileResponse {
  status?: boolean
  message?: string
  data?: { status?: boolean; message?: string }
}

export interface GetStaticPeerGroupsResponse {
  data?: string[]
}
