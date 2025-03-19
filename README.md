### Build with dockerx
export PUBLIC_BACKEND_URL="https://api-hydroworks.site"

docker buildx build \
  --platform linux/amd64,linux/arm64 \
  --build-arg PUBLIC_BACKEND_URL=https://api-hydroworks.site -t agrispace/kgnn-ecom:1.3.2 \
  --push \
  .