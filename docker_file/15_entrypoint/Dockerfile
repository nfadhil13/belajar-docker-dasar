FROM oven/bun:1-alpine
ENV APP_PORT=8080

WORKDIR /app
RUN apk --no-cache add curl

COPY code/ .
RUN ls
RUN bun install
RUN ls

EXPOSE ${APP_PORT}

ENTRYPOINT ["bun", "run"]
CMD ["start"]