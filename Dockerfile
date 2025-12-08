FROM node:18-alpine

# Créer un utilisateur non-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm ci --only=production --ignore-scripts

# Copier le reste des fichiers
COPY --chown=nextjs:nodejs . .

# Build l'application
RUN npm run build

# Changer vers l'utilisateur non-root
USER nextjs

EXPOSE 3000

CMD ["npm", "start"]