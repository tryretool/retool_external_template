#!/bin/bash
set -ex

if [ "$BUILD" = "true" ]; then
	echo Pushing the Docker image...
	docker push "$REPOSITORY_URI:$LATEST_TAG"
	docker push "$REPOSITORY_URI:$IMAGE_TAG"
	echo Updating the task definition...
	printf '{"ImageURI":"%s"}' "$REPOSITORY_URI:$IMAGE_TAG" >imageDetail.json
fi
