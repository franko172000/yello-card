# Base image
FROM node:18 as development

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

COPY . .
# Bundle app source
RUN npm run build

COPY . .

FROM node:18 as production

ENV NODE_ENV docker

WORKDIR /usr/src/app

COPY --from=development /usr/src/app/build/ ./build/

EXPOSE 8090

ENTRYPOINT ["npm", "start"]

USER node


