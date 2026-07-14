# CS Careers @ VT Website

- [Production Site](https://prod-cs-careers-vt-website.web.app/)
- [Development Site](https://dev-cs-careers-vt-website.web.app/)

For the most up to date discussion and information, please check out the [Slack Channel](https://cscareersvt.slack.com/archives/C08A7AV5TJN).


## About

This web application is built using [Vite](https://vite.dev/), [React](https://18.react.dev/), and [Tailwind CSS v3](https://v3.tailwindcss.com/docs/installation). The project is also configured with TypeScript for static typing and enhanced code quality. A small Firebase Functions backend (in `functions/`) handles the newsletter signup's server-side call to the Beehiiv API.

**Key Features**
- **Vite**: Used for its rapid development server and optimized build process, helping speed up the development process.
- **React 18** + **React Router v7**: Front-end library and client-side routing (see `src/routes` / `src/App.tsx`).
- **Tailwind CSS v3**: A utility-first CSS framework for quickly building custom designs (configured via `tailwind.config.js` + `postcss.config.js`).
- **TypeScript**: Static typing across the app and the Firebase Functions codebase.
- **Firebase Functions**: A single HTTPS function (`functions/src/index.ts`) that proxies newsletter signups to Beehiiv. Requires **Node 22** to build/deploy (separate from the main app's Node version — see [Software Requirements](#software-requirements)).

### Tech Stack / Key Libraries

| Library | Version | Purpose |
| --- | --- | --- |
| [react](https://18.react.dev/) / react-dom | ^18.3.1 | UI library |
| [react-router-dom](https://reactrouter.com/) | ^7.1.5 | Client-side routing |
| [vite](https://vite.dev/) | ^6.4.0 | Dev server & build tool |
| [typescript](https://www.typescriptlang.org/) | ~5.6.2 | Static typing |
| [tailwindcss](https://v3.tailwindcss.com/docs/installation) | ^3.4.17 | Utility-first CSS (via PostCSS + Autoprefixer) |
| [tailwindcss-animated](https://www.tailwindcss-animated.com/) | ^2.0.0 | Tailwind animation utilities |
| [react-icons](https://react-icons.github.io/react-icons/) | ^5.5.0 | Icon set (used in the photo gallery lightbox, etc.) |
| [@emailjs/browser](https://www.emailjs.com/docs/sdk/installation/) | ^4.4.1 | Client-side email send for the newsletter form |
| [firebase-functions](https://firebase.google.com/docs/functions) / firebase-admin | ^6.0.1 / ^12.6.0 | Firebase Functions backend (in `functions/`) |

> **Note:** `package.json` also lists `express`, `cors`, `dotenv`, and `nodemon` as dependencies, and a `backend` / `backend:dev` npm script that runs `node server.js`. There is no `server.js` in this repo — those are leftovers from an earlier Express-based backend approach that was replaced by the Firebase Function described above. Don't rely on `npm run backend`; it will fail. Similarly, `@tailwindcss/vite` (the Tailwind v4 Vite plugin) is listed as a dependency but isn't wired into `vite.config.ts` — the project actually builds with Tailwind v3 via PostCSS. Both are safe to ignore (or clean up) rather than something you need to configure.

**Continuous Integration and Deployment (CI/CD)**

Deployment is automated using [Github Actions](https://github.com/CS-Careers-VT/cs-careers-website/actions). The CI/CD pipeline is configured to automatically build and deploy the application to either the [production website](https://prod-cs-careers-vt-website.web.app/) (changes to the `production` branch) or the [development website](https://dev-cs-careers-vt-website.web.app/) (changes to the `development` branch). Both the dev site and [prod site](https://console.firebase.google.com/project/prod-cs-careers-vt-website/hosting/sites/prod-cs-careers-vt-website?fb_gclid=CjwKCAiAneK8BhAVEiwAoy2HYVlnHh3BSQIf5kMpfSPWlFNVprEteFgj-1v_BOpagnauZTd8zX0BwhoCqI8QAvD_BwE) are hosted on Firebase Hosting. For more information, see the [Continuous Integration and Deployment](#continuous-integration-and-deployment) section.

> **Redesign in progress:** the `redesign-2025` branch has the new site UI integrated into this same React app (real data/routing/newsletter wiring intact) and is the active base for ongoing UI work — see that branch instead of `development` if you're picking up redesign-related tasks.

## Resources

Listed below are the many resources that power the CS Careers landing site. Contact the resource owner to request access.

| Resource | Description | Owner |
| --- | --- | --- |
| [Development Firebase](https://console.firebase.google.com/project/dev-cs-careers-vt-website/overview?fb_gclid=CjwKCAiAkc28BhB0EiwAM001TT5YOGLgGPuM5hFJRd8ziEEajO2K2tf6MxXbjWenvYINP-6-jCkDpxoCiUkQAvD_BwE) | Web console for managing the development site's backend  | cscareersvt gmail account |
| [Production Firebase](https://console.firebase.google.com/project/prod-cs-careers-vt-website/overview?fb_gclid=CjwKCAiAkc28BhB0EiwAM001TT5YOGLgGPuM5hFJRd8ziEEajO2K2tf6MxXbjWenvYINP-6-jCkDpxoCiUkQAvD_BwE) | Web console for managing the production site's backend  | cscareersvt gmail account |
| [Figma](https://www.figma.com/design/eNIFjbsJ5QoUBIaP9ePEsa/CS-Careers-Site-Mockup?node-id=214-2&t=2miC2PigupI2uj74-0&fuid=1428424133471390528) | Wireframing and prototyping the website. | Aaron Boateng (bxateng@vt.edu)|
| [Github Repo](https://github.com/CS-Careers-VT/cs-careers-website) | Repository for the website's source code and CI/CD pipeline | Blake Marterella (blake@martella.com) |

## Developers

### Software Requirements

| Software | Version | Where it applies |
| ---- | ----------- | --- |
| NodeJS | v20.x (CI uses Node 20) | Main app (root `package.json`) |
| NodeJS | v22.x (`functions/package.json` pins `"engines": {"node": "22"}`) | Firebase Functions only (`functions/`) — needed if you're building/deploying/emulating functions locally |
| NPM | v10+ | Both |

The main app and the Firebase Functions codebase are two separate Node projects with two separate `package.json` files (root and `functions/`) and different Node version requirements — don't `npm install` at the repo root expecting it to cover `functions/`, and vice versa.

You can check your current version with the following commands. If the wrong version is installed, I highly recommend using [Node Version Manager (NVM)](https://github.com/nvm-sh/nvm?tab=readme-ov-file) to manage the different versions.

```bash
node --version
npm --version
```

### Running the Development Server

```bash
npm install # Only needed on first run or when package.json is changed
npm run dev
```

### Firebase Functions (Backend)

The `functions/` directory is a separate Node project (own `package.json`, own `node_modules`, requires Node 22) that deploys a single HTTPS function used by the newsletter signup form to subscribe an email via the Beehiiv API. It is **not** built or deployed by the main GitHub Actions workflows — those only build/deploy the `dist/` hosting output. Functions are deployed separately:

```bash
cd functions
npm install
npm run deploy   # firebase deploy --only functions
```

Locally, `npm run serve` (from `functions/`) builds and runs the function in the Firebase emulator. The function reads its Beehiiv API key/publication ID from Firebase Functions config, not from `.env` — see `functions/src/index.ts`.

### Styling

This project uses [Tailwind CSS](https://v3.tailwindcss.com/docs/installation) for styling. If you're unfamiliar with Tailwind, it's very easy to pickup. I reccomend reading the [official documentation](https://tailwindcss.com/docs/styling-with-utility-classes) to get started. It'll answer most of your questions.

Here are other resources that may be helpful:

- [CSS to Tailwind Converter](https://tailwind-converter.netlify.app/)
- [TailwindCSS Gradient Generator](https://www.creative-tim.com/twcomponents/gradient-generator/)
- [Sample components](https://github.com/unlight/tailwind-components)
- [TailwindCSS Animated Plugin](https://www.tailwindcss-animated.com/)

All of the general stylign configuration is done in the `tailwind.config.js` file. If you need to add a new color, font, or anything else, you can do so there. You can define custom classes in the `src/index.css` file. It is always helpful to consult the [Figma design](https://www.figma.com/design/eNIFjbsJ5QoUBIaP9ePEsa/CS-Careers-Site-Mockup?node-id=214-2&t=2miC2PigupI2uj74-0&fuid=1428424133471390528) when experimenting with styles.

### Continuous Integration and Deployment

Automated deployment is handled by Github Actions. There are 4 workflows in `.github/workflows`:

| Workflow | Trigger | What it does |
| --- | --- | --- |
| `dev_validate_build.yml` | PR opened against `development` | Installs deps and runs `npm run build` to verify the PR builds — no deploy |
| `dev_build_and_deploy.yml` | Push to `development` | Builds the app and deploys `dist/` to the **dev** Firebase Hosting site |
| `prod_validate_build.yml` | PR opened against `production` | Same build verification as above, for `production` |
| `prod_build_and_deploy.yml` | Push to `production` | Builds the app and deploys `dist/` to the **prod** Firebase Hosting site |

All 4 workflows build with Node 20 (main app only — see [Software Requirements](#software-requirements)). Only Firebase **Hosting** is deployed by these workflows; Firebase **Functions** are deployed separately and manually (see [Firebase Functions](#firebase-functions-backend)). Deploys authenticate with [w9jds/firebase-action](https://github.com/w9jds/firebase-action) using service account keys stored as repo secrets (`FIREBASE_DEV_SA_KEY`, `FIREBASE_PROD_SA_KEY`).

Deployment Service Accounts:
- `dev-github-actions-fb-hosting`
- `prod-github-actions-fb-hosting`

Service accounts can be managed in the Google Cloud Console IAM & Admin section.

## Contributing

### Permissions

Anytime a new developer is added to the project, they should be given the appropriate permissions to the following resources:

- [Development Firebase Console](https://console.firebase.google.com/project/dev-cs-careers-vt-website/settings/iam?fb_gclid=CjwKCAiAneK8BhAVEiwAoy2HYVlnHh3BSQIf5kMpfSPWlFNVprEteFgj-1v_BOpagnauZTd8zX0BwhoCqI8QAvD_BwE): Access to the development site's backend.
- [Production Firebase Console](https://console.firebase.google.com/project/prod-cs-careers-vt-website/settings/iam?fb_gclid=CjwKCAiAneK8BhAVEiwAoy2HYVlnHh3BSQIf5kMpfSPWlFNVprEteFgj-1v_BOpagnauZTd8zX0BwhoCqI8QAvD_BwE): Access to the production site's backend. Careful with production site!
