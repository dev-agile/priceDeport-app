import { Dispatch, SetStateAction } from "react"
import { TextInputProps } from "react-native"

export interface SearchFieldProps {
  setQuery: Dispatch<SetStateAction<string>>
  handleOnSearchIcon: () => void
  query: string
  handleDelete: () => void
  isLoading?: boolean
  debouncedSearch?: any
}

export type SearchFieldComponentProps = SearchFieldProps | TextInputProps
