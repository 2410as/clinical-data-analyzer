'use client';

import { useState, useEffect } from 'react';
// MUIから必要なコンポーネントをインポートします
import { Card, CardContent, Typography, CircularProgress, Chip } from '@mui/material';

// Goから受け取る
interface TestResult {
  itemName: string;
  value: number;
  unit: string;
  status: '正常' | '注意' | '異常'; 
}

export default function Home() {
  const [data, setData] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(true);

  // 状態に応じてChipの色を変える関数
  const getStatusColor = (status: TestResult['status']) => {
    if (status === '正常') return 'success';
    if (status === '注意') return 'warning';
    if (status === '異常') return 'error';
    return 'default';
  };

  useEffect(() => {
    fetch('http://localhost:8080/api/test-result')
      .then((res) => res.json())
      .then((resultData: TestResult) => {
        setData(resultData);
        setLoading(false);
      })
      .catch(err => {
        console.error("APIの取得に失敗しました: ", err);
        setLoading(false);
      });
  }, []);

  return (
    <main style={{ padding: '2rem', backgroundColor: '#F5F7FA', minHeight: '100vh' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        検査値予測アプリ
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : data ? (
        <Card sx={{ minWidth: 275, maxWidth: 400, mt: 2 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              バックエンドからの検査データ
            </Typography>
            <Typography variant="h5" component="div">
              {data.itemName}
            </Typography>
            <Chip 
              label={data.status} 
              color={getStatusColor(data.status)} 
              size="small"
              sx={{ my: 1 }}
            />
            <Typography variant="body2">
              測定値: {data.value} {data.unit}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Typography color="error">
          データの読み込みに失敗しました。
        </Typography>
      )}
    </main>
  );
}