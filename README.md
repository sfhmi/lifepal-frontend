## Disclaimer
Dear Engineers I couldn't find the documentation for filter with pricing and rating, so the is handled from front-end side

## Features

- Product listing with filtering (category, price, rating, search, sorting)
- Product detail modal
- Add to cart and cart modal with quantity management
- Persistent cart using local
- Responsive design using Tailwind CSS
- Theme switching (light/dark)
- Built with Next.js App Router and React Server Components

## Tech Stack

- [Next.js](https://nextjs.org/) (JS Framework)
- [HeroUI](https://heroui.com/) (UI components)
- [Zustand](https://zustand-demo.pmnd.rs/) (state management)
- [Tailwind CSS](https://tailwindcss.com/) (sytles)
- [TypeScript](https://www.typescriptlang.org/) )
- [Docker](https://www.docker.com/) (containerization)
- [Github Actions](https://docs.github.com/en/actions/about-github-actions/understanding-github-actions) (CI/CD)


### Prerequisites

- Node.js (v18 or above)
- npm, yarn, pnpm or bun

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/lifepal-frontend-test.git
    cd lifepal-frontend-test
    ```

2. Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

3. Run the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `app/` - Next.js app directory (pages, layout, providers)
- `components/` - Reusable UI components (cards, modals, navbar, filters)
- `stores/` - Zustand stores for cart and products
- `types/` - TypeScript type definitions
- `config/` - Site and API configuration
- `public/` - Static assets (icons, images)
- `styles/` - Global styles (Tailwind CSS)

## Customization

- **Theme**: Switch between light and dark mode using the theme switcher in the UI.
- **Product Data**: The product API is configured in `config/api.ts` (not shown here). Adjust endpoints as needed.
- **UI**: Components use HeroUI and Tailwind for styling. You can customize the look and feel in the respective component files.

## Scripts

- `dev` - Start the development server
- `build` - Build the application for production
- `start` - Start the production server

## License

This project is for demonstration and testing purposes.