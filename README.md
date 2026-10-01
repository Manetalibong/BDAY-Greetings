# Birthday Greeting for Gellian

Interactive romantic birthday greeting site — sealed envelope, flower bloom, flip cards, and a finale wish. Built with Vite + React + TypeScript and Framer Motion.

## Edit the message

All copy lives in one file:

[`src/content/greeting.ts`](src/content/greeting.ts)

Soft piano starts when someone taps **Open** (mute anytime from the top-right). Music credit: *Beyond (Piano Edit)* by Pablo Perez (CC0). To use your own song, put an mp3 in `public/audio/` and point `musicSrc` at it.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

> Note: Vite `base` is set to `/BDAY-Greetings/` for GitHub project Pages. If your repo name differs, update `base` in [`vite.config.ts`](vite.config.ts).

## Deploy to GitHub Pages

1. Push this project to a GitHub repo named `BDAY-Greetings` (or change `base` to match).
2. In the repo: **Settings → Pages → Source → GitHub Actions**.
3. Push to `main` (or run the **Deploy to GitHub Pages** workflow).
4. Open `https://<your-username>.github.io/BDAY-Greetings/`.
