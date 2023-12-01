<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://flat-5-frontend.vercel.app/_next/static/media/logo.522a8156.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://flat-5-frontend.vercel.app/_next/static/media/logo.522a8156.svg
## Description

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Production URL 👉 https://flat-5-frontend.vercel.app/

## Prerequisites

You will need [Node.js](https://nodejs.org) at least version v16.0 or greater installed on your system.

## Setup
```
git clone https://github.com/cpflat5/flat-5-frontend.git
```

Install dependencies
```bash
yarn install
```
Setting environment variables. Please add your variables in .env.development file
```
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN={NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
NEXT_PUBLIC_API_BASE_URL={NEXT_PUBLIC_API_BASE_URL}
```

Run localhost
```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment
Fix linting errors
```bash
yarn lint
```
Build project
```bash
yarn build
```
Start project
```bash
yarn start
```