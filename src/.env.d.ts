interface ImportMetaEnv {
  readonly PUBLIC_BACKEND_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module 'astro:transitions' {
  export const transition: any;
  export const Transition: any;
  export const ViewTransitions: any;
  
  export interface TransitionBeforePreparationEvent extends Event {
    from: URL;
    to: URL;
    direction: 'forward' | 'back';
  }
  
  export interface TransitionBeforeSwapEvent extends Event {
    from: URL;
    to: URL;
    direction: 'forward' | 'back';
  }
  
  export interface TransitionAfterSwapEvent extends Event {
    from: URL;
    to: URL;
    direction: 'forward' | 'back';
  }
}

declare module 'astro:transitions/client' {
  export function navigate(href: string): Promise<void>;
  export function preload(href: string): void;
}