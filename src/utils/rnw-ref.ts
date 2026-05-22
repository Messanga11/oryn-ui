/**
 * Type utilities for react-native-web ref forwarding.
 *
 * react-native-web forwards View/Text refs to the underlying DOM element at
 * runtime, but TypeScript types them as React Native's View/Text. This type
 * alias satisfies both sides without requiring @ts-expect-error at each use site.
 *
 * Usage:
 *   const divRef = useRef(null) as RNWViewRef<HTMLDivElement>;
 *   <Box ref={divRef} />  // no TS error
 *   divRef.current?.getBoundingClientRect()  // typed as HTMLDivElement
 */
import { useRef } from 'react';
import type { View, Text } from 'react-native';

/**
 * A ref typed as `RefObject<View>` (satisfies react-native props) whose
 * `.current` is narrowed to the given DOM element type for web access.
 */
export type RNWViewRef<T extends HTMLElement = HTMLElement> = React.RefObject<View> & {
  current: T | null;
};

/**
 * A ref typed as `RefObject<Text>` (satisfies react-native props) whose
 * `.current` is narrowed to the given DOM element type for web access.
 */
export type RNWTextRef<T extends HTMLElement = HTMLElement> = React.RefObject<Text> & {
  current: T | null;
};

/** Creates a properly-typed ref for a react-native-web View (renders as HTMLElement). */
export function useRNWViewRef<T extends HTMLElement = HTMLElement>(): RNWViewRef<T> {
  return useRef(null) as unknown as RNWViewRef<T>;
}

/** Creates a properly-typed ref for a react-native-web Text (renders as HTMLElement). */
export function useRNWTextRef<T extends HTMLElement = HTMLElement>(): RNWTextRef<T> {
  return useRef(null) as unknown as RNWTextRef<T>;
}
