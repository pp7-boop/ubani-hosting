#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${BASE_URL:-https://api.ubanihosting.co.za}"
EMAIL="smoke-$(date +%s)@example.com"
PASSWORD="StrongPass123!"
DOMAIN="smoke-$(date +%s).co.za"

echo "1) Health check"
curl -sS "$BASE_URL/health"
echo -e "\n"

echo "2) Register"
REGISTER_JSON=$(curl -sS -X POST "$BASE_URL/api/register" \
  -H "content-type: application/json" \
  --data "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}")
echo "$REGISTER_JSON"
TOKEN=$(echo "$REGISTER_JSON" | sed -n 's/.*"token":"\([^"]*\)".*/\1/p')
if [ -z "$TOKEN" ]; then
  echo "Register failed (no token found)."
  exit 1
fi
echo -e "\n"

echo "3) Login"
LOGIN_JSON=$(curl -sS -X POST "$BASE_URL/api/login" \
  -H "content-type: application/json" \
  --data "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}")
echo "$LOGIN_JSON"
LOGIN_TOKEN=$(echo "$LOGIN_JSON" | sed -n 's/.*"token":"\([^"]*\)".*/\1/p')
if [ -z "$LOGIN_TOKEN" ]; then
  echo "Login failed (no token found)."
  exit 1
fi
echo -e "\n"

echo "4) /api/me"
curl -sS "$BASE_URL/api/me" \
  -H "authorization: Bearer $LOGIN_TOKEN"
echo -e "\n"

echo "5) /api/deploy"
curl -sS -X POST "$BASE_URL/api/deploy" \
  -H "content-type: application/json" \
  -H "authorization: Bearer $LOGIN_TOKEN" \
  --data "{
    \"domain\": \"$DOMAIN\",
    \"files\": [
      {
        \"name\": \"index.html\",
        \"contentType\": \"text/html\",
        \"content\": \"<h1>Smoke Test OK</h1>\"
      }
    ]
  }"
echo -e "\n"

echo "Smoke test completed."
