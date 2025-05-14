# syntax=docker.io/docker/dockerfile:1

FROM node:20 AS base

WORKDIR /app

# === Install dependencies ===
FROM base AS deps

# Copy dependency manifests
COPY package.json package-lock.json* .npmrc* ./

# Install dependencies (prod + peer deps only)
RUN npm install

# === Build the application ===
FROM base AS builder

WORKDIR /app

# Copy installed node_modules and source code
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the app
RUN npm run build

# === Final production image ===
FROM node:20 AS runner

WORKDIR /app

# Environment variables (build-time)
ARG NEXT_PUBLIC_API

# Runtime environment variables
ENV NODE_ENV=production
ENV NEXT_PUBLIC_API=${NEXT_PUBLIC_API}

# Create non-root user
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# Copy necessary output files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
