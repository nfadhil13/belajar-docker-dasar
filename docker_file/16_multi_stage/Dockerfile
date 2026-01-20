FROM oven/bun:1-alpine AS builder
WORKDIR /app

# Copy package files first for better layer caching
COPY code/package.json code/bun.lock ./
RUN bun install --frozen-lockfile --production --verbose

# Copy source code and build
COPY code/ .
RUN bun build index.ts --compile --outfile server

# Final stage - minimal runtime image
FROM alpine:latest
RUN apk add --no-cache libstdc++

# Set environment variables
ENV APP_PORT=8080
EXPOSE ${APP_PORT}

WORKDIR /app

# Copy only the compiled binary from builder
COPY --from=builder /app/server ./

# Run the server directly (no shell needed for compiled binary)
CMD ["./server"]

