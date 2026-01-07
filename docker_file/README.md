## What is Dockerfile

A **Dockerfile** is a text file that contains a set of instructions to assemble a Docker image. Each instruction in the Dockerfile creates a layer in the image. The Dockerfile defines everything needed to set up an environment, install dependencies, copy files, and configure your application to run in a container.

**How to build**

```bash
# May use cache
docker build -t nfadhil13/from 1_from

# No Cache
docker build -t nfadhil13/from 1_from --no-cache

# More detail build progress
docker build -t nfadhil13/from 1_from --progress=plain
```

## FROM

The `FROM` instruction sets the base image for subsequent instructions in the Dockerfile. Every Dockerfile must start with the `FROM` instruction (except in the case of a multi-stage build where subsequent `FROM` instructions may appear).

**Example:**

```Dockerfile
FROM alpine:3
```

This tells Docker to use the official Alpine Linux image, version 3, as the starting point for the build.

## RUN

The `RUN` instruction allows you to execute commands inside the image during the build process. The output of each `RUN` command is saved as a new image layer and will not run again when the container is started from the built image. Instead, `RUN` is used to set up the environment at build time, such as installing packages or making configuration changes.

**Example:**

```Dockerfile
RUN command
RUN ["executable", "argument"]

## Example
RUN mkdir hello
RUN echo "Hellow world" > "hello/world.txt"
RUN cat "hello/world.txt"

```

## CMD Instruction

This instruction specifies the command that will be executed when the container starts running. Only one CMD instruction is allowed in a Dockerfile, if multiple CMD instructions are specified, only the last one will be excuted.

```Dockerfile
# Run Example
FROM alpine:3

## Executed on Build
RUN mkdir hello
RUN echo "Hellow world" > "hello/world.txt"

# Executed on Container Start
CMD "cat", "hello/world.txt"

```

## Label Instruction

Metadata that can be added to the Image. This is purely just information to describe something about the image.

```DockerFile
LABEL author="Naufal Fadhil"
LABEL last_update="7 January 2026"
```

All the label data will be shown when you inspect the image and the container.

## Add Instruction

The `ADD` instruction allows you to copy files and directories from a source path to a specific folder in the Docker image. It also automatically extracts compressed files such as `.zip` and `.tar.gz`.

You can specify multiple files to add using Golang-style file pattern (https://pkg.go.dev/path/filepath#match)

```Dockerfile
ADD world.txt hello #Add world.txt file to hello
ADD *.txt hello #Add all txt file to hello folder
```
