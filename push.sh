#!/bin/bash

if [ -z "$1" ]; then
  echo "❌ コミットメッセージを指定してください"
  exit 1
fi

echo "🔄 変更をステージングします..."
git add .

echo "✅ コミットします: $1"
git commit -m "$1"

echo "📤 プッシュします..."
git push origin main

echo "🎉 完了しました！"
