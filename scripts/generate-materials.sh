#!/usr/bin/env bash

cd "$(dirname "$0")/.." || exit
rootDir=$(pwd)

echo -e "ATTENTION: The files being accessed through this script are subject to different licensing terms than the rest of the project. By proceeding, you acknowledge that you have read and accept the terms of the license for these files.\n\nIf you are not familiar with these terms, please review them before continuing.\n\nDo you wish to continue? (Y/Yes to accept and proceed, any other key to abort)"
read -r answer

if [[ ! $answer =~ ^[Yy](es)?$ ]]; then
  echo "License declined. Aborting..."
  exit 1
fi

if ! command -v git &> /dev/null; then
  echo "Git is not installed"
  exit 1
fi

# Check if repository is already cloned
if [ -d "$rootDir/tmp/materials/.git" ]; then
  git -C "$rootDir/tmp/materials" pull
else
  git clone https://github.com/trpkit/materials.git "$rootDir/tmp/materials"
fi

# Function to copy contents to another directory
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