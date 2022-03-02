FROM node:lts-alpine AS build

RUN npm install -g pnpm

COPY pnpm-lock.yaml ./

RUN pnpm fetch --prod

ADD . .
RUN pnpm install --recursive --prefer-offline --dev

RUN pnpm run build

FROM node:lts-alpine AS production

RUN apk add --no-cache dumb-init

ENV NODE_ENV production
ENV HOST 0.0.0.0
ENV PORT 8080

USER node

WORKDIR /usr/src/app

COPY --chown=node:node --from=build /dist/index.js ./dist/index.js

EXPOSE $PORT

CMD ["dumb-init", "node", "dist/index.js"]
