import { withTV } from "tailwind-variants/transformer";
import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import { fontFamily } from "tailwindcss/defaultTheme";

const config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}", "./content/**/*.{ts,tsx,mdx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    data: {
      mobile: 'mobile~="true"',
    },
    screens: {
      xs: "475px",
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        bg: "hsl(var(--bg))",
        fg: "hsl(var(--fg))",
        neutral: {
          DEFAULT: "hsl(var(--neutral))",
          hover: "hsl(var(--neutral-hover))",
          active: "hsl(var(--neutral-active))",
          fg: "hsl(var(--neutral-fg))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          hover: "hsl(var(--primary-hover))",
          active: "hsl(var(--primary-active))",
          fg: "hsl(var(--primary-fg))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          hover: "hsl(var(--secondary-hover))",
          active: "hsl(var(--secondary-active))",
          fg: "hsl(var(--secondary-fg))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          hover: "hsl(var(--muted-hover))",
          active: "hsl(var(--muted-active))",
          fg: "hsl(var(--muted-fg))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          hover: "hsl(var(--accent-hover))",
          active: "hsl(var(--accent-active))",
          fg: "hsl(var(--accent-fg))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          hover: "hsl(var(--popover-hover))",
          active: "hsl(var(--popover-active))",
          fg: "hsl(var(--popover-fg))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          hover: "hsl(var(--card-hover))",
          active: "hsl(var(--card-active))",
          fg: "hsl(var(--card-fg))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          hover: "hsl(var(--success-hover))",
          active: "hsl(var(--success-active))",
          fg: "hsl(var(--success-fg))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          hover: "hsl(var(--warning-hover))",
          active: "hsl(var(--warning-active))",
          fg: "hsl(var(--warning-fg))",
        },
        danger: {
          DEFAULT: "hsl(var(--danger))",
          hover: "hsl(var(--danger-hover))",
          active: "hsl(var(--danger-active))",
          fg: "hsl(var(--danger-fg))",
        },
      },
      transitionTimingFunction: {
        drawer: "cubic-bezier(0.32,0.72,0,1)",
      },
      transitionDuration: {
        "3000": "3000ms",
      },
      backgroundImage: {
        gradient:
          "linear-gradient(108deg, rgba(8,148,255,1) 0%, rgba(255,46,84,1) 70%, rgba(255,144,4,1) 100%)",
        // gradient: "linear-gradient(108deg,#0894FF,#C959DD 34%,#FF2E54 68%,#FF9004)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        mono: ["var(--font-geist-mono)", ...fontFamily.mono],
        display: ["var(--font-display)", ...fontFamily.sans],
        josephin: ["var(--font-josephin)", ...fontFamily.sans],
      },
      transitionDelay: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
        "900": "900ms",
        "1200": "1200ms",
      },
      gridTemplateColumns: {
        "16": "repeat(16, minmax(0, 1fr))",
        "18": "repeat(18, minmax(0, 1fr))",
      },
      keyframes: {
        "track-toast-duration": {
          "0%": { transform: "scaleX(1)" },
          "100%": { transform: "scaleX(0)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "collapsible-down": {
          from: { height: "0" },
          to: { height: "var(--radix-collapsible-content-height)" },
        },
        "collapsible-up": {
          from: { height: "var(--radix-collapsible-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "progress-grow": {
          "0%": {
            transform: "scaleX(0.01)",
          },
          "20%": {
            transform: "scaleX(0.1)",
          },
          "30%": {
            transform: "scaleX(0.6)",
          },
          "40%,50%": {
            transform: "scaleX(0.9)",
          },
          "100%": {
            transform: "scaleX(1)",
          },
        },
        "progress-pulse": {
          "0%": {
            "mask-position": "200% center",
          },
          "100%": {
            "mask-position": "0% center",
          },
        },
      },
      animation: {
        "track-toast-duration": "track-toast-duration ease-in-out forwards",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "collapsible-down": "collapsible-down 0.2s ease-out",
        "collapsible-up": "collapsible-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "progress-indeterminate":
          "progress-grow var(--progress-duration) 1 both normal, progress-pulse 1s ease var(--progress-duration) infinite normal none running",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwindcss-react-aria-components")],
} satisfies Config;

export default withTV(config);