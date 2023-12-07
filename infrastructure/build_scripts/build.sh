#!/bin/bash
set -ex

if [[ $BUILD = "true" ]]; then
	echo Building Docker container
	docker build \
		--no-cache \
		-t "$REPOSITORY_URI:$IMAGE_TAG" \
		-t "$REPOSITORY_URI:$LATEST_TAG" \
		.
	echo Build completed on "$(date)"
else
	echo Skipping build — \$BUILD is disabled.
fi
