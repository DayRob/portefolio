# ---------- Dependencies ----------
    FROM node:18 AS deps
    WORKDIR /app
    
    COPY package*.json ./
    RUN npm install
    
    # ---------- Build ----------
    FROM node:18 AS builder
    WORKDIR /app
    
    COPY --from=deps /app/node_modules ./node_modules
    COPY . .
    
    ENV NEXT_TELEMETRY_DISABLED=1
    
    RUN npm run build
    
    # ---------- Runner ----------
    FROM node:18-slim AS runner
    WORKDIR /app
    
    ENV NODE_ENV=production
    ENV NEXT_TELEMETRY_DISABLED=1
    
    # On installe seulement les deps prod pour l’image finale
    COPY package*.json ./
    RUN npm install --omit=dev
    
    COPY --from=builder /app/public ./public
    COPY --from=builder /app/.next ./.next
    
    EXPOSE 3000
    CMD ["npm", "start"]
    