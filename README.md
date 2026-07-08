[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/FR3B1BQd)

# RevoShop

## 1. Project Overview

RevoShop is a Next.js e-commerce demo application built as a milestone project. It lets visitors browse a product catalog, view product details, add items to a cart, and complete a simulated checkout. It also ships a lightweight authentication system with two roles:

- **Regular users** log in against the public [FakeStoreAPI](https://fakestoreapi.com/) and can shop, manage their cart, and check out.
- **Admins** (a hardcoded local account) get access to an Admin Dashboard for managing the product catalog stored in a local JSON file.

Route access is enforced server-side via Next.js middleware, which protects `/cart`, `/checkout`, and all `/admin/*` routes based on auth cookies.

## 2. Features Implemented

- **Product catalog** — Home page fetches products from FakeStoreAPI, with category filtering and a responsive grid layout.
- **Product detail page** — Dynamic route (`/product/[id]`) showing images, price, rating, description, and quantity selector.
- **Shopping cart** — Add/remove items, update quantities, and see running totals. Cart state persists in `localStorage` via `CartContext`.
- **Checkout flow** — Simple shipping-address form that places a (simulated) order and clears the cart.
- **Authentication** — Login page backed by an API route (`/api/auth/login`) that:
  - Authenticates a hardcoded admin account (`admin` / `admin123`) locally.
  - Proxies other credentials to FakeStoreAPI's `/auth/login` endpoint.
  - Sets `revoshop_token` / `revoshop_role` cookies used by the middleware for route protection.
- **Route protection middleware** — Redirects unauthenticated users away from `/cart` and `/checkout`, and non-admins away from `/admin/*`.
- **Admin dashboard** — CRUD interface for products (create, edit, delete) backed by REST API routes (`/api/products`, `/api/products/[id]`) that read/write `data/products.json` on disk.
- **Promotions page** — Static listing of current store promotions/discounts.
- **FAQ page** — Accordion-style frequently asked questions.
- **Responsive layout** — Shared `Navbar`, `Footer`, and `Layout` components with a mobile-friendly nav menu and live cart item count badge.

## 3. Technology Used

- **[Next.js 14](https://nextjs.org/)** (Pages Router) — React framework for routing, API routes, and middleware.
- **[React 18](https://react.dev/)** — UI library, using Context API (`AuthContext`, `CartContext`) for global state.
- **[Tailwind CSS 3](https://tailwindcss.com/)** — Utility-first styling, with a custom `brand` color palette (`tailwind.config.js`).
- **[FakeStoreAPI](https://fakestoreapi.com/)** — External REST API used for product data and user authentication.
- **Node.js `fs` module** — Simple file-based persistence for the admin-managed product catalog (`data/products.json`).
- **PostCSS & Autoprefixer** — CSS processing pipeline for Tailwind.

## 4. Preview Website
https://milestone-3-rizki0809-d.vercel.app/


## 4. Preview Website
https://milestone-3-rizki0809-d.vercel.app/