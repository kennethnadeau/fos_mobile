npm config set registry https://packagecloud.io/flatsorspikes/frontend/npm/
echo "always-auth=true" > .npmrc
echo "registry=https://packagecloud.io/flatsorspikes/frontend/npm/" >> .npmrc
echo "//packagecloud.io/flatsorspikes/frontend/npm/:_authToken=${PACKAGECLOUD_READ_TOKEN}" >> .npmrc

# Environment Vars
echo "API_URL=${API_URL}" > "${APPCENTER_SOURCE_DIRECTORY}/.env"
echo "FLURRY_API_KEY=${FLURRY_API_KEY}" >> "${APPCENTER_SOURCE_DIRECTORY}/.env"

# Temp
echo "APPCENTER_SOURCE_DIRECTORY: ${APPCENTER_SOURCE_DIRECTORY}"
