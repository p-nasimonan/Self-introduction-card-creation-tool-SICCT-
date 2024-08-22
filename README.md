# 自己紹介カードを生成するツール
ハッカソンで作成したwebアプリ
## 目標
- 自己紹介カードをwebで作って、画像にして、ツイートする
- 全員がgitを使えるようになる
- 最終的には色んなAPIを駆使して、ユーザー名やIDを入れるだけで良い感じに生成してくれるようにしたい

## Gitの使い方
機能を追加するごとにブランチしてプルリクくれたらうれしいけど、まずはcloneしてみよう！

### コマンドもしくは[GitHub Desktop](https://docs.github.com/ja/desktop/installing-and-authenticating-to-github-desktop/installing-github-desktop)のGUIで操作
#### クローン（コピーみたいなやつ詳細はググって）
- ターミナルなどでプロジェクトをコピーしたい任意のディレクトリで
  - `git clone https://github.com/p-nasimonan/Self-introduction-card-creation-tool-SICCT-.git`
- GitHub Desktopの場合は
  - ![image](https://github.com/user-attachments/assets/0c9e6c50-7626-4024-b157-cf3b1b9bcd76)

## 環境構築
node.jsをインストール
https://react-js.jp/setup

## プロジェクトディレクトリに移動する
`cd Self-introduction-card-creation-tool-SICCT-/sicct`

## 実行する
`npm start`

## トラブルシューティング
- npmstartでエラー出たらおそらくディレクトリが違う
  - `pwd`で今いる場所を確かめてみよう

- もし何かライブラリがない的なことを言われれて無理だったら
  - `npm install`
