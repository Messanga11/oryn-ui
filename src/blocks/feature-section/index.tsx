import { Card } from '../../components/card';
import { Column } from '../../layout/column';
import { Grid } from '../../layout/grid';
import { SectionLayout } from '../../layout/section-layout';
import { Typography } from '../../primitives/typography';

export interface FeatureItem {
  title: string;
  description: string;
  icon?: string;
}

export interface FeatureSectionProps {
  title?: string;
  description?: string;
  features: FeatureItem[];
  blockType?: string;
  id?: string;
}

export function FeatureSection({ title, description, features }: FeatureSectionProps) {
  return (
    <SectionLayout title={title} description={description}>
      <Grid cols={2} gap={12}>
        {features.map((feature) => (
          <Card key={feature.title} className="flex-1">
            <Column gap={6}>
              {feature.icon ? <Typography className="text-2xl">{feature.icon}</Typography> : null}
              <Typography variant="label">{feature.title}</Typography>
              <Typography variant="body-sm" color="secondary">
                {feature.description}
              </Typography>
            </Column>
          </Card>
        ))}
      </Grid>
    </SectionLayout>
  );
}
