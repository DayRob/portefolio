FROM node:18-bullseye AS builder

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer avec configuration réseau tolérante
RUN npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000 && \
    npm config set fetch-retries 5 && \
    npm install

# Copier le code source
COPY . .

# Créer le dossier public s'il n'existe pas
RUN mkdir -p public

# Build
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npm run build

# Stage de production
FROM node:18-bullseye-slim

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Copier les fichiers nécessaires depuis le builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Copier les fichiers de config Next.js
COPY --from=builder /app/next.config.* ./

EXPOSE 3000

# Healthcheck intégré
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"

CMD ["npm", "start"]