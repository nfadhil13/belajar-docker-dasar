FROM alpine:3

## Executed on Build
RUN mkdir hello

# Add world.txt file to hello folder
COPY file/*.txt hello

# Executed on Container Start
CMD ["cat", "hello/world.txt"]
