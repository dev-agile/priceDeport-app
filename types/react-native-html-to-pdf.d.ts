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
