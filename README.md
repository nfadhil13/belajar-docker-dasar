Source: YouTube, Programmer Zaman Now

## Docker Registry

![Docker Registry Diagram](registerty_diagram.png)

- A place to store Docker images
- We can store our Docker images in the registry
- One example is Docker Hub

## Docker Image

- It is like an application installer
- Every image contains its application and dependencies

**Common Commands**

```bash
# List all Docker images installed
docker image ls

# Pull an image
docker image pull redis:@version

# Remove an image
docker image rm redis@version
```

## Docker Container

- If a Docker image is an installer, then a Docker container is the installed application
- We can create multiple containers based on a single image, as long as each container has a different name
- We can't delete any Docker image when it is used by a container, because the container is not copying the image content but using it directly
- We have to run the container after initializing it (It is not working automatically)

**Common Commands**

```bash
# Listing All Container
docker container ls -a

# Listing only working container
docker container ls

# Creat Container
docker container create --name <container_name> <image_name>:tag
docker container create --name redisexample redis:latest

# Start Container
docker container start <container_name>
docker container start redisexample

# Stop Container
docker container stop <container_id>
docker container stop <container_name>

# Remove Container
docker container rm <container_id>
docker container rm <container_name>

# lOG
docker container logs <container_name>
docker container logs <container_id>

# Realtime Log
docker container logs -f <container_name>
docker container logs -f <container_id>

# Container Exec
## To Execute
docker container
```

**Notes**

- When creating a container, Docker will automatically pull the missing Docker image if it is not already present.

### Container Exec

Execute something inside the container

```bash
docker container exec -i -t <container_id_or_name> /bin/bash
```

- `-i` is an interactive argument that keeps the input active.
- `-t` allows access to the terminal.
- `/bin/bash` is an example of a program you can run inside the container.

### Container Port

- A port in a Docker container refers to the container's own port, not the host device's port. Therefore, multiple Docker containers can use the same port number without conflict. This means a Docker container's port is isolated.
- Before removing a container, you always need to "stop" the container first.

**Port Fowarding**

- Forwarding port at a system host to a Docker Container

```bash
docker container create --name <container_name> -p posthost:portcontainer image:tag
```

### Container Environment Variable

- Docker container has a parameter to able to send and environment variable to its container

**Command**

```bash
docker container create --name <container_name> --env <KEY>=<VALUE> --env <KEY2>=<VALUE2>

# Example
docker create --name mongoexample -p 27017:27017 --env MONGO_INITDB_ROOT_USERNAME=fadhil --env MONGO_INITDB_ROOT_PASSWORD=naufal mongo:latest
```

### Container Stats
