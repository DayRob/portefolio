# Étape 1 : build du site statique et génération de la CSP (hachages des scripts en ligne).
FROM node:22-alpine AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Étape 2 : nginx sans privilèges, uniquement les fichiers statiques.
FROM nginxinc/nginx-unprivileged:stable-alpine
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/deploy/generated/csp-map.conf /etc/nginx/conf.d/00-csp-map.conf
COPY --from=build /app/deploy/generated/security-headers.conf /etc/nginx/snippets/security-headers.conf
COPY --from=build /app/out /usr/share/nginx/html
EXPOSE 8080
