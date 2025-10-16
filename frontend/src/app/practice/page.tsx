'use client';

// ① useEffect をReactからさらに追加で読み込む
import React, { useState, useEffect } from 'react';

export default function PracticePage() {
  const [count, setCount] = useState(0);

  // ② useEffectを追加
  //    この中の処理は、画面が描画（or 再描画）された「後」に毎回実行される
  useEffect(() => {
    console.log(`現在のカウントは ${count} です。`);
  });

  const handleIncrement = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h1>カウンター</h1>
      <p>現在のカウント: {count}</p>
      <button onClick={handleIncrement}>+1する</button>
    </div>
  );
}