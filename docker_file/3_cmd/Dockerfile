FROM alpine:3

## Executed on Build
RUN mkdir hello
RUN echo "Hellow world" > "hello/world.txt"

# Executed on Container Start
CMD "cat", "hello/world.txt"
