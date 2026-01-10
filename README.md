# Tang Zhan | Architect of Intelligence

Personal homepage for Tang Zhan, designed with a "Cyber-Hardcore" aesthetic reflecting the "Arrival" philosophy: *Language is Thought*.

## Identity
- **Role**: Senior Backend Veteran (13y+) -> AI Agent Orchestrator
- **Style**: Tang Zhan (Sharp, Direct, Essence-focused)
- **Stack**: Next.js 14, Bun, CSS Modules (Cyber-noir Theme)

## Features
- **Hero Section**: Strong visual identity with neon typography.
- **Works**: Portfolio grid with glassmorphism effects.
- **Thoughts Stream**: Parsed from local markdown shares.
- **Visual Logs**: Parsed from video scripts.
- **Tech**:
  - `src/lib/content.ts`: Custom markdown content loader.
  - `globals.css`: Centralized CSS variables for the dark theme.
  - `src/app/page.module.css`: Modular styling.

## Running Locally

1. Install dependencies:
   ```bash
   bun install
   ```

2. Run development server:
   ```bash
   bun dev
   ```

3. Build for production:
   ```bash
   bun run build
   bun start
   ```

## Content Management
Content is loaded from `src/content/share` and `src/content/video`. To add new posts, simply drop the markdown files there.
