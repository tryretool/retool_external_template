#!/bin/bash
echo Entered the pre_build phase...
echo Logging in to Amazon ECR...
aws --version
printenv
docker login --username bymilesrobot --password "$DOCKER_TOKEN"
export IMAGE_TAG=$(echo "$CODEBUILD_RESOLVED_SOURCE_VERSION" | head -c 7)
export LATEST_TAG="latest"
echo IMAGE_TAG="$IMAGE_TAG"
echo LATEST_TAG="$LATEST_TAG"
aws ecr get-login-password --region "$AWS_DEFAULT_REGION" | docker login --username AWS --password-stdin 608560900974.dkr.ecr.eu-west-2.amazonaws.com
export REPOSITORY_URI=608560900974.dkr.ecr.eu-west-2.amazonaws.com/bymiles-claims-portal
echo Build started on "$(date)"
