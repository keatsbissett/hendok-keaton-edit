/** @type {import('tailwindcss').Config} */
// Nucleus AI Platform Design Guide — Tailwind token mapping (§13.2)
// CSS variables declared in globals.css.
// Semantic tokens use rgb(var(--token) / <alpha-value>) so opacity utilities work.

module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* === Design guide semantic tokens === */
        background:        'rgb(var(--background) / <alpha-value>)',
        surface:           'rgb(var(--surface)    / <alpha-value>)',
        card:              'rgb(var(--card)        / <alpha-value>)',
        muted:             'rgb(var(--muted)       / <alpha-value>)',
        border:            'rgb(var(--border)      / <alpha-value>)',
        foreground:        'rgb(var(--text)        / <alpha-value>)',
        'muted-foreground':'rgb(var(--text-muted)  / <alpha-value>)',

        primary: {
          DEFAULT:    'rgb(var(--primary)    / <alpha-value>)',
          foreground: 'rgb(var(--primary-fg) / <alpha-value>)',
        },
        accent: {
          DEFAULT:    'rgb(var(--accent)    / <alpha-value>)',
          foreground: 'rgb(var(--accent-fg) / <alpha-value>)',
        },
        success: 'rgb(var(--success) / <alpha-value>)',
        warning: 'rgb(var(--warning) / <alpha-value>)',
        danger:  'rgb(var(--danger)  / <alpha-value>)',
        info:    'rgb(var(--info)    / <alpha-value>)',

        /* === Category colors (§9) === */
        cat: {
          financial:  'rgb(var(--cat-financial)   / <alpha-value>)',
          market:     'rgb(var(--cat-market)      / <alpha-value>)',
          customer:   'rgb(var(--cat-customer)    / <alpha-value>)',
          sector:     'rgb(var(--cat-sector)      / <alpha-value>)',
          management: 'rgb(var(--cat-management)  / <alpha-value>)',
          risk:       'rgb(var(--cat-risk)        / <alpha-value>)',
          evidence:   'rgb(var(--cat-evidence)    / <alpha-value>)',
        },

        /* === Legacy tokens — kept for existing result components === */
        'hendok-red':       '#C0392B',
        'hendok-red-hover': '#A93226',
        tier: {
          material:    '#e74c3c',
          'material-bg': 'rgba(231,76,60,0.12)',
          watch:       '#e6a817',
          'watch-bg':  'rgba(230,168,23,0.12)',
          skip:        '#27ae60',
          'skip-bg':   'rgba(39,174,96,0.10)',
        },
      },

      borderRadius: {
        /* Design guide §13.2 */
        card:    '1.125rem', /* 18px */
        panel:   '1.5rem',   /* 24px */
        /* Legacy */
        element: '6px',
        pill:    '20px',
      },

      fontFamily: {
        sans: ['var(--font-dm-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-dm-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },

      fontWeight: {
        light:    '300',
        normal:   '400',
        medium:   '500',
        semibold: '600',
        bold:     '700',
      },

      boxShadow: {
        card:   '0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)',
        panel:  '0 4px 16px rgba(0,0,0,0.5)',
        popover:'0 8px 32px rgba(0,0,0,0.6)',
      },
    },
  },
  plugins: [],
}
