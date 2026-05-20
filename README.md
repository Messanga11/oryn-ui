# @oryn/ui

Universal component library for the Mobilis monorepo. Built on **NativeWind v4** + **React Native** — works on iOS, Android, and web (via react-native-web).

## Philosophy

> **Zero primitives in app code.**  
> Every `<div>`, `<View>`, `<Text>`, `<p>`, `<img>`, `<button>`, `<input>` is banned from `apps/` and `packages/features/`. Everything goes through this library.

## Quick map

| HTML / RN primitive | @oryn/ui equivalent |
|---|---|
| `<div>`, `<View>` | `<Box>` |
| `<p>`, `<span>`, `<h1>`–`<h6>`, `<Text>` | `<Typography variant="h1">` etc. |
| `<img>`, `<Image>` | `<Image>` |
| `<button>`, `<TouchableOpacity>` | `<Button>` or `<Pressable>` or `<IconButton>` |
| `<input>`, `<TextInput>` | `<Input>` |
| `<textarea>` | `<TextArea>` |
| `<select>` | `<Select>` |
| `<ScrollView>` | `<ScrollContainer>` |
| `<FlatList>`, `<FlashList>` | `<List>` |
| Layout divs | `<Grid>`, `<Row>`, `<Column>` |
| Page root | `<PageLayout>` |
| Content section | `<SectionLayout>` |
| Card | `<Card>` or `<CardLayout>` |

## Patterns

| Pattern | Usage |
|---|---|
| `<FormBuilder>` | Headless form (TanStack Form + Zod, NativeWind renderers) |
| `<TablePage>` | CRUD list page (TanStack Table + Sheet + AlertDialog) |
| `<UpdateGate>` | Mandatory version check — wraps app root |
| `<BlockRenderer>` | Renders Vex CMS blocks array |

## UpdateGate (required in every app)

```tsx
// apps/driver-app/app/_layout.tsx
import { UpdateGate } from '@oryn/ui';
import { useQuery } from 'convex/react';
import { api } from '@repo/api';
import { version } from '../package.json';
import { Platform } from 'react-native';

export default function RootLayout() {
  const versionCheck = useQuery(api.appVersions.checkVersion, {
    appName: 'driver-app',
    platform: Platform.OS as 'ios' | 'android',
    currentVersion: version,
  });

  return (
    <UpdateGate
      appName="driver-app"
      currentVersion={version}
      platform={Platform.OS as 'ios' | 'android'}
      versionCheck={versionCheck}
    >
      <Stack />
    </UpdateGate>
  );
}
```

## FormBuilder

```tsx
import { FormBuilder, FormBuilderProvider, defaultRenderers as formBuilderDefaultRenderers } from '@oryn/ui';

// Wrap once at app root:
<FormBuilderProvider renderers={formBuilderDefaultRenderers}>
  <App />
</FormBuilderProvider>

// In a screen:
<FormBuilder
  fields={[
    { name: 'email', type: 'email', label: 'Email' },
    { name: 'password', type: 'password', label: 'Mot de passe' },
  ]}
  onSubmit={async (data) => { await login(data); }}
>
  <Button onPress={() => formRef.current?.submit()}>Se connecter</Button>
</FormBuilder>
```

## Design tokens

```ts
import { colors, spacing, typographyVariants } from '@oryn/ui';

colors.primary.DEFAULT  // '#3B5BDB'
colors.bg.surface       // '#141720'
spacing.md              // 16
```
