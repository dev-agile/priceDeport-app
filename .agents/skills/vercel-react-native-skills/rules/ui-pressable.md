---
title: Use ButtonField Component for Buttons
impact: MEDIUM
impactDescription: consistent UI, reusable components, better maintainability
tags: ui, button, pressable, touchable, components
---

## Use ButtonField Component for Buttons

Always use the `ButtonField` component from `app/components/common-components/button/button.tsx` for buttons instead of creating custom button implementations with `TouchableOpacity`, `TouchableHighlight`, or `Pressable`.

**Incorrect (custom button implementations):**

```tsx
import { TouchableOpacity, Text } from "react-native"

function MyButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Text>Press me</Text>
    </TouchableOpacity>
  )
}
```

```tsx
import { Pressable, Text } from "react-native"

function MyButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable onPress={onPress}>
      <Text>Press me</Text>
    </Pressable>
  )
}
```

**Correct (use ButtonField component):**

```tsx
import ButtonField from "@/components/common-components/button/button"

function MyButton({ onPress }: { onPress: () => void }) {
  return <ButtonField value="Press me" onPress={onPress} />
}
```

**ButtonField Props:**

The `ButtonField` component accepts the following props:

- `value: string` - The button text (required)
- `onPress?: () => void` - Callback function when button is pressed
- `isDisabled?: boolean` - Disables the button
- `btnDisable?: boolean` - Alternative prop to disable the button
- `isLoading?: boolean` - Shows loading indicator instead of content
- `icon?: ReactNode` - Optional icon to display alongside text
- `textAlign?: "center" | "left"` - Text alignment (default: "center")
- `variant?: "default" | "active" | "disabled"` - Visual variant (default: "default")
- `screen?: string` - Optional screen identifier
- `handleNewPasswordScreen?: () => void` - Optional callback for password screen

**Examples:**

**Basic button:**

```tsx
import ButtonField from "@/components/common-components/button/button"
;<ButtonField value="Submit" onPress={handleSubmit} />
```

**Button with icon:**

```tsx
import ButtonField from "@/components/common-components/button/button"
import { Image } from "react-native"
import { Icon } from "@/assets/icons/wholeSeller"
;<ButtonField
  value="Upload File"
  onPress={handleUpload}
  icon={<Image source={Icon.UPLOAD_FILES} style={{ width: 20, height: 20 }} resizeMode="contain" />}
/>
```

**Disabled button:**

```tsx
import ButtonField from "@/components/common-components/button/button"
;<ButtonField value="Submit" onPress={handleSubmit} isDisabled={!isFormValid} />
```

**Loading button:**

```tsx
import ButtonField from "@/components/common-components/button/button"
;<ButtonField
  value="Submitting..."
  onPress={handleSubmit}
  isLoading={isSubmitting}
  isDisabled={isSubmitting}
/>
```

**Active variant button:**

```tsx
import ButtonField from "@/components/common-components/button/button"
;<ButtonField value="Selected" onPress={handleSelect} variant="active" />
```

**Left-aligned text with icon:**

```tsx
import ButtonField from "@/components/common-components/button/button"
;<ButtonField value="View Details" onPress={handleView} textAlign="left" icon={<IconComponent />} />
```

**When to use Pressable directly:**

Only use `Pressable` directly for non-button interactive elements that don't fit the button pattern, such as:

- Custom list items with complex layouts
- Card components that are pressable
- Custom interactive areas that aren't buttons

For these cases, prefer `Pressable` from `react-native` or `react-native-gesture-handler` (for scrollable lists):

```tsx
import { Pressable } from "react-native"

function CustomListItem({ onPress }: { onPress: () => void }) {
  return <Pressable onPress={onPress}>{/* Complex custom layout */}</Pressable>
}
```

**Benefits of using ButtonField:**

1. **Consistency** - All buttons look and behave the same across the app
2. **Theme integration** - Uses theme colors, spacing, and typography automatically
3. **Accessibility** - Built-in disabled states and loading indicators
4. **Maintainability** - Single source of truth for button styling
5. **Less code** - No need to write custom button styles
