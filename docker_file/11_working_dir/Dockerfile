FROM oven/bun:1 AS base
ENV APP_PORT=8080

WORKDIR /app
COPY code/ /app

EXPOSE ${APP_PORT}

## No need to cd to app as we have set the working directory to /app
CMD ["bun", "run", "start"]