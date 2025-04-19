Full-Stack Blog Platform

A full-stack blog platform built with Next.js, TypeScript, Tailwind CSS, Supabase, and PostgreSQL. Users can create, edit, delete, and comment on posts.
Features:

    User authentication via Supabase Auth

    Create, edit, and delete posts

    Comment on posts

    Server-side rendering (SSR) for better SEO and performance

Tech Stack:

    Next.js

    TypeScript

    Tailwind CSS

    Supabase (Auth, Database)

    PostgreSQL

    Vercel (Deployment)

Setup:

Clone the repo:

    git clone https://github.com/quwrof00/share-er
    cd your-repo-name

Install dependencies:

    npm install

Set up Supabase and add your API keys in a .env.local file:

    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
    SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

Run locally:

    npm run dev

Deployment:

Deployed on Vercel. Push to GitHub for automatic deployment.
