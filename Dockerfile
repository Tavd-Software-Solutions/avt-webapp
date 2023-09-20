FROM node:16.16.0
WORKDIR /app
COPY package.json /app/package.json
RUN yarn
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]