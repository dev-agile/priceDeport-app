# madr-checker

A React Native app built on Expo SDK 54 (RN 0.81, React 19). It ships as a **custom dev client**, not Expo Go — there are too many native modules (MMKV, Reanimated worklets, Sentry, camera, permissions) for Go to load it.

So the first thing a new dev does is build the app once. After that it's just Metro.

---

## Prerequisites

| | |
|---|---|
| Node | 20 or newer (enforced by `engines`) |
| Package manager | whatever lockfile is committed — don't mix npm and yarn |
| Watchman | recommended on macOS |
| iOS | macOS + Xcode + CocoaPods |
| Android | Android Studio, JDK 17, an SDK platform + emulator image |
| EAS CLI | only if you're doing `build:*` (all profiles run `--local`) |
| Maestro | only if you're running e2e |
| Graphviz | only if you want `depcruise:graph` (it shells out to `dot`) |

## Getting set up

```bash
git clone <repo-url>
cd madr-checker
npm install          # postinstall runs patch-package, don't skip it
```

Then build the dev client once for whichever platform you're on:

```bash
npm run ios          # or
npm run android
```

This compiles native code and takes a while the first time — 10–20 minutes is normal, longer on Android. It installs the app on your simulator/emulator and starts Metro.

From then on:

```bash
npm start            # expo start --dev-client
```

Open the installed app, and it connects to Metro. If it doesn't, the dev menu has a "reload"/"change bundler" option.

> If there's a `.env` or config file the app needs, it isn't documented yet — ask someone on the team. See [TODO](#not-covered-yet).

## Scripts you'll actually use

```bash
npm start                # Metro, dev client mode
npm run ios              # build + run on iOS sim
npm run android          # build + run on Android emulator
npm run web              # runs in the browser; native-only modules will misbehave

npm run compile          # tsc --noEmit, run this before pushing
npm run lint             # eslint --fix
npm run lint:check       # eslint, no writes (this is what CI wants)
npm test                 # jest
npm run test:watch

npm run adb              # port-forward Metro + Reactotron to a physical Android device
```

Full list is in `package.json`.

## Testing

Unit and component tests use Jest with `jest-expo` and `@testing-library/react-native`:

```bash
npm test
```

E2E is Maestro, flows live in `.maestro/flows`:

```bash
npm run test:maestro
```

That script passes `MAESTRO_APP_ID=com.pizzaapp`. If flows fail instantly with "app not found", check that ID against the bundle identifier in the Expo config and override it if needed.

## Code quality

`npm run compile` and `npm run lint:check` are the two gates. Prettier runs through ESLint, so there's no separate format command — `npm run lint` fixes formatting for you.

There's also dependency-cruiser for import rules:

```bash
npm run depcruise         # validate against .dependency-cruiser.js
npm run depcruise:graph   # renders app-dependency-graph.svg/.png
```

Worth running the graph once when you're new, just to see how `app/` hangs together.

## Where things are

Source lives in `app/`, entry point is `index.tsx`. `android/` and `ios/` are real, committed native projects (see the note on prebuild below), and `patches/` holds patch-package diffs applied on install.

Rough map of the stack, so you know which docs to open:

- **Navigation** — React Navigation 7 (native stack + bottom tabs)
- **Server state** — TanStack Query, with apisauce/axios underneath
- **Client state** — Redux Toolkit
- **Storage** — react-native-mmkv
- **Forms** — react-hook-form + yup via `@hookform/resolvers`
- **i18n** — i18next / react-i18next, locale from expo-localization
- **Animation** — Reanimated 4 + react-native-worklets
- **Monitoring** — Sentry (crashes), PostHog (product analytics)
- **OTA** — expo-updates, plus expo-in-app-updates for store prompts
- **Debugging** — Reactotron (run `npm run adb` first on a physical Android device)

Note that Reanimated 4 requires the separate `react-native-worklets` package, and it's pinned — `expo install --fix` is configured to leave it alone. Don't bump it casually.

## Builds

All EAS profiles run locally (`--local`), so you need the native toolchain installed:

```bash
npm run build:ios:device
npm run build:android:preview
# etc — dev / development:device / preview / prod for both platforms
```

Profiles themselves are defined in `eas.json`.

## When something breaks

**Metro acting strange** — kill it and restart with `npx expo start --clear`.

**Android build failing after a dependency change**

```bash
npm run android:clean    # nukes .cxx and build dirs
npm run android
```

**iOS pods out of sync** — `cd ios && pod install`.

**Dependency versions look wrong** — `npm run align-deps` (`expo install --fix`) pulls everything back to the versions Expo SDK 54 expects.

**Nothing works and you've tried everything**

```bash
npm run prebuild:clean
```

Careful with this one. It regenerates `android/` and `ios/` from scratch, so any hand-edited native code that isn't expressed as a config plugin or a patch will be lost. Check `git status` afterwards before committing.

## Not covered yet

Things a new dev will hit that this file can't answer — someone with context should fill these in:

- [ ] Environment variables / secrets and how to get them
- [ ] API base URLs per environment
- [ ] Branching and PR conventions
- [ ] Release process, store credentials, who can ship
- [ ] Signing keys and provisioning profiles
- [ ] Sentry / PostHog project access
