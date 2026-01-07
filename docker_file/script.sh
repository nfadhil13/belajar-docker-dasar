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