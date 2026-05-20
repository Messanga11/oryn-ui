import { Box } from '../../primitives/box';
import { Image } from '../../primitives/image';
import { Typography } from '../../primitives/typography';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const SIZE_PX: Record<AvatarSize, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64,
};

const TEXT_CLASS: Record<AvatarSize, string> = {
  xs: 'text-xs font-bold',
  sm: 'text-sm font-bold',
  md: 'text-base font-bold',
  lg: 'text-xl font-bold',
  xl: 'text-2xl font-bold',
};

export interface AvatarProps {
  src?: string;
  name?: string;
  size?: AvatarSize;
  className?: string;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

export function Avatar({ src, name, size = 'md', className }: AvatarProps) {
  const px = SIZE_PX[size];

  if (src) {
    return (
      <Image
        source={src}
        width={px}
        height={px}
        className={['rounded-full overflow-hidden', className].filter(Boolean).join(' ')}
        alt={name}
      />
    );
  }

  return (
    <Box
      className={[
        'rounded-full bg-primary-500/20 items-center justify-center',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ width: px, height: px }}
    >
      <Typography className={[TEXT_CLASS[size], 'text-primary-400'].join(' ')}>
        {name ? getInitials(name) : '?'}
      </Typography>
    </Box>
  );
}
