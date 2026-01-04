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

See the details resource usage of a container.

```bash
docker stats
```

### Container Resource Limit

Container Default Memory Usage

- macOS & Windows: Use only the amount of CPU and memory allocated to Docker (configurable by the user).
- Linux: Use all available CPU and memory resources on the host by default.

The problem is that each container can potentially consume too many resources, which may impact other containers. To avoid this, you can set resource limits for each container.

```bash
docker container create --name <container_name> --publish <host_port>:<container_port> --memory <amount_of_memory> --cpus <number_of_cpus> <image>

# Example
docker container create --name smallnginx --publish 3003:80 --memory 100m --cpus 0.5 nginx:latest
```

- "--cpus" defines the maximum number of CPUs the container can use; fractional values (e.g., 1.5) are allowed.
- "--memory" sets the maximum amount of memory available to the container. You can specify values in b (bytes), k (kilobytes), m (megabytes), or g (gigabytes).

## Docker Mounts

A Feature so that a container can accessing file/folder to host system operation.

**Mount Parameters**
| Parameter | Description |
|-------------|---------------------------------------------------------------------------------------------------|
| type | Mount type, either `bind` or `volume` |
| source | Location of the file or folder on the host system |
| destination | Location of the file or folder in the container |
| readonly | If present, the file or folder can only be read inside the container, not written to |

```bash
docker container create --name <container_name> --mount "type=bind,source=<host_source>,destination=<container_folder>;readonly<optional>" <image_name>

docker create --name mongoexample -p 27017:27017 --env MONGO_INITDB_ROOT_USERNAME=fadhil --env MONGO_INITDB_ROOT_PASSWORD=naufal --mount "type=bind,source=/Users/fadhil/belajar-docker/mongodata,destination=/data/db" mongo:latest
```

## Docker Volume

Bind mounts are no longer recommended; instead, using Volumes is best practice. Volumes are similar to bind mounts in that they allow you to store data, but instead of storing the data on the host, Docker manages the storage internally.

- Every time you create a container, Docker will create a volume for that container.

```bash
# Create a new volume with a specified name
docker volume create <volume_name>

# List all docker volume
docker volume ls

# Remove a Volume
docker volume rm <volume_name>
```

### Volume Container

We can assign a volume to a container. Every data stored in volum is not highly coupled to the container, so when we remove the container the data are safe.

```bash
docker container create --name <container_name> --mount "type=volume,source=<volume_name>,destination=<container_path>" -p <HOST_PORT>:<CONTAINER_PORT> <image>

# Example
docker volume create redis-volume

docker run --name redis-volume -d --mount "type=volume,source=redis-volume,destination=/data" -p 3003:6379 redis redis-server --save 1 1 --loglevel warning
```

### Backup Manual Example

```bash

# Stop the container (to avoid changes)
# Let says this redis-volume is mounted to redis-volume volume
docker stop redis-volume

# Create backup dummy container
docker container create --name nginxbackup --mount "type=bind,source=/Users/fadhil/Documents/Development/learning/devops/belajar-docker-dasar/bakcup,destination=/backup" --mount "type=volume,source=redis-volume,destination=/data" nginx

# Start the dummy container
docker container start nginxbackup

# Do Exec on the container
docker container exec -i -t nginxbackup /bin/bash

# Backup using tar
tar cvf /backup/backup.tar.gz /data

```

### Automatic Docker Container Run Backup

```bash
docker container run --rm --name ubuntu --mount "type=bind,source=/Users/fadhil/Documents/Development/learning/devops/belajar-docker-dasar/bakcup,destination=/backup" --mount "type=volume,source=redis-volume,destination=/data" ubuntu:latest tar cvf /backup/backup.tar.gz /data
```

### Docker container restore

```bash
## Create Restore Volume
docker volume create redis-restore

## Exec the restore
docker container run --rm --name ubuntu --mount "type=bind,source=/Users/fadhil/Documents/Development/learning/devops/belajar-docker-dasar/bakcup,destination=/backup" --mount "type=volume,source=redis-restore,destination=/data" ubuntu:latest bash -c "cd /data && tar xvf /backup/backup.tar.gz --strip 1"


## Test
docker run --name redis-restored --mount "type=volume,source=redis-restore,destination=/data" redis:latest
```

## Docker Network

- By default, Docker containers are isolated from each other. Containers cannot talk to each other directly.
- Docker has a feature called Network that lets containers communicate with each other.
- By using a Docker Network, you can connect containers so they are in the same network.
- If containers are on the same network, they can automatically talk to each other.

```bash
## List existing network
docker network ls

## Create Network
## Drivers -> Bridget, host, none
docker network create --driver <driver_name> <network_name>

## Remove Network
docker network rm <network_name>


```

### Container Network

- After creating a Network, you can add containers to the network.
- Containers inside the same network can communicate with each other (depends on the network driver type).
- A container can access another container by using its container name as the hostname.

```bash
docker network create mongo-network

docker container create --name mongo-server --network mongo-network --env MONGO_INITDB_ROOT_USERNAME=admin --env MONGO_INITDB_ROOT_PASSWORD=password mongo

docker container create --name mongo-client --network mongo-network --env ME_CONFIG_MONGODB_URL=mongodb://admin:password@mongo-server:27017/ -p 3005:8081 mongo-express

docker start mongo-server

docker start mongo-client

## Disconnect container to a network
docker network disconnect mongo-network mongo-server

## Connect a container to a netwrok
docker network connect mongo-network mongo-server
```

### Inspect

Inspect detail of a docker feature

```bash

# Examples:
docker container inspect <container_name_or_id>
docker image inspect <image_name_or_id>
docker network inspect <network_name_or_id>
docker volume inspect <volume_name_or_id>

```

### Prune

Prune in Docker refers to the action of removing unused data, such as stopped containers, unused networks, dangling images, and build cache. This is useful for freeing up disk space and keeping your Docker environment clean.

Docker provides different prune commands to remove specific types of unused resources, or you can use a general command to remove everything at once.

**Examples:**

```bash
# Remove all stopped containers, unused networks, dangling images, and build cache
docker system prune

# Add -a to also remove all unused images (not just dangling ones)
docker system prune -a

# Remove only unused containers
docker container prune

# Remove only unused images
docker image prune

# Remove only unused networks
docker network prune

# Remove only unused volumes
docker volume prune
```

**Note:**

- Pruning is a destructive operation; ensure you do not need the resources before running these commands as they cannot be recovered once deleted.
