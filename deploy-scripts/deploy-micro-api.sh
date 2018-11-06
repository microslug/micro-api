#!/bin/bash
# USAGE:  source deploy-micro-api.sh
# Docker build and Kubernetes deploy script
# (c) Tom Lanhaus 2018

Green='\033[0;32m'
Yellow='\033[0;33m'
Red='\033[0;31m'
NC='\033[0m'

echo -e "${Green}micro-API deployment${NC}"
read -n1 -r -p "Did you set your ENV to the active K8S cluster and REDIS_PASSWORD ??" key
echo -e "${Green}Create docker container and push image to dockerhub${NC}"
cd micro-api
docker build -t microslugs/micro-api:3 .

# test with
#docker run --rm -ti --publish 80:80 microslugs/micro-api:3
docker push microslugs/micro-api:3
# creates 3 pods
# check for existance of redis if not install it -- also need to edit micro-api-deployment.yalm with new host name
cd ..
fn=$(helm list)
if [ -z "$fn" ]; then
  echo -e "${Red}Redis instance not found. Installing${NC}"
  kubectl delete secret redis-secret
  kubectl create secret generic redis-secret --from-literal=rpassword=$REDIS_PASSWORD
  helm install --name micro-redis --set password=$REDIS_PASSWORD stable/redis
else
  echo -e "${Yellow}Redis previously installed${NC}."
  echo -e "${fn}"
fi
#export REDIS_PASSWORD=$(kubectl get secret --namespace default micro-redis -o jsonpath="{.data.redis-password}" | base64 --decode)

kubectl delete deployment micro-api-deployment
kubectl create -f micro-api-deployment.yaml
# Todo check for existing service if not create one
kubectl expose deployment micro-api-deployment --type="LoadBalancer" --port 80
kubectl get services -o wide
echo -e "${Yellow}Change the .env MICRO_URL= to use micro-api external-ip then re-deploy${NC}"
echo -e "kubectl get services -o wide"
