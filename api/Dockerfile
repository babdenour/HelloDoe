FROM node:10.16.3-alpine AS builder
WORKDIR /usr/src/app
COPY package* ./
RUN npm i
COPY . .
RUN npm run clean
RUN npm run build

FROM node:10.16.3-alpine AS app
WORKDIR /usr/src/app
COPY package* ./
RUN npm i --production
COPY --from=builder /usr/src/app/hooks ./hooks
COPY --from=builder /usr/src/app/dist ./dist
EXPOSE 80
CMD npm run start:dist