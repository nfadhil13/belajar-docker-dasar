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

## Copy Instruction

The `COPY` instruction is used to add files from your source folder into a destination inside the Docker image.

What's the difference between `COPY` and `ADD`?

- `COPY` only copies files, while `ADD` can also download from a URL and automatically extract compressed files like `.tar.gz`.
- Best practice: use `COPY` whenever possible for simple copying. If you need to extract compressed files, use `RUN` to extract them after copying with `COPY`.

**Example:**

```Dockerfile
COPY world.txt hello/              # Copy world.txt to hello folder
COPY *.txt hello/                 # Copy all txt files to hello folder
COPY src/ dest/                   # Copy everything from src/ to dest/ in the image
```

## .dockerIgnore

To Ignore a file when copy/add file. You just need to create `.dockerignore` file in the same directory with the `Dockerfile`

## Expose

The `EXPOSE` instruction in a Dockerfile is used to indicate which ports a container will listen on at runtime. It serves as documentation between the person who builds the image and the person who runs the container, letting users know which network ports should be published.

However, `EXPOSE` does not actually publish the port. To make the container's port accessible to the host (or external networks), you need to publish it using the `-p` or `--publish` flag when running the container.

## Docker ENV Instruction

The `ENV` instruction in Docker is used to set environment variables, either during the build process or at runtime inside the Docker container. Once defined in the Dockerfile, these environment variables can be referenced using the `${VAR_NAME}` syntax. Variables set using `ENV` are stored in the Docker image and can be viewed with `docker image inspect`.

It's also possible to override or set environment variables when creating a Docker container by using the `--env` or `-e` flag with `docker container create` (e.g., `--env KEY=VALUE`).

Key points:

- Use `ENV` to define environment variables in the Dockerfile.
- These variables are available during build and inside the running container.
- They are visible when inspecting the image.
- You can override them at container creation time.

## Docker Volume

The `VOLUME` instruction in a Dockerfile is used to create a mount point with a specified path and marks it as holding externally mounted volumes from native host or other containers. This helps in persisting data generated by and used by the Docker container, so the data is not lost when the container is removed.

```DockerFile
VOLUME ["path/1", "another_path"]
```

## Working Directory

It's like a home directory of the application or container, meaning it will be the starting directory. If it does not exist, it will create the directory/folder automatically.

A working directory can be a relative path or an absolute path.

```DockerFile
# absolute path in root
WORKDIR /app
# as previously we started from /app, now we are on /app/home
WORKDIR home
# Now we will go to /another/app as this is an absolute path
WORKDIR /another/app
```

## User Instruction

This is like the 'user' we have in a Linux system. By default, a container will be working as root, but we can set the user or group using this instruction. Make sure that when changing user/group, you create the user and/or group first.

```Dockerfile
# Example for alpine
RUN addgroup -S mygroup
RUN adduser -S -D -h /app user mygroup
RUN chown -R user:mygroup /app
USER user
```

## Args

This is similar to ENV, but only applies during build time. Args cannot be accessed at container runtime.

## Health Check Instruction

Is an instruction can be used to tell the docker how to determine whether the container is still healty or not.
**Health Status**

- Starting -> When the container just started
- Healty -> Healthy
- Unhealty -> Unhealty

```Dockerfile
## Disabled health check
HEALTHCHECK NONE

##
HEALTHCHECK [OPTIONS] CMD

## Execute Healthcheck every <Duration> ex : 30s
HEALTHCHECK --interval==<Duration> ## Default 30s
HEALTHCHECK --timeout==<Duration> ## Default 30$
HEALTHCHECK --start-period=<Duration> ## Default 0s
HEALTHCHECK --retries=N ##Default 3
```

## Entrypoint Instruction

The `ENTRYPOINT` instruction in Docker is used to configure a container that will run as an executable. Unlike `CMD`, which can be easily overridden when running a container, `ENTRYPOINT` makes the container behave like an executable, and any arguments passed to `docker run` will be appended to the ENTRYPOINT command.

**Key Differences between ENTRYPOINT and CMD:**

- **CMD**: The command specified in `CMD` can be completely overridden when running the container. If you provide arguments to `docker run`, they will replace the entire `CMD`.
- **ENTRYPOINT**: The command specified in `ENTRYPOINT` cannot be overridden. Arguments passed to `docker run` will be appended to the `ENTRYPOINT` command as additional parameters.

**When to use ENTRYPOINT:**

- When you want to create a container that behaves like an executable command
- When you want to ensure a specific command always runs, but allow users to pass additional arguments
- When building utility containers that should always run a specific program

**Syntax:**

```Dockerfile
# Exec form (recommended)
ENTRYPOINT ["executable", "param1", "param2"]

# Shell form
ENTRYPOINT command param1 param2
```

**Example:**

```Dockerfile
FROM alpine:3

# ENTRYPOINT ensures 'echo' always runs
ENTRYPOINT ["echo", "Hello"]

# If you run: docker run myimage World
# Output: Hello World
# The "World" argument is appended to the ENTRYPOINT command
```

**Combining ENTRYPOINT with CMD:**

You can use both `ENTRYPOINT` and `CMD` together. In this case, `CMD` provides default arguments to `ENTRYPOINT`. If arguments are provided to `docker run`, they will replace the `CMD` arguments but still be passed to `ENTRYPOINT`.

```Dockerfile
FROM alpine:3

ENTRYPOINT ["echo"]
CMD ["Hello", "World"]

# If you run: docker run myimage
# Output: Hello World

# If you run: docker run myimage Goodbye
# Output: Goodbye
# The CMD arguments are replaced by "Goodbye"
```

**Important Notes:**

- Only the last `ENTRYPOINT` instruction in a Dockerfile will take effect
- `ENTRYPOINT` cannot be overridden at runtime (unlike `CMD`)

## Multi Stage Build
