# PizzaApp - Folder & File Structure Documentation

> Generated: Current codebase structure  
> Purpose: Reference document for developers  
> Last Updated: Based on current codebase state

---

## Root Directory Structure

```
PizzaApp/
├── android/                    # Android native project files
├── app/                        # Main application source code
├── assets/                     # Static assets (fonts, icons, images)
├── ignite/                     # Ignite CLI templates
├── test/                       # Test configuration and utilities
├── types/                      # TypeScript type definitions
├── app.config.ts              # Expo app configuration
├── app.json                   # Expo manifest
├── babel.config.js            # Babel configuration
├── eas.json                   # EAS Build configuration
├── index.tsx                  # Application entry point
├── jest.config.js             # Jest test configuration
├── metro.config.js            # Metro bundler configuration
├── package.json               # NPM dependencies and scripts
├── tsconfig.json              # TypeScript configuration
└── README.md                  # Project documentation
```

---

## `/app` - Main Application Source

### `/app/api` - API Layer (TanStack React Query)

```
api/
├── retailer/
│   ├── auth/
│   │   ├── api.ts                    # Auth API functions (login, register, OTP verify)
│   │   ├── constants.ts              # Auth API constants
│   │   ├── index.ts                  # Barrel exports
│   │   ├── mutation-options.ts       # Mutation hooks (login, register, OTP)
│   │   ├── query-options.ts          # Query hooks (whoami)
│   │   └── types.ts                  # Auth request/response types
│   └── product/
│       ├── api.ts                    # Product API functions (search, trending, categories)
│       ├── constants.ts              # Product API constants
│       ├── index.ts                  # Barrel exports
│       ├── query-options.ts          # Product query hooks
│       └── types.ts                  # Product request/response types
└── version/
    ├── api.ts                        # Version API function
    ├── constants.ts                  # Version constants
    ├── index.ts                      # Barrel exports
    ├── query-options.ts              # Version query hooks
    └── types.ts                      # Version types
```

**Pattern:** Each API module follows:

- `api.ts` - API client functions
- `constants.ts` - Endpoints and keys
- `types.ts` - TypeScript interfaces
- `query-options.ts` or `mutation-options.ts` - TanStack Query hooks
- `index.ts` - Barrel exports

---

### `/app/components` - Reusable Components

```
components/
├── common-components/                 # Shared UI components
│   ├── button/
│   │   ├── button.tsx
│   │   └── lib/
│   │       ├── constants.ts
│   │       ├── styles.ts
│   │       └── types.ts
│   ├── custom-card/
│   │   ├── custom-card.tsx
│   │   └── lib/
│   │       ├── constants.ts
│   │       ├── styles.ts
│   │       └── types.ts
│   ├── custom-toast/
│   │   ├── custom-toast.tsx
│   │   └── lib/
│   │       ├── constants.ts
│   │       ├── styles.ts
│   │       └── types.ts
│   ├── file-upload-text-field/
│   │   ├── file-upload-text-field.tsx
│   │   └── lib/
│   │       ├── constants.ts
│   │       ├── styles.ts
│   │       └── types.ts
│   ├── header/
│   │   ├── header.tsx
│   │   └── lib/
│   │       ├── constants.ts
│   │       ├── styles.ts
│   │       └── types.ts
│   ├── input-field-contianer/
│   │   ├── input-field-contianer.tsx
│   │   └── lib/
│   │       ├── constants.ts
│   │       ├── styles.ts
│   │       └── types.ts
│   ├── popup-modal/
│   │   ├── popup-modal.tsx
│   │   └── lib/
│   │       ├── constants.ts
│   │       ├── styles.ts
│   │       └── types.ts
│   ├── reset-password-otp-container/
│   │   ├── reset-password-otp-container.tsx
│   │   └── lib/
│   │       ├── constants.ts
│   │       ├── styles.ts
│   │       └── types.ts
│   ├── search-field/
│   │   ├── search-field.tsx
│   │   └── lib/
│   │       ├── constants.ts
│   │       ├── styles.ts
│   │       └── types.ts
│   ├── text-input-container/
│   │   ├── text-input-container.tsx
│   │   └── lib/
│   │       ├── constants.ts
│   │       ├── styles.ts
│   │       └── types.ts
│   └── index.ts                      # Barrel exports
├── no-internet-connection/
│   ├── hooks/
│   │   └── use-no-internet-connection.ts
│   ├── lib/
│   │   ├── constants.ts
│   │   └── styles.ts
│   └── no-internet-connection.tsx
├── option-button/
│   └── option-botton.tsx
├── Toggle/
│   ├── Checkbox.tsx
│   ├── Radio.tsx
│   ├── Switch.tsx
│   └── Toggle.tsx
├── AutoImage.tsx
├── Button.tsx
├── Card.tsx
├── EmptyState.tsx
├── Header.tsx
├── Icon.tsx
├── ListItem.tsx
├── Screen.tsx
├── Text.test.tsx
├── Text.tsx
├── TextField.tsx
└── upgradeVersion.tsx
```

**Pattern:** Common components follow:

- `ComponentName.tsx` - Component implementation
- `lib/constants.ts` - Component constants
- `lib/styles.ts` - Component styles
- `lib/types.ts` - Component TypeScript types

---

### `/app/screens` - Screen Components

```
screens/
├── common-screens/
│   └── option-screen/
│       ├── hooks/
│       │   └── use-option-screen.ts
│       ├── index.tsx
│       └── lib/
│           ├── constants.ts
│           └── styles.ts
├── error-screen/
│   ├── error-boundary.tsx
│   └── error-details.tsx
└── retailer/
    ├── create-new-account/
    │   ├── hooks/
    │   │   └── use-create-new-account.ts
    │   ├── index.tsx
    │   └── lib/
    │       ├── constants.ts
    │       ├── styles.ts
    │       └── types.ts
    ├── email-verification/
    │   ├── hooks/
    │   │   └── use-email-verification.ts
    │   ├── index.tsx
    │   └── lib/
    │       ├── constants.ts
    │       ├── styles.ts
    │       └── types.ts
    ├── home-option-list/
    │   ├── heading.tsx
    │   ├── hooks/
    │   │   └── use-home-option-list.ts
    │   ├── index.tsx
    │   └── lib/
    │       ├── constants.ts
    │       ├── styles.ts
    │       └── types.ts
    ├── Login/
    │   ├── hooks/
    │   │   └── use-retailer-login.ts
    │   ├── index.tsx
    │   └── lib/
    │       ├── constants.ts
    │       ├── styles.ts
    │       └── types.ts
    ├── search/
    │   ├── components/
    │   │   └── modal-component.tsx
    │   ├── index.tsx
    │   └── lib/
    │       └── styles.ts
    └── index.ts                      # Barrel exports
```

**Pattern:** Screens follow:

- `index.tsx` - Screen component
- `hooks/use-screen-name.ts` - Custom hook with logic
- `lib/constants.ts` - Screen constants
- `lib/styles.ts` - Screen styles
- `lib/types.ts` - Screen types (when needed)

---

### `/app/navigators` - Navigation Configuration

```
navigators/
├── components/
│   ├── retailer-stack-navigation.tsx
│   └── useCustomBackHandler.js
├── retailer/
│   └── routes.ts                    # Retailer route definitions
├── wholeSeller/
│   └── routes.ts                    # Wholesaler route definitions
├── AppNavigator.tsx                 # Main app navigator
├── DemoNavigator.tsx                # Demo navigator
├── navigationTypes.ts               # Navigation type definitions
└── navigationUtilities.ts           # Navigation helper functions
```

---

### `/app/context` - React Context Providers

```
context/
├── AuthContext.tsx                  # Authentication context
├── EpisodeContext.tsx                # Episode context (demo)
├── RetailerAuthContext.tsx          # Retailer auth state management
└── RoleContext.tsx                   # User role state management
```

---

### `/app/lib` - Core Libraries & Utilities

```
lib/
├── react-query/
│   ├── config.ts                    # React Query configuration
│   ├── keys.ts                       # Query key factory
│   ├── queryClient.ts                # Query client setup
│   └── react-query.ts                # React Query utilities
├── api-client.ts                     # Axios API client instance
├── api-config.ts                     # API configuration (base URL)
├── authStorage.ts                   # Auth token storage utilities
├── constants.ts                     # App-wide constants
└── paths.ts                          # API endpoint path builders
```

---

### `/app/utils` - Utility Functions

```
utils/
├── storage/
│   ├── index.ts                     # MMKV storage utilities
│   ├── role-storage.ts              # Role storage helpers
│   └── storage.test.ts              # Storage tests
├── schema/
│   └── login-schema.ts              # Yup validation schemas
├── delay.ts                          # Delay utility
├── formatDate.ts                     # Date formatting
├── gestureHandler.native.ts         # Native gesture handler
├── gestureHandler.ts                 # Web gesture handler
├── openLinkInBrowser.ts              # Link opening utility
├── role.ts                           # Role utilities
├── schema.tsx                        # Schema utilities
├── useHeader.tsx                     # Header hook
├── useIsMounted.ts                   # Mount check hook
├── useSafeAreaInsetsStyle.ts        # Safe area insets hook
└── VersionContext.tsx                # Version context
```

---

### `/app/config` - Configuration Files

```
config/
├── config.base.ts                    # Base configuration
├── config.dev.ts                     # Development configuration
├── config.prod.ts                    # Production configuration
└── index.ts                          # Configuration exports
```

---

### `/app/theme` - Theming System

```
theme/
├── colors.ts                         # Light theme colors
├── colorsDark.ts                     # Dark theme colors
├── common-styles.ts                  # Shared styles
├── context.tsx                       # Theme context provider
├── context.utils.ts                  # Theme utilities
├── spacing.ts                        # Light theme spacing
├── spacingDark.ts                    # Dark theme spacing
├── styles.ts                         # Base styles
├── theme.ts                          # Theme configuration
├── timing.ts                         # Animation timings
├── types.ts                          # Theme type definitions
└── typography.ts                     # Typography configuration
```

---

### `/app/store` - State Management (Redux - Legacy)

```
store/
├── auth/
│   └── authSlice.ts                  # Auth slice (legacy)
├── index.ts                          # Store configuration
└── rootReducer.ts                    # Root reducer
```

**Note:** Redux is being phased out in favor of TanStack Query + Context + MMKV

---

### `/app/services` - Service Layer

```
services/
└── api/
    ├── api.ts                        # API service class
    ├── api.types.ts                  # API types
    ├── apiProblem.ts                 # API error handling
    └── index.ts                      # Service exports
```

---

### `/app/devtools` - Development Tools

```
devtools/
├── ReactotronClient.ts               # Reactotron client (native)
├── ReactotronClient.web.ts           # Reactotron client (web)
└── ReactotronConfig.ts               # Reactotron configuration
```

---

### `/app/i18n` - Internationalization

```
i18n/
├── ar.ts                             # Arabic translations
├── demo-ar.ts                        # Arabic demo translations
├── demo-en.ts                        # English demo translations
├── demo-es.ts                        # Spanish demo translations
├── demo-fr.ts                        # French demo translations
├── demo-hi.ts                        # Hindi demo translations
├── demo-ja.ts                        # Japanese demo translations
├── demo-ko.ts                        # Korean demo translations
├── en.ts                             # English translations
├── es.ts                             # Spanish translations
├── fr.ts                             # French translations
├── hi.ts                             # Hindi translations
├── index.ts                          # i18n exports
├── ja.ts                             # Japanese translations
├── ko.ts                             # Korean translations
└── translate.ts                      # Translation utilities
```

---

### `/app` - Root App Files

```
app/
├── app.tsx                           # Root app component
└── [other root files]
```

---

## `/assets` - Static Assets

```
assets/
├── fonts/
│   ├── Arial-Rounded-Bold.ttf
│   ├── Poppins-*.ttf                 # Poppins font family (20 variants)
│   ├── Roboto-*.ttf                  # Roboto font family (12 variants)
│   ├── LICENSE.txt
│   └── OFL.txt
├── icons/
│   ├── retailer/
│   │   └── index.tsx                 # Retailer icon exports
│   └── wholeSeller/
│       ├── *.png                     # Wholesaler icons (38 files)
│       ├── *.jpg                     # Wholesaler images (1 file)
│       └── index.ts                  # Icon exports
└── Images/
    └── wholeSeller/
        ├── *.png                     # Wholesaler images (6 files)
        └── index.tsx                 # Image exports
```

---

## `/test` - Test Configuration

```
test/
├── i18n.test.ts                      # i18n tests
├── mockFile.ts                       # Mock utilities
├── setup.ts                          # Test setup
└── test-tsconfig.json                # TypeScript config for tests
```

---

## `/types` - TypeScript Type Definitions

```
types/
├── global.d.ts                       # Global type definitions
└── lib.es5.d.ts                     # ES5 library types
```

---

## `/android` - Android Native Project

```
android/
├── app/
│   ├── build.gradle
│   ├── debug.keystore
│   ├── proguard-rules.pro
│   └── src/
├── build/
├── gradle/
│   └── wrapper/
├── build.gradle
├── gradle.properties
├── gradlew
├── gradlew.bat
└── settings.gradle
```

---

## `/ignite` - Ignite CLI Templates

```
ignite/
└── templates/
    ├── app-icon/                     # App icon templates
    ├── component/                    # Component templates
    ├── navigator/                     # Navigator templates
    ├── screen/                        # Screen templates
    └── splash-screen/                 # Splash screen templates
```

---

## Architecture Patterns

### 1. API Layer Pattern

Each API module follows a consistent structure:

- **`api.ts`** - API client functions using Axios
- **`constants.ts`** - Endpoint URLs and query keys
- **`types.ts`** - TypeScript interfaces for requests/responses
- **`query-options.ts`** - TanStack Query hooks and options
- **`mutation-options.ts`** - TanStack Query mutation hooks
- **`index.ts`** - Barrel exports

### 2. Component Pattern

Common components follow:

- **`ComponentName.tsx`** - Component implementation
- **`lib/constants.ts`** - Component-specific constants
- **`lib/styles.ts`** - Component styles (StyleSheet)
- **`lib/types.ts`** - Component TypeScript types

### 3. Screen Pattern

Screens follow:

- **`index.tsx`** - Screen component (presentation)
- **`hooks/use-screen-name.ts`** - Custom hook (logic, state, API calls)
- **`lib/constants.ts`** - Screen constants
- **`lib/styles.ts`** - Screen styles
- **`lib/types.ts`** - Screen types (when needed)

### 4. State Management Pattern

- **TanStack React Query** - Server state (API calls)
- **React Context** - Global client state (auth, role)
- **MMKV Storage** - Persistent storage (synchronous, fast)
- **Local State (useState)** - Component-specific state

---

## Key Technologies

- **React Native** - Mobile framework
- **Expo** - Development platform
- **TypeScript** - Type safety
- **TanStack React Query** - Server state management
- **React Navigation** - Navigation
- **MMKV** - Fast storage
- **Axios** - HTTP client
- **React Hook Form** - Form management
- **Yup** - Schema validation

---

## File Naming Conventions

- **Components:** PascalCase (e.g., `Button.tsx`, `SearchField.tsx`)
- **Hooks:** camelCase with `use-` prefix (e.g., `use-retailer-login.ts`)
- **Utilities:** camelCase (e.g., `formatDate.ts`, `authStorage.ts`)
- **Types:** camelCase (e.g., `types.ts`)
- **Constants:** camelCase (e.g., `constants.ts`)
- **Styles:** camelCase (e.g., `styles.ts`)

---

## Import Path Aliases

- `@/` - Points to `/app` directory
- Used for cleaner imports: `@/components`, `@/api`, `@/utils`, etc.

---

_End of Folder Structure Documentation_
