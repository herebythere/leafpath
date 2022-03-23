#!/bin/bash

# required dirs and paths

current_dir=`dirname $0`

tsconfig_pathname=$current_dir/deno/tsconfig.json
target_pathname=$current_dir/deno/leafpath.ts
bundled_pathname=$current_dir/es/leafpath.js 


# deno - build and format

deno run --config $tsconfig_pathname $target_pathname

deno fmt $current_dir