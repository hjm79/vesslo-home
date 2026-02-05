#!/bin/bash
# vesslo.top MacBook 배포 스크립트 (wtrpro)

# sitemap.xml 날짜 오늘 날짜로 갱신 (SEO 최적화)
TODAY=$(date +%Y-%m-%d)
if [[ "$OSTYPE" == "darwin"* ]]; then
  # macOS
  sed -i '' "s/<lastmod>[0-9]\{4\}-[0-9]\{2\}-[0-9]\{2\}<\/lastmod>/<lastmod>$TODAY<\/lastmod>/g" public/sitemap.xml
else
  # Linux
  sed -i "s/<lastmod>[0-9]\{4\}-[0-9]\{2\}-[0-9]\{2\}<\/lastmod>/<lastmod>$TODAY<\/lastmod>/g" public/sitemap.xml
fi
echo "📅 Updated sitemap.xml lastmod to $TODAY"

echo "🔨 Building..."
npm run build

if [ $? -eq 0 ]; then
    echo "📤 Deploying to MacBook server (wtrpro)..."
    # HostName 183.96.81.247, User root, Port 2254, Key ~/.ssh/id_ed25519
    rsync -avz --delete -e "ssh -p 2254 -i ~/.ssh/id_ed25519" out/ root@183.96.81.247:/var/www/vesslo.top/
    
    # 서버 파일 소유권 변경 (www-data)
    echo "🔒 Updating file permissions..."
    ssh -p 2254 -i ~/.ssh/id_ed25519 root@183.96.81.247 "chown -R www-data:www-data /var/www/vesslo.top"
    
    echo "✅ Deployed to vesslo.top on MacBook!"
else
    echo "❌ Build failed!"
    exit 1
fi
