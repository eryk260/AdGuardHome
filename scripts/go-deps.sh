#!/bin/sh

verbose="${VERBOSE:-0}"

if [ "$verbose" -gt '0' ]
then
	set -x
	x_flags='-x'
else
	x_flags=''
fi

set -e -f -u

go="${GO:-go}"

# Don't use quotes with flag variables because we want an empty space if
# those aren't set.
"$go" mod download $x_flags
