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

# Installation de JSON Server
RUN apt-get update && apt-get install -y npm && npm install -g json-server

# Ajout des fichiers de configuration JSON
COPY db.json /usr/local/app/db.json

# Configuration des ports
EXPOSE 80 3100

# Commande de démarrage combinée
CMD sh -c "json-server --watch /usr/local/app/db.json --port 3100 & nginx -g 'daemon off;'"

