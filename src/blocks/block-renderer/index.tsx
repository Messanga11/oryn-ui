import type { ComponentType } from 'react';
import { Column } from '../../layout/column';
import { CodeSection } from '../code-section';
import { ContentSection } from '../content-section';
import { CtaSection } from '../cta-section';
import { CustomBlock } from '../custom-block';
import { FeatureSection } from '../feature-section';
import { GallerySection } from '../gallery-section';
import { HeroSection } from '../hero-section';
import { QuoteSection } from '../quote-section';
import { StatsSection } from '../stats-section';
import type { VexBlock } from '../types';

/**
 * Built-in block type → component registry.
 * ARCH-09: all new blocks registered here.
 */
const BUILT_IN_REGISTRY: Record<string, ComponentType<VexBlock>> = {
  hero: HeroSection as unknown as ComponentType<VexBlock>,
  content: ContentSection as unknown as ComponentType<VexBlock>,
  cta: CtaSection as unknown as ComponentType<VexBlock>,
  features: FeatureSection as unknown as ComponentType<VexBlock>,
  gallery: GallerySection as unknown as ComponentType<VexBlock>,
  stats: StatsSection as unknown as ComponentType<VexBlock>,
  quote: QuoteSection as unknown as ComponentType<VexBlock>,
  code: CodeSection as unknown as ComponentType<VexBlock>,
};

export interface BlockRendererProps {
  blocks: VexBlock[];
  /** Register additional block types (app-specific) */
  customBlocks?: Record<string, ComponentType<VexBlock>>;
  gap?: number;
}

/**
 * BlockRenderer — maps Vex CMS blocks → React components.
 *
 * Usage:
 * ```tsx
 * <BlockRenderer blocks={page.layout} />
 * ```
 *
 * With custom blocks:
 * ```tsx
 * <BlockRenderer blocks={page.layout} customBlocks={{ 'driver-map': DriverMapBlock }} />
 * ```
 */
export function BlockRenderer({ blocks, customBlocks, gap = 24 }: BlockRendererProps) {
  const registry = { ...BUILT_IN_REGISTRY, ...customBlocks };

  return (
    <Column gap={gap}>
      {blocks.map((block, i) => {
        const Component = registry[block.blockType] ?? CustomBlock;
        return <Component key={block.id ?? i} {...block} />;
      })}
    </Column>
  );
}

/**
 * Factory for creating an extended BlockRenderer with custom blocks pre-registered.
 *
 * ```tsx
 * const AppBlockRenderer = createBlockRenderer({ 'driver-map': DriverMapBlock });
 * <AppBlockRenderer blocks={page.layout} />
 * ```
 */
export function createBlockRenderer(
  customBlocks: Record<string, ComponentType<VexBlock>>,
): ComponentType<Omit<BlockRendererProps, 'customBlocks'>> {
  const registry = { ...BUILT_IN_REGISTRY, ...customBlocks };

  return function ExtendedBlockRenderer({ blocks, gap = 24 }) {
    return (
      <Column gap={gap}>
        {blocks.map((block, i) => {
          const Component = registry[block.blockType] ?? CustomBlock;
          return <Component key={block.id ?? i} {...block} />;
        })}
      </Column>
    );
  };
}
