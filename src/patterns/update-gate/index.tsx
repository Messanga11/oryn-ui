import type { ReactNode } from 'react';
import { Column } from '../../layout/column';
import { ForceUpdateScreen } from './force-update-screen';
import { UpdateSuggestionBanner } from './update-suggestion-banner';

export interface VersionCheckResult {
  updateRequired?: boolean;
  updateSuggested?: boolean;
  latestVersion?: string;
  storeUrl?: string;
  releaseNotes?: string;
}

export interface UpdateGateProps {
  /**
   * App name matching the `appName` field in the Convex `appVersions` table.
   * e.g. "admin-app", "driver-app"
   */
  appName: string;
  /** Current app version (from package.json / app.json) */
  currentVersion: string;
  platform: 'ios' | 'android' | 'web';
  children: ReactNode;
  /**
   * Version check result from Convex query.
   * Pass `useQuery(api.appVersions.checkVersion, {...})` result here.
   * Pass `undefined` while loading — children render normally (no flash).
   */
  versionCheck: VersionCheckResult | undefined | null;
}

/**
 * UpdateGate — mandatory update wrapper.
 * MUST wrap the root layout of every app.
 *
 * Usage:
 * ```tsx
 * const versionCheck = useQuery(api.appVersions.checkVersion, {
 *   appName: 'driver-app',
 *   platform: Platform.OS,
 *   currentVersion: version,
 * });
 *
 * <UpdateGate appName="driver-app" currentVersion={version} platform={Platform.OS} versionCheck={versionCheck}>
 *   <Stack />
 * </UpdateGate>
 * ```
 */
export function UpdateGate({ platform, children, versionCheck }: UpdateGateProps) {
  // Loading: render children without flash
  if (versionCheck === undefined) return <>{children}</>;

  // Force update required — block app entirely
  if (versionCheck?.updateRequired) {
    return (
      <ForceUpdateScreen
        latestVersion={versionCheck.latestVersion ?? ''}
        platform={platform}
        {...(versionCheck.storeUrl !== undefined ? { storeUrl: versionCheck.storeUrl } : {})}
        {...(versionCheck.releaseNotes !== undefined
          ? { releaseNotes: versionCheck.releaseNotes }
          : {})}
      />
    );
  }

  // Soft update suggestion — show dismissable banner above content
  if (versionCheck?.updateSuggested) {
    return (
      <Column className="flex-1">
        <UpdateSuggestionBanner
          latestVersion={versionCheck.latestVersion ?? ''}
          platform={platform}
          {...(versionCheck.storeUrl !== undefined ? { storeUrl: versionCheck.storeUrl } : {})}
        />
        {children}
      </Column>
    );
  }

  return <>{children}</>;
}

export { ForceUpdateScreen } from './force-update-screen';
export { UpdateSuggestionBanner } from './update-suggestion-banner';
export type { ForceUpdateScreenProps } from './force-update-screen';
export type { UpdateSuggestionBannerProps } from './update-suggestion-banner';
