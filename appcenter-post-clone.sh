npm config set registry https://packagecloud.io/flatsorspikes/frontend/npm/
echo "always-auth=true" > .npmrc
echo "registry=https://packagecloud.io/flatsorspikes/frontend/npm/" >> .npmrc
echo "//packagecloud.io/flatsorspikes/frontend/npm/:_authToken=${PACKAGECLOUD_READ_TOKEN}" >> .npmrc
