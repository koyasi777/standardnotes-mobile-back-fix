# Standard Notes - ブラウザの「戻る」で前画面に戻れるようにする ⏪

## 📌 概要

このユーザースクリプトは、**Standard Notes のウェブアプリ**で、**ブラウザの戻る操作によりアプリ内の前の画面に戻れるようにする**ものです。  
編集画面、タグ、検索、設定などから自然に「戻る」動作を可能にし、タブが突然閉じることを防ぎます。

- 📱 モバイル端末の戻るボタン・ジェスチャーにも対応  
- 🔄 ノート編集・タグ・検索・設定など複数画面に対応  
- 🧠 SPA構成に対応し、動的なUI変化にも追従  

---

## ⚙️ インストール方法

1. ブラウザに **[Violentmonkey](https://violentmonkey.github.io/)** または **[Tampermonkey](https://www.tampermonkey.net/)** をインストール  
2. スクリプトを以下からインストール：  
   👉 [standardnotes-mobile-back-fix.user.js をインストール](https://raw.githubusercontent.com/koyasi777/standardnotes-mobile-back-fix/main/standardnotes-mobile-back-fix.user.js)

---

## 💡 主な機能

- 戻る可能性がある画面を検知 → `history.pushState` で履歴を追加  
- ブラウザの「戻る」操作で `popstate` を検出し、戻るボタンを自動クリック  
- 対象となる「戻る」ボタンは `aria-label="Go to items list"` を基準に判定  
- `MutationObserver` を使い、SPA環境でも常に状態を監視  

---

## 🔗 関連リンク

- [Standard Notes](https://standardnotes.com/)
- [Webアプリ版](https://app.standardnotes.com/)
- [Violentmonkey](https://violentmonkey.github.io/)
- [Tampermonkey](https://www.tampermonkey.net/)

---

## 📜 ライセンス

MIT License  
本スクリプトは自由にご利用・改変いただけますが、すべて自己責任でお願いします。

---

> Standard Notes をより自然な操作感に。戻る＝閉じる、の時代は終わりです。
