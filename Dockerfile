# Étape 1 : Build
FROM node:latest as build
WORKDIR /usr/local/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Étape 2 : Nginx avec le contenu complet
FROM nginx:latest
COPY --from=build /usr/local/app /usr/local/app
COPY --from=build /usr/local/app/dist/muteni-project/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
