FROM node:lts AS build
WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npx patch-package

RUN cp -f src/shared/services/api-config.service.production.ts src/shared/services/api-config.service.ts

RUN npm run build:prod

FROM node:lts AS prod-deps
WORKDIR /usr/src/app

ENV NPM_CONFIG_IGNORE_SCRIPTS=true

COPY package.json package-lock.json ./

RUN npm install --only=production

FROM node:lts
ARG PORT=3000
ENV NODE_ENV=production
ENV PORT=${PORT}
WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=prod-deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package.json ./

EXPOSE ${PORT}

CMD [ "npm", "run", "start:prod" ]


