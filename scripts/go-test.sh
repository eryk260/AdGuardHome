#!/bin/sh

verbose="${VERBOSE:-0}"

# Verbosity levels:
#   0 = Don't print anything except for errors.
#   1 = Print commands, but not nested commands.
#   2 = Print everything.
if [ "$verbose" -gt '0' ]
then
	set -x
	v_flag='-v'

	if [ "$verbose" -gt '1' ]
	then
		x_flag='-x'
	else
		x_flag=''
	fi
else
	v_flag=''
	x_flag=''
fi

set -e -f -u

race="${RACE:-1}"
if [ "$race" = '0' ]
then
	race_flag=''
else
	race_flag='--race'
fi

go="${GO:-go}"
cover_flag='--coverprofile ./coverage.txt'
count_flag='--count 1'

# Don't use quotes with flag variables because we want an empty space if
# those aren't set.
"$go" test $race_flag $count_flag $cover_flag $x_flag $v_flag ./...
