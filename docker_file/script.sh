# From Example
docker build -t nfadhil13/from 1_from


# Run Example
docker build -t nfadhil13/run 2_run

docker build -t nfadhil13/run 2_run --progress=plain --no-cache

# CMD Example
docker build -t nfadhil13/cmd 3_cmd

docker container create --name cmdexample nfadhil13/cmd

docker container start cmdexample

docker container logs cmdexample

# Label Example
docker build -t nfadhil13/label 4_label

docker image inspect nfadhil13/label

## Add Example
docker build -t nfadhil13/add 5_add

docker container create --name addexample nfadhil13/add

docker container start addexample

docker container logs addexample

## Copy Example
docker build -t nfadhil13/copy 6_copy

docker container create --name copyexample nfadhil13/copy

docker container start copyexample

docker container logs copyexample

## Ignore Example
docker build -t nfadhil13/ignore 7_ignore

docker container create --name ignoreexample nfadhil13/ignore

docker container start ignoreexample

docker container logs ignoreexample

## Expose Example
docker build -t nfadhil13/expose 8_expose

docker image inspect nfadhil13/expose

docker container create --name exposeexample -p 3080:8080 nfadhil13/expose

docker container start exposeexample

docker container logs exposeexample

docker container port exposeexample

## Env Example
docker build -t nfadhil13/env 9_env

docker image inspect nfadhil13/env

docker container create --name envexample -p 3081:7070 --env APP_PORT=7070 nfadhil13/env

docker container start envexample

docker container logs envexample

docker container port envexample

## Volume Example
docker build -t nfadhil13/volume 10_volume

docker image inspect nfadhil13/volume

docker container create --name volumeexample -p 3082:8080 nfadhil13/volume

docker container start volumeexample

docker container logs volumeexample


## Working Directory Example
docker build -t nfadhil13/working_dir 11_working_dir

docker image inspect nfadhil13/working_dir

docker container create --name workingdirexample -p 3083:8080 nfadhil13/working_dir

docker container start workingdirexample

docker container logs workingdirexample

docker container exec -i -t workingdirexample /bin/bash

## User Example
docker build -t nfadhil13/user 12_user

docker image inspect nfadhil13/user

docker container create --name userexample -p 3084:8080 nfadhil13/user

docker container start userexample

docker container logs userexample

docker container exec -i -t userexample /bin/bash