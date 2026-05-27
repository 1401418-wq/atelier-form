#!/usr/bin/env bash
# deploy.sh — deploy to design-planner.com VPS
# Usage: bash scripts/deploy.sh
set -euo pipefail

VPS="root@194.67.116.6"
APP="/var/www/atelier-form"
KEY="$HOME/.ssh/design_planner_vps"
GREEN='\033[0;32m'; RED='\033[0;31m'; YELLOW='\033[1;33m'; NC='\033[0m'
ok()   { echo -e "  ${GREEN}✓${NC} $1"; }
fail() { echo -e "  ${RED}✗${NC} $1"; exit 1; }
info() { echo -e "${YELLOW}▶${NC} $1"; }

info "Syncing source files to VPS..."
rsync -az --delete \
  -e "ssh -i ${KEY} -o StrictHostKeyChecking=no" \
  src/ "${VPS}:${APP}/src/"

rsync -az --delete \
  -e "ssh -i ${KEY} -o StrictHostKeyChecking=no" \
  public/ "${VPS}:${APP}/public/"

for f in next.config.ts package.json package-lock.json postcss.config.mjs tailwind.config.ts tsconfig.json; do
  [ -f "$f" ] && rsync -az -e "ssh -i ${KEY} -o StrictHostKeyChecking=no" "$f" "${VPS}:${APP}/"
done
ok "Files synced"

info "Building on server..."
ssh -i "${KEY}" -o StrictHostKeyChecking=no "${VPS}" \
  "cd ${APP} && npm run build 2>&1 | tail -5"
ok "Build complete"

info "Restarting server..."
ssh -i "${KEY}" -o StrictHostKeyChecking=no "${VPS}" \
  "pm2 restart design-planner"

info "Waiting for server to come up..."
for i in $(seq 1 30); do
  CODE=$(curl -sL -o /dev/null -w "%{http_code}" --max-time 5 https://design-planner.com/ru 2>/dev/null || echo "000")
  [ "${CODE}" = "200" ] && break
  sleep 2
done
ok "Server restarted"

info "Verifying live site..."
LINK=$(curl -sL --max-time 15 https://design-planner.com/ru | grep -o "t\.me/[^\"]*" | head -1)
[ "${LINK}" = "t.me/design_planner" ] && ok "Telegram link: ${LINK}" || fail "Telegram link wrong: ${LINK}"

HTTP=$(curl -sL -o /dev/null -w "%{http_code}" --max-time 10 https://design-planner.com/ru)
[ "${HTTP}" = "200" ] && ok "Site responds: HTTP ${HTTP}" || fail "Site not responding: HTTP ${HTTP}"

echo ""
echo "────────────────────────────────────────────────"
echo -e "${GREEN}DEPLOYED${NC} — design-planner.com updated"
echo "────────────────────────────────────────────────"
