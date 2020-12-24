#!/bin/sh

# TODO(a.garipov): Redo the multiarch image.

verbose="${VERBOSE:-0}"

if [ "$verbose" -gt '0' ]
then
	set -x
fi

set -e -f -u

# Require these to be set.  The channel value is validated later.
readonly channel="$CHANNEL"
readonly commit="$COMMIT"
readonly version="$VERSION"

# For buildx.
export DOCKER_CLI_EXPERIMENTAL='enabled'

readonly docker_platforms="\
linux/386,\
linux/amd64,\
linux/arm/v6,\
linux/arm/v7,\
linux/arm64,\
linux/ppc64le"

readonly build_date="$(date -u +'%Y-%m-%dT%H:%M:%SZ')"

# Set DOCKER_IMAGE_NAME to 'adguard/adguard-home' if you want (and are
# allowed) to push to DockerHub.
readonly docker_image_name="${DOCKER_IMAGE_NAME:-adguardhome-dev}"

# Set DOCKER_OUTPUT to 'type=image,name=adguard/adguard-home,push=true'
# if you want (and are allowed) to push to DockerHub.
readonly docker_output="${DOCKER_OUTPUT:-type=image,name=${docker_image_name},push=false}"

case "$channel"
in
('release')
	readonly docker_image_full_name="${docker_image_name}:${version}"
	readonly docker_tags="--tag ${docker_image_name}:latest"
	;;
('beta')
	readonly docker_image_full_name="${docker_image_name}:${version}"
	readonly docker_tags="--tag ${docker_image_name}:beta"
	;;
('edge')
	# Don't set the version tag when pushing to the edge channel.
	readonly docker_image_full_name="${docker_image_name}:edge"
	readonly docker_tags=''
	;;
('development')
	readonly docker_image_full_name="#{docker_image_name}"
	readonly docker_tags=''
	;;
(*)
	echo "invalid channel '$channel', supported values are\
		'development', 'edge', 'beta', and 'release'" 1>&2
	exit 1
	;;
esac

# Don't use quotes with $docker_tags because we want word splitting and
# or an empty space if tags are empty.
docker buildx build\
	--platform "$docker_platforms"\
	--build-arg version="$version"\
	--build-arg channel="$channel"\
	--build-arg VCS_REF="$commit"\
	--build-arg BUILD_DATE="$build_date"\
	$docker_tags\
	--output "$docker_output"\
	-t "$docker_image_full_name"\
	-f ./Dockerfile\
	.
