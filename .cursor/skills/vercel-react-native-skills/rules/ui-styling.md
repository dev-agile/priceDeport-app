---
title: Modern React Native Styling Patterns
impact: MEDIUM
impactDescription: consistent design, smoother borders, cleaner layouts
tags: styling, css, layout, shadows, gradients
---

## Modern React Native Styling Patterns

Follow these styling patterns for cleaner, more consistent React Native code.

**Always use theme files for styling:**

Import and use the centralized theme files:

- `commonStyles` from `app/theme/styles.ts` for common styling values
- `spacing` from `app/theme/spacing.ts` (light theme) or `app/theme/spacingDark.ts` (dark theme) for spacing
- `typography` from `app/theme/typography.ts` for typography
- `colors` from `app/theme/colors.ts` for colors

```tsx
import { commonStyles } from "@/theme/styles"
import { spacing } from "@/theme/spacing" // or spacingDark for dark theme
import { typography } from "@/theme/typography"
import { colors } from "@/theme/colors"
```

**Always use `borderCurve: 'continuous'` with `borderRadius`:**

```tsx
// Incorrect
{ borderRadius: 12 }

// Correct – smoother iOS-style corners, using commonStyles
import { commonStyles } from "@/theme/styles"

{
  borderRadius: commonStyles.borderRadius.large,
  borderCurve: 'continuous'
}
```

**Use spacing from theme files instead of hardcoded values:**

```tsx
// Incorrect – hardcoded spacing
;<View style={{ padding: 16, gap: 12 }}>
  <Text>First</Text>
  <Text>Second</Text>
</View>

// Correct – use spacing from theme
import { spacing } from "@/theme/spacing"
;<View style={{ padding: spacing.md, gap: spacing.sm }}>
  <Text>First</Text>
  <Text>Second</Text>
</View>
```

**Use `gap` instead of margin for spacing between elements:**

```tsx
// Incorrect – margin on children
import { spacing } from "@/theme/spacing"
;<View>
  <Text style={{ marginBottom: spacing.xs }}>Title</Text>
  <Text style={{ marginBottom: spacing.xs }}>Subtitle</Text>
</View>

// Correct – gap on parent
import { spacing } from "@/theme/spacing"
;<View style={{ gap: spacing.xs }}>
  <Text>Title</Text>
  <Text>Subtitle</Text>
</View>
```

**Use colors from theme files:**

```tsx
// Incorrect – hardcoded colors
<Text style={{ color: '#666' }}>Subtitle</Text>
<View style={{ backgroundColor: '#FFFFFF' }} />

// Correct – use colors from theme
import { colors } from "@/theme/colors"
import { commonStyles } from "@/theme/styles"

<Text style={{ color: commonStyles.colors.textSecondary }}>Subtitle</Text>
<View style={{ backgroundColor: colors.palette.neutral100 }} />
```

**Use typography from theme files:**

```tsx
// Incorrect – hardcoded font sizes and weights
<Text style={{ fontSize: 18, fontWeight: '600' }}>Title</Text>
<Text style={{ fontSize: 14 }}>Subtitle</Text>

// Correct – use typography and commonStyles from theme
import { typography } from "@/theme/typography"
import { commonStyles } from "@/theme/styles"

<Text style={{
  fontFamily: typography.primary.semiBold,
  fontSize: commonStyles.fontSize.large
}}>Title</Text>
<Text style={{
  fontFamily: typography.primary.normal,
  fontSize: commonStyles.fontSize.medium
}}>Subtitle</Text>
```

**Use commonStyles for consistent styling:**

```tsx
// Incorrect – hardcoded border radius, colors, etc.
;<View
  style={{
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  }}
/>

// Correct – use commonStyles
import { commonStyles } from "@/theme/styles"
;<View
  style={{
    borderRadius: commonStyles.borderRadius.medium,
    borderWidth: commonStyles.borderWidth.small,
    borderColor: commonStyles.borderColor.secondary,
  }}
/>
```

**Use `experimental_backgroundImage` for linear gradients:**

```tsx
// Incorrect – third-party gradient library
;<LinearGradient colors={["#000", "#fff"]} />

// Correct – native CSS gradient syntax with theme colors
import { colors } from "@/theme/colors"
;<View
  style={{
    experimental_backgroundImage: `linear-gradient(to bottom, ${colors.palette.neutral900}, ${colors.palette.neutral100})`,
  }}
/>
```

**Use CSS `boxShadow` string syntax for shadows:**

```tsx
// Incorrect – legacy shadow objects or elevation
{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1 }
{ elevation: 4 }

// Correct – CSS box-shadow syntax, or use commonStyles.boxShadow
import { commonStyles } from "@/theme/styles"

// Option 1: Use commonStyles
{ ...commonStyles.boxShadow.small }

// Option 2: CSS box-shadow syntax with theme colors
import { colors } from "@/theme/colors"

{ boxShadow: `0 2px 8px ${colors.palette.neutral900}20` }
```

**Avoid multiple font sizes – use weight and color for emphasis:**

```tsx
// Incorrect – varying font sizes for hierarchy
<Text style={{ fontSize: 18 }}>Title</Text>
<Text style={{ fontSize: 14 }}>Subtitle</Text>
<Text style={{ fontSize: 12 }}>Caption</Text>

// Correct – consistent size from commonStyles, vary weight and color
import { commonStyles } from "@/theme/styles"
import { typography } from "@/theme/typography"

<Text style={{
  fontSize: commonStyles.fontSize.large,
  fontFamily: typography.primary.semiBold
}}>Title</Text>
<Text style={{
  fontSize: commonStyles.fontSize.medium,
  color: commonStyles.colors.textSecondary
}}>Subtitle</Text>
<Text style={{
  fontSize: commonStyles.fontSize.small,
  color: commonStyles.colors.textTertiary
}}>Caption</Text>
```

**Theme-aware spacing (light vs dark theme):**

```tsx
// Use appropriate spacing file based on theme
import { spacing } from "@/theme/spacing" // Light theme
// or
import { spacing } from "@/theme/spacingDark" // Dark theme
;<View style={{ padding: spacing.lg, gap: spacing.md }}>
  <Text>Content</Text>
</View>
```

Limiting font sizes creates visual consistency. Use `fontWeight` (from `typography`), `commonStyles.fontWeight`, and semantic colors (from `commonStyles.colors` or `colors`) for hierarchy instead of varying font sizes.
