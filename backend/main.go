package main

import (
	"encoding/json"
	"log"
	"net/http"
)

// フロントエンドに返すデータの構造を定義（Goの構造体）
type TestResult struct {
	ItemName string  `json:"itemName"`
	Value    float64 `json:"value"`
	Unit     string  `json:"unit"`
}

func main() {
	// /api/test-result というURLへのリクエストを処理する設定
	http.HandleFunc("/api/test-result", func(w http.ResponseWriter, r *http.Request) {
		// CORS設定: 違うポート(3000番)からのアクセスを許可するおまじない
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Content-Type", "application/json")

		// 返却するデータを作成
		result := TestResult{
			ItemName: "グルコース",
			Value:    95.0,
			Unit:     "mg/dL",
		}

		// データをJSON形式に変換してフロントエンドに送信
		json.NewEncoder(w).Encode(result)
	})

	log.Println("Go server starting on :8080")
	// 8080番ポートでサーバーを起動
	http.ListenAndServe(":8080", nil)
}