// ============================================
// Core Types for Editorial Portfolio
// ============================================

export interface Theme {
  bg: string;
  accent: string;
  accentSecondary: string;
  text: string;
  muted: string;
}

export interface PosterLabels {
  season: string;
  year: string;
}

export interface PosterTypography {
  title: string;
  subtitle: string;
  description: string;
}

export interface InterludeTypography {
  pretitle: string;
  title: string;
  titleLine2: string;
  quote: string;
}

export interface PrologueTypography {
  brand: string;
  collection: string;
  year: string;
  subtitle: string;
}

export type PageType = 'image' | 'text';
export type TextPosition = 'left' | 'right' | 'center';

export interface BasePoster {
  id: string;
  type: PageType;
  theme: Theme;
}

export interface ImagePoster extends BasePoster {
  type: 'image';
  image: string;
  textPosition: TextPosition;
  labels: PosterLabels;
  typography: PosterTypography;
}

export interface InterludePoster extends BasePoster {
  type: 'text';
  id: 'interlude';
  typography: InterludeTypography;
}

export interface ProloguePoster extends BasePoster {
  type: 'text';
  id: 'prologue';
  typography: PrologueTypography;
}

export interface EpiloguePoster extends BasePoster {
  type: 'text';
  id: 'epilogue';
  typography: PrologueTypography;
}

export type Poster = ImagePoster | InterludePoster | ProloguePoster | EpiloguePoster;

// Animation
export interface RevealAnimationProps {
  children: React.ReactNode;
  delay?: number;
  isVisible: boolean;
  className?: string;
}
