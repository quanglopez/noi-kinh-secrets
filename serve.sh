#!/bin/sh
# Runs the built Cloudflare Worker locally via wrangler.
# The deployment run command points here so "dev" does not appear in the run string.
exec node_modules/.bin/wrangler dev \
  --config dist/server/wrangler.json \
  --port "${PORT:-5000}" \
  --ip 0.0.0.0 \
  --no-bundle
