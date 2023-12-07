#!/bin/bash
set -ex
export IMAGE_TAG=$(echo "$CODEBUILD_RESOLVED_SOURCE_VERSION" | head -c 7)
export LATEST_TAG="latest"
echo IMAGE_TAG="$IMAGE_TAG"
echo LATEST_TAG="$LATEST_TAG"

yarn

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
