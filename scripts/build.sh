#NETLIFY_BUILD_BASE="/Users/Can/Sites/GaiAma.org/gatsby/scripts"
#GAIAMA_CONTENT_ID=7024924
#BRANCH=v2
#GAIAMA_CONTENT_TOKEN="d1LmyC3gbR-r1KuPycxA"

GAIAMA_CONTENT_URL="https://gitlab.com/api/v4/projects/$GAIAMA_CONTENT_ID/repository/archive?sha=$BRANCH&private_token=$GAIAMA_CONTENT_TOKEN"
GAIAMA_CONTENT_HASH=$(curl -sI "$GAIAMA_CONTENT_URL" | grep -o -E 'filename="[^"]+' | sed -e 's/filename="//' | sed -e 's/.tar.gz//')
GAIAMA_CACHE_BASE="$NETLIFY_BUILD_BASE/cache/gaiama"
# Directory named after the latest content repo hash
GAIAMA_CACHE_DIR="$GAIAMA_CACHE_BASE/$GAIAMA_CONTENT_HASH"
GAIAMA_CONTENT_TAR="$GAIAMA_CACHE_DIR/content.tgz"
GAIAMA_CONTENT_DIR="$NETLIFY_BUILD_BASE/repo/content"

# if cache dir not existent, it must be old or missing
if [ ! -d "$GAIAMA_CACHE_DIR" ]; then
  echo "Cached content missing or not up to date"
  # let's clean up, to remove old cache files
  if [ -d "$GAIAMA_CACHE_BASE" ]; then
    echo "removing old cache directory"
    rm -Rf $GAIAMA_CACHE_DIR
    echo "removed old cache directory"
  fi
  echo "ensuring cache directory"
  mkdir -p $GAIAMA_CACHE_DIR
  echo "ensured cache directory"
  echo "Fetching content"
  wget -O $GAIAMA_CONTENT_TAR $GAIAMA_CONTENT_URL
  echo "Fetched content"
  echo "Extracting tarball"
  tar -xzf $GAIAMA_CONTENT_TAR -C "$GAIAMA_CACHE_DIR"
  echo "Extracted tarball"
fi

# ensure content dir in project root
mkdir -p "$GAIAMA_CONTENT_DIR"
# restore cached content
mv "$GAIAMA_CACHE_DIR/$GAIAMA_CONTENT_HASH" "$GAIAMA_CONTENT_DIR/"

yarn build

export GAIAMA_CONTENT_HASH