#!/bin/bash
# vesslo.top 배포 스크립트

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
    echo "📤 Deploying to server..."
    rsync -avz --delete -e "ssh -p 2254 -i /Users/hjm/.ssh/id_rsa" out/ root@192.168.1.26:/var/www/vesslo.top/
    echo "✅ Deployed to vesslo.top!"
else
    echo "❌ Build failed!"
    exit 1
fi
