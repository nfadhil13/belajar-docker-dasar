FROM oven/bun:1-alpine
ENV APP_PORT=8080

RUN mkdir /app

RUN addgroup -S mygroup
RUN adduser -S -D -h /app user mygroup
RUN chown -R user:mygroup /app
USER user

COPY code/ /app

EXPOSE ${APP_PORT}

RUN ls
RUN ls -l /app

CMD [ "sh", "-c", " ls -l /app && cd /app && bun run start"]