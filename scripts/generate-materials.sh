#!/usr/bin/env bash

cd "$(dirname "$0")/.." || exit
rootDir=$(pwd)

if ! command -v git &> /dev/null; then
  echo "Git is not installed"
  exit 1
fi

# Check fi repository is already cloned
if [ -d "$rootDir/tmp/materials/.git" ]; then
  git -C "$rootDir/tmp/materials" pull
else
  git clone https://github.com/trpkit/materials.git "$rootDir/tmp/materials"
fi

# Create function to copy contents of directory
copy_files() {
  local source=$1
  local destination=$2

  if [ ! -d "$destination" ]; then
    mkdir -p "$destination"
  fi

  for file in "$source"/*; do
    cp "$file" "$destination"
  done

  echo "Done copying files to $destination"
}

copy_files "$rootDir/tmp/materials/blog" "$rootDir/apps/marketing/src/content/blog"
copy_files "$rootDir/tmp/materials/legal" "$rootDir/apps/marketing/src/content/legal"