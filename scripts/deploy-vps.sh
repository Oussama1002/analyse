#!/bin/bash
# Déploiement Softnovation Analyse sur VPS — port 9000
# Usage (sur le VPS en root) :
#   curl -sSL https://raw.githubusercontent.com/Oussama1002/analyse/main/scripts/deploy-vps.sh | bash
# ou après git clone :
#   bash scripts/deploy-vps.sh

set -e

APP_DIR="/var/www/analyse"
REPO="https://github.com/Oussama1002/analyse.git"
PORT=9000

echo "==> Vérification Node.js..."
if ! command -v node &>/dev/null; then
  echo "Installation de Node.js 20..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi
node -v
npm -v

echo "==> Vérification PM2..."
if ! command -v pm2 &>/dev/null; then
  npm install -g pm2
fi

echo "==> Déploiement dans ${APP_DIR}..."
if [ -d "$APP_DIR/.git" ]; then
  cd "$APP_DIR"
  git pull origin main
else
  git clone "$REPO" "$APP_DIR"
  cd "$APP_DIR"
fi

echo "==> Installation des dépendances..."
npm ci

echo "==> Build production..."
npm run build

echo "==> Démarrage / redémarrage PM2 (port ${PORT})..."
pm2 delete analyse 2>/dev/null || true
pm2 start ecosystem.config.cjs
pm2 save

# Démarrage PM2 au boot
pm2 startup systemd -u root --hp /root 2>/dev/null || true

echo "==> Ouverture du port ${PORT} (ufw)..."
if command -v ufw &>/dev/null; then
  ufw allow "${PORT}/tcp" 2>/dev/null || true
fi

echo ""
echo "=========================================="
echo "  Déploiement terminé !"
echo "  URL : http://79.143.180.186:${PORT}"
echo "  PM2 : pm2 status | pm2 logs analyse"
echo "=========================================="
