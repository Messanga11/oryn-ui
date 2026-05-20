// ─── Tokens ────────────────────────────────────────────────────────────────
export * from './tokens';

// ─── Primitives ────────────────────────────────────────────────────────────
export { Box } from './primitives/box';
export type { BoxProps } from './primitives/box';

export { Typography } from './primitives/typography';
export type {
  TypographyProps,
  TextAlign,
  TextColor,
  TextTone,
  FontWeight,
} from './primitives/typography';

export { Image } from './primitives/image';
export type { ImageProps, ImageContentFit } from './primitives/image';

export { Pressable } from './primitives/pressable';
export type { PressableProps } from './primitives/pressable';

export { ScrollContainer } from './primitives/scroll-container';
export type { ScrollContainerProps } from './primitives/scroll-container';

export { List } from './primitives/list';
export type { ListProps } from './primitives/list';

export { Spacer } from './primitives/spacer';
export type { SpacerProps } from './primitives/spacer';

export { Divider } from './primitives/divider';
export type { DividerProps } from './primitives/divider';

// ─── Layout ────────────────────────────────────────────────────────────────
export { Grid } from './layout/grid';
export type { GridProps } from './layout/grid';

export { Row } from './layout/row';
export type { RowProps } from './layout/row';

export { Column } from './layout/column';
export type { ColumnProps } from './layout/column';

export { PageLayout } from './layout/page-layout';
export type { PageLayoutProps } from './layout/page-layout';

export { SectionLayout } from './layout/section-layout';
export type { SectionLayoutProps } from './layout/section-layout';

export { CardLayout } from './layout/card-layout';
export type { CardLayoutProps } from './layout/card-layout';

// ─── Components ────────────────────────────────────────────────────────────
export { Button } from './components/button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './components/button';

export { IconButton } from './components/icon-button';
export type { IconButtonProps, IconButtonVariant, IconButtonSize } from './components/icon-button';

export { Input } from './components/input';
export type { InputProps } from './components/input';

export { TextArea } from './components/text-area';
export type { TextAreaProps } from './components/text-area';

export { Select } from './components/select';
export type { SelectProps, SelectOption } from './components/select';

export { Checkbox } from './components/checkbox';
export type { CheckboxProps } from './components/checkbox';

export { Switch } from './components/switch';
export type { SwitchProps } from './components/switch';

export { Card } from './components/card';
export type { CardProps } from './components/card';

export { Avatar } from './components/avatar';
export type { AvatarProps, AvatarSize } from './components/avatar';

export { Badge } from './components/badge';
export type { BadgeProps, BadgeVariant, BadgeTone } from './components/badge';

export { Chip } from './components/chip';
export type { ChipProps } from './components/chip';

export { Tabs } from './components/tabs';
export type { TabsProps, TabItem } from './components/tabs';

export { Modal } from './components/modal';
export type { ModalProps } from './components/modal';

export { Sheet } from './components/sheet';
export type { SheetProps } from './components/sheet';

export { AlertDialog } from './components/alert-dialog';
export type { AlertDialogProps } from './components/alert-dialog';

export { Alert } from './components/alert';
export type { AlertProps, AlertVariant } from './components/alert';

export { Spinner } from './components/spinner';
export type { SpinnerProps, SpinnerSize } from './components/spinner';

export { Skeleton, SkeletonListItem, SkeletonCard } from './components/skeleton';
export type { SkeletonProps } from './components/skeleton';

export { EmptyState } from './components/empty-state';
export type { EmptyStateProps } from './components/empty-state';

export { ErrorState } from './components/error-state';
export type { ErrorStateProps } from './components/error-state';

export { LoadingState } from './components/loading-state';
export type { LoadingStateProps, LoadingStateLayout } from './components/loading-state';

// ─── Patterns ──────────────────────────────────────────────────────────────
// FormBuilder
export {
  FormBuilder,
  FormBuilderProvider,
  FormBuilderStyleProvider,
} from './patterns/form-builder';
export { defaultRenderers as formBuilderDefaultRenderers } from './patterns/form-builder';
export { createValidators } from './patterns/form-builder';
export type {
  FormBuilderHandle,
  FormBuilderProps,
  FormFieldConfig,
  FieldType,
  FieldConfig,
  FieldRendererComponentProps,
  FieldRendererRegistry,
} from './patterns/form-builder';

// TablePage
export { TablePage, TablePageProvider, useTablePage } from './patterns/table-page';
export type {
  TablePageProps,
  TablePageLabels,
  ModelMessages,
  ModelMessagesResolver,
} from './patterns/table-page';

// UpdateGate
export { UpdateGate, ForceUpdateScreen, UpdateSuggestionBanner } from './patterns/update-gate';
export type {
  UpdateGateProps,
  VersionCheckResult,
} from './patterns/update-gate';

// ─── Providers ─────────────────────────────────────────────────────────────
export { UIProvider } from './providers/UIProvider';
export type { UIProviderProps } from './providers/UIProvider';

// ─── Blocks ────────────────────────────────────────────────────────────────
export { BlockRenderer, createBlockRenderer } from './blocks/block-renderer';
export type { BlockRendererProps } from './blocks/block-renderer';

export { HeroSection } from './blocks/hero-section';
export type { HeroSectionProps } from './blocks/hero-section';

export { ContentSection } from './blocks/content-section';
export type { ContentSectionProps } from './blocks/content-section';

export { CtaSection } from './blocks/cta-section';
export type { CtaSectionProps } from './blocks/cta-section';

export { FeatureSection } from './blocks/feature-section';
export type { FeatureSectionProps, FeatureItem } from './blocks/feature-section';

export { CustomBlock } from './blocks/custom-block';
export type { VexBlock } from './blocks/types';
