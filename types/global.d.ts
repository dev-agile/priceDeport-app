// Global type declarations for production builds

declare module "*.png" {
  const value: any
  export default value
}

declare module "*.jpg" {
  const value: any
  export default value
}

declare module "*.jpeg" {
  const value: any
  export default value
}

declare module "*.gif" {
  const value: any
  export default value
}

declare module "*.svg" {
  const value: any
  export default value
}

// declare module "lodash/debounce" {
//   interface DebouncedFunction<T extends (...args: any[]) => any> {
//     (...args: Parameters<T>): ReturnType<T> | undefined
//     cancel(): void
//     flush(): ReturnType<T> | undefined
//   }

//   function debounce<T extends (...args: any[]) => any>(
//     func: T,
//     wait?: number,
//     options?: {
//       leading?: boolean
//       maxWait?: number
//       trailing?: boolean
//     },
//   ): DebouncedFunction<T>

//   export = debounce
//   export default debounce
// }

declare module "react-native-html-to-pdf" {
  interface Options {
    html: string
    fileName?: string
    directory?: "Documents" | "Downloads"
    base64?: boolean
    width?: number
    height?: number
    paddingLeft?: number
    paddingRight?: number
    paddingTop?: number
    paddingBottom?: number
    padding?: number
    bgColor?: string
  }

  interface PDF {
    filePath: string
    base64?: string
  }

  const RNHTMLtoPDF: {
    convert(options: Options): Promise<PDF>
  }

  export default RNHTMLtoPDF
  export type { Options, PDF }
}

// Extend global types
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test"
    }
  }
}

// Common interface extensions
interface IFormInput {
  [key: string]: any
}

interface IUserVerifyType {
  [key: string]: any
}

interface IOTPVerify {
  [key: string]: any
}

interface LoginResponse {
  [key: string]: any
}

interface AuthResponse {
  [key: string]: any
}

interface UpdateUserType {
  [key: string]: any
}

interface IPDfInfo {
  [key: string]: any
}

// Navigation types
declare module "@react-navigation/native" {
  export interface NavigationProp<ParamList, RouteName extends keyof ParamList = keyof ParamList> {
    navigate: (screen: any, params?: any) => void
  }
}

// Axios extensions
declare module "axios" {
  interface AxiosRequestConfig {
    contentType?: string
    refreshToken?: string
  }
}

export {}
