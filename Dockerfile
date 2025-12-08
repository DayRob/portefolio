FROM node:18-bullseye-slim

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Copier TOUT depuis votre build local réussi
COPY package*.json ./
COPY .next ./.next
COPY public ./public
COPY node_modules ./node_modules
COPY next.config.* ./

EXPOSE 3000

CMD ["npm", "start"]