/**
 * TEST-05: Shared matchMedia mock helper.
 */

export type MatchMediaQuery =
  | '(prefers-reduced-motion: reduce)'
  | '(pointer: coarse)';

type MatchMediaOptions = {
  [K in MatchMediaQuery]?: boolean;
};

export function mockMatchMedia(options: MatchMediaOptions = {}): () => void {
  const listeners = new Map<string, Set<(e: MediaQueryListEvent) => void>>();

  const getMatches = (query: string): boolean => {
    if (query === '(prefers-reduced-motion: reduce)') {
      return options['(prefers-reduced-motion: reduce)'] ?? false;
    }
    if (query === '(pointer: coarse)') {
      return options['(pointer: coarse)'] ?? false;
    }
    return false;
  };

  const createMQL = (query: string): MediaQueryList => {
    if (!listeners.has(query)) {
      listeners.set(query, new Set());
    }
    const queryListeners = listeners.get(query)!;

    return {
      matches: getMatches(query),
      media: query,
      onchange: null,
      addEventListener: (type: string, listener: EventListenerOrEventListenerObject) => {
        if (type === 'change') {
          queryListeners.add(listener as (e: MediaQueryListEvent) => void);
        }
      },
      removeEventListener: (type: string, listener: EventListenerOrEventListenerObject) => {
        if (type === 'change') {
          queryListeners.delete(listener as (e: MediaQueryListEvent) => void);
        }
      },
      dispatchEvent: (event: Event) => {
        for (const listener of queryListeners) {
          listener(event as MediaQueryListEvent);
        }
        return true;
      },
      addListener: () => {},
      removeListener: () => {},
    } as unknown as MediaQueryList;
  };

  const originalMatchMedia = window.matchMedia;
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: (query: string) => createMQL(query),
  });

  return () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: originalMatchMedia,
    });
  };
}

export function setupMatchMedia(): () => void {
  return mockMatchMedia({
    '(prefers-reduced-motion: reduce)': false,
    '(pointer: coarse)': false,
  });
}
