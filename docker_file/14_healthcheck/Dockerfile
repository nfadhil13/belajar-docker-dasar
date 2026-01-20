FROM oven/bun:1-alpine
ENV APP_PORT=8080

WORKDIR /app
RUN apk --no-cache add curl

COPY code/ .
RUN ls
RUN bun install
RUN ls

EXPOSE ${APP_PORT}

HEALTHCHECK --interval=5s --start-period=5s --retries=3 CMD curl -f http://localhost:${APP_PORT}/health

CMD [ "sh", "-c", "bun run start"]