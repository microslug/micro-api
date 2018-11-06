#!/bin/bash
# USAGE:  source deploy-micro-ux.sh
# Docker build and Kubernetes deploy script
# Tom Lanhaus 2018

Green='\033[0;32m'
Yellow='\033[0;33m'
Red='\033[0;31m'
NC='\033[0m'

echo -e "${Green}micro-UX deployment${NC}"
read -n1 -r -p "Did you set your ENV to the active K8S cluster? and changed API endpoint in .env ?" key
echo -e "${Green}Create docker container and push image to dockerhub${NC}"
cd micro-ux
docker build -t microslugs/micro-ux:3 .
# test with
#docker run --rm -ti --publish 80:80 microslugs/micro-ux:3
docker push microslugs/micro-ux:3
# creates 3 pods
cd ..
kubectl delete deployment micro-ux-deployment
kubectl create -f micro-ux-deployment.yaml
# Todo check for existing service if not create one
kubectl expose deployment micro-ux-deployment --type="LoadBalancer" --port 80
kubectl get services -o wide
echo -e "${Yellow}kubectl get services -o wide${NC}"

