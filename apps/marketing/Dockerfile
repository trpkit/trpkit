FROM node:18-alpine AS base

FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
RUN npm install -g turbo
COPY --link . .
RUN turbo prune --scope=@trpkit/marketing --docker

FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
COPY --link --from=builder /app/out/json/ .
COPY --link --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
# Corepack is required to use pnpm
RUN corepack enable
RUN pnpm install --frozen-lockfile
COPY --link --from=builder /app/out/full/ .
RUN pnpm dlx turbo run build --filter=@trpkit/marketing

FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --link --from=installer /app/apps/marketing/next.config.js .
COPY --link --from=installer /app/apps/marketing/package.json .
COPY --link --from=installer --chown=nextjs:nodejs /app/apps/marketing/.next/standalone ./
COPY --link --from=installer --chown=nextjs:nodejs /app/apps/marketing/.next/static ./apps/marketing/.next/static
COPY --link --from=installer --chown=nextjs:nodejs /app/apps/marketing/public ./apps/marketing/public
ENV PORT 3000
ENV HOSTNAME localhost
CMD node apps/marketing/server.js