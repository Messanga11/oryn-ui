import { Linking } from 'react-native';
import { Button } from '../../components/button';
import { Card } from '../../components/card';
import { Column } from '../../layout/column';
import { PageLayout } from '../../layout/page-layout';
import { Typography } from '../../primitives/typography';

export interface ForceUpdateScreenProps {
  latestVersion: string;
  storeUrl?: string;
  releaseNotes?: string;
  platform: 'ios' | 'android' | 'web';
}

/**
 * ForceUpdateScreen — full-screen blocking update wall.
 * No skip, no back. Users MUST update before continuing.
 */
export function ForceUpdateScreen({
  latestVersion,
  storeUrl,
  releaseNotes,
  platform,
}: ForceUpdateScreenProps) {
  const handleUpdate = () => {
    if (platform === 'web') {
      // Force hard reload to pick up new bundle
      if (typeof window !== 'undefined') {
        window.location.reload();
      }
    } else if (storeUrl) {
      void Linking.openURL(storeUrl);
    }
  };

  return (
    <PageLayout centered className="bg-bg-base">
      <Column align="center" gap={24} className="px-6 w-full max-w-sm">
        {/* Update icon placeholder */}
        <Typography className="text-[72px]">🔄</Typography>

        <Column align="center" gap={8}>
          <Typography variant="h2" align="center">
            Mise à jour requise
          </Typography>
          <Typography variant="body" color="secondary" align="center">
            La version {latestVersion} est maintenant disponible. Mettez à jour pour continuer à
            utiliser l'application.
          </Typography>
        </Column>

        {releaseNotes ? (
          <Card className="w-full">
            <Typography variant="label" className="mb-2">
              Nouveautés
            </Typography>
            <Typography variant="body-sm" color="secondary">
              {releaseNotes}
            </Typography>
          </Card>
        ) : null}

        <Button onPress={handleUpdate} size="lg" className="w-full">
          {platform === 'web' ? 'Actualiser la page' : 'Mettre à jour'}
        </Button>
      </Column>
    </PageLayout>
  );
}
