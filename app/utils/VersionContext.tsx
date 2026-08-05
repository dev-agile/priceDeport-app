// VersionContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from "react"

import { useGetApplicationVersion } from "@/api/version"

const PackageJson = require("../../package.json")

interface ApiResponseDetails {
  id: number
  name: string
}
interface VersionContextType {
  needsUpdate: boolean
  details: ApiResponseDetails[] | false
  forceUpdate: boolean
  setNeedsUpdate: React.Dispatch<React.SetStateAction<boolean>>
}

const VersionContext = createContext<VersionContextType>({
  needsUpdate: false,
  details: false,
  forceUpdate: false,
  setNeedsUpdate: () => {},
})

interface VersionProviderProps {
  children: ReactNode
}

export const VersionProvider: React.FC<VersionProviderProps> = ({ children }) => {
  const [needsUpdate, setNeedsUpdate] = useState(false)
  const [forceUpdate, setForceUpdate] = useState(false)
  const [details, setDetails] = useState<ApiResponseDetails[] | false>(false)
  const { data: versionData, isError, isSuccess, error } = useGetApplicationVersion()

  useEffect(() => {
    const checkVersion = async () => {
      if (isSuccess && versionData) {
        console.log(
          "PackageJson.version",
          PackageJson.version,
          "versionData?.data?.version",
          versionData?.data?.current_version,
        )

        const updateNeeded = PackageJson.version !== versionData?.data?.current_version
        const foreceUpdateNedded = versionData?.data?.force_update
        setForceUpdate(foreceUpdateNedded)
        setNeedsUpdate(updateNeeded)
        setDetails(updateNeeded ? (versionData.data as unknown as ApiResponseDetails[]) : false)
      }
    }

    checkVersion()
  }, [versionData, isSuccess])

  // Only log versionData when it's actually available
  useEffect(() => {
    if (versionData) {
      console.log(versionData, "versionData")
    }
  }, [versionData])

  // Log errors for debugging
  useEffect(() => {
    if (isError && error) {
      console.log("Version check error:", error)
    }
  }, [isError, error])
  return (
    <VersionContext.Provider value={{ needsUpdate, details, forceUpdate, setNeedsUpdate }}>
      <>{children}</>
    </VersionContext.Provider>
  )
}

export const useVersionCheck = () => useContext(VersionContext)
