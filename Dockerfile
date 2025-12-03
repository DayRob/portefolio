# ---------- Dependencies ----------
    FROM node:20 AS deps
    WORKDIR /app
    
    COPY package*.json ./
    RUN chmod -R 755 /app
    RUN npm install --omit=dev
    
    # ---------- Build ----------
    FROM node:20 AS builder
    WORKDIR /app
    
    COPY --from=deps /app/node_modules ./node_modules
    COPY . .
    
    ENV NEXT_TELEMETRY_DISABLED=1
    
    RUN npm run build
    
    # ---------- Runner ----------
    FROM node:20 AS runner
    WORKDIR /app
    
    ENV NODE_ENV=production
    ENV NEXT_TELEMETRY_DISABLED=1
    
    COPY --from=builder /app/public ./public
    COPY --from=builder /app/.next ./.next
    COPY --from=builder /app/package.json ./package.json
    COPY --from=builder /app/node_modules ./node_modules
    
    EXPOSE 3000
    
    CMD ["npm", "run", "start"]
    