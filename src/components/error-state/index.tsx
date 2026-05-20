import { Box } from '../../primitives/box';
import { Typography } from '../../primitives/typography';
import { Button } from '../button';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
}

export function ErrorState({
  title = 'Une erreur est survenue',
  message,
  onRetry,
  retryLabel = 'Réessayer',
  className,
}: ErrorStateProps) {
  return (
    <Box
      className={['flex-1 items-center justify-center py-16 px-8', className]
        .filter(Boolean)
        .join(' ')}
    >
      <Typography variant="h3" align="center" color="error">
        {title}
      </Typography>
      {message ? (
        <Typography variant="body-sm" color="muted" align="center" className="mt-2">
          {message}
        </Typography>
      ) : null}
      {onRetry ? (
        <Button onPress={onRetry} variant="outline" size="md" className="mt-6">
          {retryLabel}
        </Button>
      ) : null}
    </Box>
  );
}
