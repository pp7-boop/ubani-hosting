#!/usr/bin/env bash
set -euo pipefail

API_DOMAIN="${API_DOMAIN:-api.ubanihosting.co.za}"
API_URL="https://${API_DOMAIN}"
WORKERS_URL="${WORKERS_URL:-https://ubani-hosting-api.ubani-hosting.workers.dev}"

echo "== Ubani production verification =="
echo "API domain: ${API_DOMAIN}"
echo "Workers URL: ${WORKERS_URL}"
echo

echo "1) DNS resolution"
if getent hosts "${API_DOMAIN}" >/dev/null 2>&1; then
  getent hosts "${API_DOMAIN}" | head -n 1
else
  echo "FAIL: ${API_DOMAIN} is not resolving yet."
  echo "Action: in Cloudflare DNS, create/verify proxied record for 'api' under ubanihosting.co.za."
  exit 1
fi
echo

echo "2) workers.dev health"
curl -fsS "${WORKERS_URL}/health"
echo
echo

echo "3) custom domain health"
curl -fsS "${API_URL}/health"
echo
echo

echo "4) portal endpoint"
curl -fsS -o /dev/null -w "HTTP %{http_code}\n" "${API_URL}/portal"
echo

echo "Verification complete."
