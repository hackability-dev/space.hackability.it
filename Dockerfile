# Install dependencies only when needed
FROM node:18-alpine3.16 AS base
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk add --no-cache openssl1.1-compat-dev

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --force
COPY prisma/schema.prisma ./prisma/schema.prisma
RUN npx prisma generate

# If using npm with a `package-lock.json` comment out above and use below instead
# COPY package.json package-lock.json ./ 
# RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

ARG DATABASE_URL
ARG NEXTAUTH_SECRET=xx
ARG NEXTAUTH_URL=http://localhost:3000
ARG GOOGLE_CLIENT_ID=xx
ARG GOOGLE_CLIENT_SECRET=xx
ARG GOOGLE_APPLICATION_CREDENTIALS=xx
ARG GS_BUCKET_NAME=xx
ARG GS_BASE_FOLDER=xx
ARG CLOUDINARY_BASE_FORLDER=xx
ARG CLOUDINARY_KEY=xx
ARG CLOUDINARY_SECRET=xx
ARG CLOUDINARY_NAME=xx

ARG KANNON_KEY=xxxx
ARG KANNON_DOMAIN=xxx
ARG KANNON_EMAIL=email@hackability.it
ARG KANNON_ALIAS=Sender
ARG KANNON_HOST=xxx.xxx.xx:443
ARG TELEGRAM_ADMIN_CHAT_ID=xxxx
ARG TELEGRAM_TOKEN=xxxx

RUN SKIP_ENV_VALIDATION=1 npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# You only need to copy next.config.js if you are NOT using the default configuration
# COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Automatically leverage output traces to reduce image size 
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
