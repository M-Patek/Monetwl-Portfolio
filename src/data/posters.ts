import type { Poster } from '../types';

export const posters: Poster[] = [
  {
    id: 'prologue',
    type: 'text',
    theme: {
      bg: '#121214',
      accent: '#D4A853',
      accentSecondary: '#5D8AA8',
      text: '#E8E6E1',
      muted: '#4A4A4C'
    },
    typography: {
      brand: 'MONETWL',
      collection: 'Portfolio',
      year: 'MMXXVI',
      subtitle: 'Fashion Editorial'
    }
  },
  {
    id: 'warm',
    type: 'image',
    image: '/poster1.png',
    textPosition: 'right',
    theme: {
      bg: '#2A1A0F',
      accent: '#D4854A',
      accentSecondary: '#E8C9A8',
      text: '#F5E6D3',
      muted: '#A08060'
    },
    labels: { season: 'AUTUMN / WINTER', year: '2026' },
    typography: {
      title: 'DIURNE',
      subtitle: 'The Golden Hour',
      description: 'Where shadows dance with amber light'
    }
  },
  {
    id: 'interlude',
    type: 'text',
    theme: {
      bg: '#1A1A1D',
      accent: '#C9A961',
      accentSecondary: '#8B9AAD',
      text: '#E8E6E1',
      muted: '#5A5A5C'
    },
    typography: {
      pretitle: 'BETWEEN',
      title: 'SHADOWS',
      titleLine2: '& LIGHT',
      quote: 'In the pause between breaths,\nwe find eternity'
    }
  },
  {
    id: 'cool',
    type: 'image',
    image: '/poster2.png',
    textPosition: 'left',
    theme: {
      bg: '#0D1B2A',
      accent: '#E0E6F1',
      accentSecondary: '#5D8AA8',
      text: '#E8F0F8',
      muted: '#4A6670'
    },
    labels: { season: 'SPRING / SUMMER', year: '2026' },
    typography: {
      title: 'NOCTURNE',
      subtitle: 'Crystal Blue',
      description: 'Silence speaks in azure tones'
    }
  },
  {
    id: 'epilogue',
    type: 'text',
    theme: {
      bg: '#0D0D0F',
      accent: '#C4C0BC',
      accentSecondary: '#8B8B8D',
      text: '#E8E8EA',
      muted: '#4A4A4C'
    },
    typography: {
      brand: 'END',
      collection: 'Fin',
      year: 'MMXXVI',
      subtitle: 'Epilogue'
    }
  }
];
