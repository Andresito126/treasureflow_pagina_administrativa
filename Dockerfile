FROM node:22-alpine AS build
WORKDIR /app
ARG VITE_GATEWAY_URL
ARG VITE_USE_MOCKS
ENV VITE_GATEWAY_URL=$VITE_GATEWAY_URL
ENV VITE_USE_MOCKS=$VITE_USE_MOCKS
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.27-alpine
ENV PORT=8080
COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
