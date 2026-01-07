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