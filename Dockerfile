FROM mhart/alpine-node:10

RUN addgroup -S app && adduser -S -g app app

ARG RELEASE_CHANNEL

ENV HOME=/home/app

COPY package.json $HOME/next/
RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/next
RUN npm install

USER root
COPY . $HOME/next
RUN chown -R app:app $HOME/*
USER app

# private port only
EXPOSE 5000

ENV PORT=5000
ENV NODE_ENV=production
ENV RELEASE_CHANNEL=$RELEASE_CHANNEL

RUN npm run build:web
CMD ["npm", "run", "start:web"]
