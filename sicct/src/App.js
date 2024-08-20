import './App.css';
import React, { useState } from 'react';
import IntroCard from './IntroCard';

/**
 * @file App.js
 * @brief メインアプリケーションコンポーネント
 * @details 自己紹介カード作成ツールのメインコンポーネントです。
 */

function App() {
  const [showIntroCard, setShowIntroCard] = useState(false);

  const handleButtonClick = () => {
    setShowIntroCard(true);
  };

  return (
    <div className="App">
      {showIntroCard ? (
        <IntroCard />
      ) : (
        <div>
          <h1>自己紹介カード生成ツール</h1>
          <p>音楽、ゲーム、プログラミング</p>
          <div>
            <img className="spotify" src="img/spotify-logo.png" alt="Spotify" />
            <img className="genshin" src="img/genshin-logo.png" alt="Genshin" />
            <img className="github" src="img/github-logo.png" alt="GitHub" />
          </div>
          <button onClick={handleButtonClick}>自己紹介カードを作る</button>
        </div>
      )}
    </div>
  );
}

export default App;