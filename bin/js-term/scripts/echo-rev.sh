sha=$(git rev-parse HEAD)
ver=$(jq .version < package.json)
rm src/version.ts
echo "export const gitSHA='$sha'" >> src/version.ts
echo "export const version=$ver" >> src/version.ts