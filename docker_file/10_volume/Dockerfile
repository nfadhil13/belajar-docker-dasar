FROM oven/bun:1 AS base
ENV APP_PORT=8080

RUN mkdir app
COPY code/ app

EXPOSE ${APP_PORT}
VOLUME ["app/names"]
CMD ["sh", "-c", "cd app && bun run start"]