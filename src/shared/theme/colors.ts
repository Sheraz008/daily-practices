export const colors = {
  WHITE: '#FFFFFF',
  BLACK: '#000000',

  BACKGROUND: '#F5F6F8',
  SURFACE: '#FFFFFF',
  SURFACE_MUTED: '#EEF0F4',

  TEXT_PRIMARY: '#1A1D24',
  TEXT_SECONDARY: '#5B6472',
  TEXT_INVERSE: '#FFFFFF',

  PRIMARY: '#3B6FE0',
  PRIMARY_PRESSED: '#2F59B4',
  PRIMARY_DISABLED: '#A9BEEC',

  SUCCESS: '#1F9D55',
  DANGER: '#D64545',
  STAR: '#F2A93B',
  STAR_EMPTY: '#D3D8E0',

  BORDER: '#E2E6EC',

  GRADIENT_START: '#3B6FE0',
  GRADIENT_END: '#6A5AE0',

  PRIMARY_SOFT: '#EAF0FE',
  SUCCESS_SOFT: '#E4F5EC',
  STAR_SOFT: '#FDF0DC',

  OVERLAY_LIGHT: 'rgba(255,255,255,0.18)',
  TEXT_INVERSE_MUTED: 'rgba(255,255,255,0.82)',
} as const;

export const categoryColors = {
  movement: '#E8732C',
  breath: '#2BA6A0',
  reflection: '#7A5AF8',
  rest: '#4F86C6',
} as const;

export type CategoryColorKey = keyof typeof categoryColors;
