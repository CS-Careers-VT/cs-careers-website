# CS Careers @ VT Website

- [Production Site](https://prod-cs-careers-vt-website.web.app/)
- [Development Site](https://dev-cs-careers-vt-website.web.app/)

For the most up to date discussion and information, please check out the [Slack Channel](https://cscareersvt.slack.com/archives/C08A7AV5TJN).

## About

This web application is built using [Vite](https://vite.dev/), [React](https://18.react.dev/), and [Tailwind CSS](https://v3.tailwindcss.com/docs/installation). The project is also configured with Typescript for static typiong and enhanced code quality.

**Key Features**
- **Vite**: Used for its rapid development server and optimized build process, helping speed up the development process.
- **React**: A popular front-end library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for quickly building custom designs.

**Continuous Integration and Deployment (CI/CD)**

Deployment is automated using [Github Actions](https://github.com/CS-Careers-VT/cs-careers-website/actions). The CI/CD pipeline is configured to automatically build and deploy the application to either the [production website]([prod-cs-careers-vt-website.web.app](https://prod-cs-careers-vt-website.web.app/)) (changes to `production` branch) or the [development website](https://dev-cs-careers-vt-website.web.app/) (changes to the `development branch`). Both the dev site and [prod site](https://console.firebase.google.com/project/prod-cs-careers-vt-website/hosting/sites/prod-cs-careers-vt-website?fb_gclid=CjwKCAiAneK8BhAVEiwAoy2HYVlnHh3BSQIf5kMpfSPWlFNVprEteFgj-1v_BOpagnauZTd8zX0BwhoCqI8QAvD_BwE) are hosted on Firebase Hosting. For more information, see the [Continuous Integration and Deployment](#continuous-integration-and-deployment) section.

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

| Software | Version |
| ---- | ----------- |
| NodeJS | v20.15.1 (lts/iron) |
| NPM | v10.8.2 |

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

### Styling

This project uses [Tailwind CSS](https://v3.tailwindcss.com/docs/installation) for styling. If you're unfamiliar with Tailwind, it's very easy to pickup. I reccomend reading the [official documentation](https://tailwindcss.com/docs/styling-with-utility-classes) to get started. It'll answer most of your questions.

Here are other resources that may be helpful:

- [CSS to Tailwind Converter](https://tailwind-converter.netlify.app/)
- [TailwindCSS Gradient Generator](https://www.creative-tim.com/twcomponents/gradient-generator/)
- [Sample components](https://github.com/unlight/tailwind-components)
- [TailwindCSS Animated Plugin](https://www.tailwindcss-animated.com/)

All of the general stylign configuration is done in the `tailwind.config.js` file. If you need to add a new color, font, or anything else, you can do so there. You can define custom classes in the `src/index.css` file. It is always helpful to consult the [Figma design](https://www.figma.com/design/eNIFjbsJ5QoUBIaP9ePEsa/CS-Careers-Site-Mockup?node-id=214-2&t=2miC2PigupI2uj74-0&fuid=1428424133471390528) when experimenting with styles.

### Continuous Integration and Deployment

Automated deployment is handled by Github Actions. The 2 scripts located in the `.github/workflows` directory are responsible for building and deploying the application to Firebase Hosting (`development_fb_hosting.yml` and `production_fb_hosting.yml`). These scripts rely on the service account keys stored in the Github repository's secrets. [This package](https://github.com/w9jds/firebase-action) is used to authenticate with firebase.

Deployment Service Accounts:
- `dev-github-actions-fb-hosting`
- `prod-github-actions-fb-hosting`

Service accounts can be managed in the Google Cloud Console IAM & Admin section.

## Contributing

### Permissions

Anytime a new developer is added to the project, they should be given the appropriate permissions to the following resources:

- [Development Firebase Console](https://console.firebase.google.com/project/dev-cs-careers-vt-website/settings/iam?fb_gclid=CjwKCAiAneK8BhAVEiwAoy2HYVlnHh3BSQIf5kMpfSPWlFNVprEteFgj-1v_BOpagnauZTd8zX0BwhoCqI8QAvD_BwE): Access to the development site's backend.
- [Production Firebase Console](https://console.firebase.google.com/project/prod-cs-careers-vt-website/settings/iam?fb_gclid=CjwKCAiAneK8BhAVEiwAoy2HYVlnHh3BSQIf5kMpfSPWlFNVprEteFgj-1v_BOpagnauZTd8zX0BwhoCqI8QAvD_BwE): Access to the production site's backend. Careful with production site!

<!-- Test edit for test-branch -->
