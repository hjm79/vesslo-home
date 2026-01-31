#!/bin/bash
# vesslo.top 배포 스크립트

echo "🔨 Building..."
npm run build

if [ $? -eq 0 ]; then
    echo "📤 Deploying to server..."
    rsync -avz --delete -e "ssh -p 2254 -i /Users/hjm/.ssh/id_rsa" out/ root@192.168.1.26:/var/www/vesslo.top/
    echo "✅ Deployed to vesslo.top!"
else
    echo "❌ Build failed!"
    exit 1
fi
