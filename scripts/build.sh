GAIAMA_CONTENT_URL="https://gitlab.com/api/v4/projects/$GAIAMA_CONTENT_ID/repository/archive?sha=$BRANCH&private_token=$GAIAMA_CONTENT_TOKEN"
GAIAMA_CONTENT_HASH=$(curl -sI "$GAIAMA_CONTENT_URL" | grep -o -E 'filename="[^"]+' | sed -e 's/filename="//' | sed -e 's/.tar.gz//')
GAIAMA_CACHE_BASE="$NETLIFY_BUILD_BASE/cache/gaiama"
GAIAMA_CACHE_DIR="$GAIAMA_CACHE_BASE/$GAIAMA_CONTENT_HASH"
GAIAMA_CACHE_TAR="$GAIAMA_CACHE_DIR/content.tgz"
GAIAMA_CONTENT_DIR="$NETLIFY_BUILD_BASE/repo/content"

if [ ! -f "$GAIAMA_CACHE_DIR/$GAIAMA_CONTENT_HASH" ]; then
  echo "Cached content missing or not up to date"
  if [ -d "$GAIAMA_CACHE_BASE" ]; then
    rm -Rf $GAIAMA_CACHE_DIR
    echo "removed old cache directory"
  fi
  mkdir -p $GAIAMA_CACHE_DIR
  echo "created cache directory"
  echo "Fetching content"
  wget -O $GAIAMA_CACHE_TAR $GAIAMA_CONTENT_URL
  mkdir -p "$GAIAMA_CONTENT_DIR"
  tar -xzf $GAIAMA_CACHE_TAR -C "$GAIAMA_CACHE_DIR"
fi

mkdir "$GAIAMA_CONTENT_DIR"
mv "$GAIAMA_CACHE_DIR/$GAIAMA_CONTENT_HASH" "$GAIAMA_CONTENT_DIR"

#npm rebuild sharp
yarn build

export GAIAMA_CONTENT_HASH