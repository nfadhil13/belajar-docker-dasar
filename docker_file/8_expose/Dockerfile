FROM oven/bun:1 AS base

RUN mkdir app
COPY code/ app

EXPOSE 8080

CMD ["sh", "-c", "cd app && bun run start"]