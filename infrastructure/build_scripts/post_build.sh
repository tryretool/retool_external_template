#!/bin/bash
set -ex

export IMAGE_TAG=$(echo "$CODEBUILD_RESOLVED_SOURCE_VERSION" | head -c 7)
export LATEST_TAG="latest"
echo IMAGE_TAG="$IMAGE_TAG"
echo LATEST_TAG="$LATEST_TAG"
if [ "$BUILD" = "true" ]; then
	echo Pushing the Docker image...
	docker push "$REPOSITORY_URI:$LATEST_TAG"
	docker push "$REPOSITORY_URI:$IMAGE_TAG"
	echo Updating the task definition...
	printf '{"ImageURI":"%s"}' "$REPOSITORY_URI:$IMAGE_TAG" >imageDetail.json
fi
