# OfferPath Frontend

[![CI](https://github.com/hachiya-saku/offerpath-frontend/actions/workflows/ci.yml/badge.svg)](https://github.com/hachiya-saku/offerpath-frontend/actions/workflows/ci.yml)

[日本語](README.md) | [简体中文](README.zh-CN.md) | [English](README.en.md)

OfferPath は、複数の求人サービスや企業サイトに分散した求人情報を一元管理するための求職管理プラットフォームです。応募状況、求人とのスキルマッチ度、選考の進捗を一つのワークスペースで確認できます。

バックエンド: [offerpath-backend](https://github.com/hachiya-saku/offerpath-backend)

認証、プロフィール、求人 CRUD、企業情報、面接管理、選考ステータス履歴は NestJS / PostgreSQL の実 API と接続済みです。画面は日本語を初期表示とし、中国語への切り替えにも対応しています。

## 解決したい課題

- 求人情報が複数のサービスに分散している
- 応募後の選考状況を継続して管理しにくい
- 求人要件と自分の技術スタックの差分が見えにくい
- 応募数や面接移行率などを振り返る仕組みがない

## 現在の実装

- ユーザー登録、ログイン、Token 自動更新、ログアウト、ルート保護
- 実データの求人数、選考状況、マッチ度、転換率と最近更新した求人のダッシュボード
- ECharts による求人ステータス分布
- 求人一覧、キーワード検索、ステータス・媒体フィルター
- 年収・月収・時給、固定残業代、雇用形態、勤務形態に対応した求人登録フォーム
- 仕事内容、応募資格、選考プロセス、福利厚生などの構造化された求人情報入力
- 求人詳細、スキルマッチ分析、選考タイムライン
- 求人ステータスと連動したオンライン / 対面面接の登録
- 制約付きの求人ステータス進行、不採用・Offer の記録、直前操作の取り消し
- 面接予定一覧、会議情報、Google Maps による会場確認
- 実データによる企業一覧・検索・詳細・関連求人と企業情報の編集
- 実データによるプロフィール編集、スキル CRUD、習熟度によるマッチ度計算
- 日本語 / 中国語の表示切り替えと選択言語の保存
- デスクトップ用サイドバーとモバイル用ドロワーナビゲーション
- ダークテーマを基調としたレスポンシブ UI

求人、企業、面接、プロフィール、スキルは PostgreSQL に永続化され、ダッシュボードも実 API の統計を表示します。

## バックエンド連携の準備状況

- ユーザー登録、パスワードログイン、Access Token 認証
- Refresh Token のローテーション、ログアウト、トークン無効化
- JWT によるユーザー単位のデータ分離
- 現在のユーザープロフィールの取得と更新
- 求人、企業、面接の API とデータ永続化
- 制約付きの求人ステータス進行、変更履歴、段階的な取り消し
- Prisma / PostgreSQL、単体テスト、E2E、GitHub Actions CI

## 求人ステータス

```text
検討中 -> 応募済み -> 書類選考 -> 一次面接 -> 二次面接 -> 三次面接 -> 最終面接 -> Offer
   \________________________________________________________________________ 不採用
```

面接段階は企業ごとの選考回数に合わせて先の段階を選択でき、誤操作時は直前の有効な変更へ一段ずつ戻せます。

## 技術スタック

| 分類 | 技術 |
| --- | --- |
| フロントエンド | React 19、TypeScript |
| ビルド | Vite 8 |
| ルーティング | React Router 7 |
| 状態管理 | Redux Toolkit |
| UI / CSS | shadcn/ui、Tailwind CSS 4、CSS |
| アイコン | Lucide React |
| グラフ | ECharts |
| HTTP | Axios |
| 静的解析 | Oxlint |
| バックエンド | NestJS、Prisma ORM |
| データベース | PostgreSQL |
| デプロイ（予定） | Docker Compose |

## ページ構成

```text
/login       ログイン
/register    ユーザー登録
/            ダッシュボード
/jobs        求人一覧
/jobs/new    求人登録
/jobs/:id    求人詳細
/jobs/:id/edit 求人編集
/companies   企業一覧
/companies/:id 企業詳細
/interviews  面接管理
/profile     技術スタック
```

## 今後の開発

### MVP の残作業

1. 日中表示、権限、共通 UI 状態と主要業務フローの確認
2. Docker Compose と本番デプロイ
3. E2E 最終確認、スクリーンショットと文書の仕上げ

URL 解析（非 AI / AI）、面接の編集・削除、API レスポンス形式の統一と第三者ログインは MVP 後に実装します。

## ローカル実行

Node.js `^20.19.0 || >=22.12.0` が必要です。

```bash
npm install
npm run dev
```

デフォルトでは <http://localhost:5173> で起動します。

```bash
npm run build    # 型チェックと本番ビルド
npm run lint     # 静的解析
npm run preview  # 本番ビルドのプレビュー
```

## 開発状況

主要業務とダッシュボードは実 API と接続済みです。残りは日中表示・業務フローの確認、本番デプロイと最終文書です。URL 解析は MVP 後に実装します。
