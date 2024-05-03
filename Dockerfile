FROM node:20-alpine as base

WORKDIR /usr/src/nffreelancer

RUN addgroup -S nffreelancer && \ 
  adduser -S nffreelancer -G nffreelancer && \
  chown -R nffreelancer:nffreelancer /usr/src/nffreelancer


COPY . /usr/src/nffreelancer

RUN npm install && \
  npm run build && \
  npm prune --production

EXPOSE 3000

USER nffreelancer
ENTRYPOINT [ "docker-entrypoint.sh" ] 
