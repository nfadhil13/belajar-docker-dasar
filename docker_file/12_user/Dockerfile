FROM oven/bun:1.0.5-alpine AS base
ENV APP_PORT=8080

RUN mkdir /app

RUN addgroup -S mygroup
RUN adduser -S -D -h /app user mygroup
RUN chown -R user:mygroup /app
USER user

COPY code/ app

EXPOSE ${APP_PORT}

CMD ["bun", "run", "start"]