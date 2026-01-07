FROM alpine:3

LABEL author="Naufal Fadhil"
LABEL last_update="7 January 2026"

RUN mkdir hello
RUN echo "Hellow world" > "hello/world.txt"

# Executed on Container Start
CMD "cat", "hello/world.txt"
