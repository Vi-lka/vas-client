FROM node:22.11.0-alpine AS base

RUN apk add --no-cache libc6-compat python3 g++ make
RUN apk update

# Step 1. Rebuild the source code only when needed
FROM base AS builder

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
# Omit --production flag for TypeScript devDependencies
RUN yarn global add pnpm

COPY . ./
COPY public ./public
COPY next.config.js .
COPY sentry.client.config.ts .
COPY sentry.server.config.ts .
COPY sentry.edge.config.ts .
COPY tsconfig.json .
COPY tailwind.config.ts postcss.config.js ./

# Environment variables must be present at build time
# https://github.com/vercel/next.js/discussions/14030
ARG NEXT_PUBLIC_URL
ENV NEXT_PUBLIC_URL=${NEXT_PUBLIC_URL}
ARG NEXT_PUBLIC_STRAPI_API_URL
ENV NEXT_PUBLIC_STRAPI_API_URL=${NEXT_PUBLIC_STRAPI_API_URL}
ARG NEXT_PUBLIC_STRAPI_DOMAIN
ENV NEXT_PUBLIC_STRAPI_DOMAIN=${NEXT_PUBLIC_STRAPI_DOMAIN}
ARG REVALIDATE_TOKEN
ENV REVALIDATE_TOKEN=${REVALIDATE_TOKEN}

ARG SMTP_HOST
ENV SMTP_HOST=${SMTP_HOST}
ARG SMTP_PORT
ENV SMTP_PORT=${SMTP_PORT}
ARG SMTP_USER
ENV SMTP_USER=${SMTP_USER}
ARG SMTP_PASSWORD
ENV SMTP_PASSWORD=${SMTP_PASSWORD}
ARG SMTP_FROM_EMAIL
ENV SMTP_FROM_EMAIL=${SMTP_FROM_EMAIL}

ARG NEXTAUTH_URL
ENV NEXTAUTH_URL=${NEXTAUTH_URL}
ARG NEXTAUTH_SECRET
ENV NEXTAUTH_SECRET=${NEXTAUTH_SECRET}

ARG NEXT_PUBLIC_SENTRY_DSN
ENV NEXT_PUBLIC_SENTRY_DSN=${NEXT_PUBLIC_SENTRY_DSN}
ARG SENTRY_AUTH_TOKEN
ENV SENTRY_AUTH_TOKEN=${SENTRY_AUTH_TOKEN}
ARG SENTRY_PROJECT
ENV SENTRY_PROJECT=${SENTRY_PROJECT}
ARG SENTRY_ORG
ENV SENTRY_ORG=${SENTRY_ORG}

ARG REG_KEY
ENV REG_KEY=${REG_KEY}

# Next.js collects completely anonymous telemetry data about general usage. Learn more here: https://nextjs.org/telemetry
# Uncomment the following line to disable telemetry at build time
# ENV NEXT_TELEMETRY_DISABLED 1

RUN pnpm install

RUN pnpm i --config.arch=x64 --config.platform=linux --config.libc=musl sharp@0.33.3

# Build Next.js based on the preferred package manager
RUN pnpm build

# Note: It is not necessary to add an intermediate step that does a full copy of `node_modules` here

# Step 2. Production image, copy all the files and run next
FROM base AS runner

WORKDIR /app

ENV NODE_ENV production

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/next.config.js .
COPY --from=builder /app/sentry.client.config.ts .
COPY --from=builder /app/sentry.server.config.ts .
COPY --from=builder /app/sentry.edge.config.ts .
COPY --from=builder /app/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/.next/cache ./.next/cache
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Environment variables must be redefined at run time
ARG NEXT_PUBLIC_URL
ENV NEXT_PUBLIC_URL=${NEXT_PUBLIC_URL}
ARG NEXT_PUBLIC_STRAPI_API_URL
ENV NEXT_PUBLIC_STRAPI_API_URL=${NEXT_PUBLIC_STRAPI_API_URL}
ARG NEXT_PUBLIC_STRAPI_DOMAIN
ENV NEXT_PUBLIC_STRAPI_DOMAIN=${NEXT_PUBLIC_STRAPI_DOMAIN}
ARG REVALIDATE_TOKEN
ENV REVALIDATE_TOKEN=${REVALIDATE_TOKEN}

ARG SMTP_HOST
ENV SMTP_HOST=${SMTP_HOST}
ARG SMTP_PORT
ENV SMTP_PORT=${SMTP_PORT}
ARG SMTP_USER
ENV SMTP_USER=${SMTP_USER}
ARG SMTP_PASSWORD
ENV SMTP_PASSWORD=${SMTP_PASSWORD}
ARG SMTP_FROM_EMAIL
ENV SMTP_FROM_EMAIL=${SMTP_FROM_EMAIL}

ARG NEXTAUTH_URL
ENV NEXTAUTH_URL=${NEXTAUTH_URL}
ARG NEXTAUTH_SECRET
ENV NEXTAUTH_SECRET=${NEXTAUTH_SECRET}

ARG NEXT_PUBLIC_SENTRY_DSN
ENV NEXT_PUBLIC_SENTRY_DSN=${NEXT_PUBLIC_SENTRY_DSN}
ARG SENTRY_AUTH_TOKEN
ENV SENTRY_AUTH_TOKEN=${SENTRY_AUTH_TOKEN}
ARG SENTRY_PROJECT
ENV SENTRY_PROJECT=${SENTRY_PROJECT}
ARG SENTRY_ORG
ENV SENTRY_ORG=${SENTRY_ORG}

ARG REG_KEY
ENV REG_KEY=${REG_KEY}

RUN chown -R nextjs ./.next/cache
USER nextjs

EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]