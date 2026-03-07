#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

export XDG_CONFIG_HOME="${XDG_CONFIG_HOME:-$ROOT_DIR/.config}"

if [ -f "$ROOT_DIR/.env.cloudflare" ]; then
  set -a
  # shellcheck disable=SC1091
  . "$ROOT_DIR/.env.cloudflare"
  set +a
fi

if [ -z "${CLOUDFLARE_API_TOKEN:-}" ]; then
  echo "Missing CLOUDFLARE_API_TOKEN."
  echo "Create .env.cloudflare from .env.cloudflare.example and set your token."
  exit 1
fi

if [ -z "${CLOUDFLARE_ACCOUNT_ID:-}" ]; then
  echo "Missing CLOUDFLARE_ACCOUNT_ID."
  echo "Set it in .env.cloudflare (or environment)."
  exit 1
fi

echo "Deploying with account $CLOUDFLARE_ACCOUNT_ID using API token auth..."
npx wrangler deploy
