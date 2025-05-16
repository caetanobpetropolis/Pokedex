# build step
FROM node:18 as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# nginx serve step
FROM nginx:alpine
COPY --from=builder /app/dist/pokedex-app/browser /usr/share/nginx/html

# Optional: fallback support for SPA
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d