# Perruki 🐾

E-commerce store for dog collars and accessories, built with Next.js and deployed on Vercel.

## 🔗 Live Site

[proyecto-perruki.vercel.app](https://proyecto-perruki.vercel.app)

## 📋 About

Perruki is a fully functional e-commerce platform built for a dog accessories brand.
It features a product catalog, a persistent shopping cart, and real payment processing
via MercadoPago Checkout Pro.

## ✨ Features

- Product catalog with dynamic routing
- Shopping cart with persistent state (Zustand)
- MercadoPago Checkout Pro payment integration
- Mobile-first responsive design
- Optimized performance with Next.js App Router

## 🛠️ Built With

- [Next.js](https://nextjs.org/) (App Router)
- [Supabase](https://supabase.com/) — database & backend
- [Zustand](https://zustand-demo.pmnd.rs/) — state management
- [Tailwind CSS](https://tailwindcss.com/) — styling
- [MercadoPago](https://www.mercadopago.com.ar/) — payments
- Deployed on [Vercel](https://vercel.com/)

## 🚀 Getting Started
```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## ⚙️ Environment Variables

Create a `.env.local` file with the following:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
MERCADOPAGO_ACCESS_TOKEN=your_mercadopago_access_token
```

## 👨‍💻 Author

Developed by [Heryan Guzmán](https://github.com/heryandejesus)
