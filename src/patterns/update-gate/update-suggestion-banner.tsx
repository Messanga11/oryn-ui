import { useState } from 'react';
import { Linking } from 'react-native';
import { Box } from '../../primitives/box';
import { Typography } from '../../primitives/typography';
import { Button } from '../../components/button';
import { IconButton } from '../../components/icon-button';

export interface UpdateSuggestionBannerProps {
  latestVersion: string;
  storeUrl?: string;
  platform: 'ios' | 'android' | 'web';
}

/**
 * Non-blocking update banner — can be dismissed.
 */
export function UpdateSuggestionBanner({
  latestVersion,
  storeUrl,
  platform,
}: UpdateSuggestionBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const handleUpdate = () => {
    if (platform === 'web' && typeof window !== 'undefined') {
      window.location.reload();
    } else if (storeUrl) {
      void Linking.openURL(storeUrl);
    }
  };

  return (
    <Box className="flex-row items-center bg-primary-500/10 border-b border-primary-500/30 px-4 py-2.5 gap-3">
      <Typography variant="body-sm" className="flex-1 text-primary-400">
        Version {latestVersion} disponible
      </Typography>
      <Button onPress={handleUpdate} variant="outline" size="sm">
        Mettre à jour
      </Button>
      <IconButton
        icon={<Typography className="text-text-muted text-sm">✕</Typography>}
        onPress={() => setDismissed(true)}
        accessibilityLabel="Ignorer"
        size="sm"
      />
    </Box>
  );
}
