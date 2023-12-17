#!/usr/bin/env bash

cd "$(dirname "$0")/.." || exit

# Get version from root package.json
version=$(jq -r '.version' package.json)

for file in $(find ./apps ./packages -name package.json ! -path "*node_modules*"); do
  jq ".version = \"$version\"" "$file" > tmpfile && mv tmpfile "$file"
done
echo "Package versions updated successfully"

for file in $(find ./apps ./packages -name Cargo.toml); do
  sed -i -E "s/(version = \")[^\"]+/\1$version/" "$file"
done
echo "Crate versions updated successfully"