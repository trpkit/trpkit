FROM node:18-alpine AS base
# Disable husky from running
ENV HUSKY 0

FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
RUN npm install -g turbo
COPY --link . .
RUN turbo prune --scope=@trpkit/web-client --docker

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
RUN pnpm dlx turbo run build --filter=@trpkit/web-client

FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --link --from=installer /app/apps/web-client/next.config.js .
COPY --link --from=installer /app/apps/web-client/package.json .
COPY --link --from=installer --chown=nextjs:nodejs /app/apps/web-client/.next/standalone ./
COPY --link --from=installer --chown=nextjs:nodejs /app/apps/web-client/.next/static ./apps/api/.next/static
ENV PORT 3000
ENV WEBSITES_PORT 3000
ENV HOSTNAME localhost
CMD node apps/web-client/server.js