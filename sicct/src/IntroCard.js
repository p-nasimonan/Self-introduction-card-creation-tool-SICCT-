import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import './App.css';
/**
 * @file IntroCard.js
 * @brief 自己紹介カード作成コンポーネント
 * @details ユーザーが自己紹介カードを作成するための画面を提供します。
 */

const genshinApiUrl = "https://enka.network/api/uid/";

function IntroCard() {
  const [isGithubChecked, setIsGithubChecked] = useState(false);
  const [game, setGame] = useState("");
  const [gameId, setGameId] = useState("");
  const [name, setName] = useState("");
  const [hobby, setHobby] = useState("");
  const [music, setMusic] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [githubUrl, setGithubUrl] = useState("");

  const handleGithubChange = (e) => {
    setIsGithubChecked(e.target.checked);
  };
  const handleGameChange = (e) => {
    setGame(e.target.value);
    setGameId(""); // Reset gameId when game changes
  };
  const handleGameIdChange = (e) => {
    setGameId(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleHobbyChange = (e) => {
    setHobby(e.target.value);
  };
  const handleMusicChange = (e) => { 
    setMusic(e.target.value);
  };
  const handleImageUrlChange = (e) => { 
    setImageUrl(e.target.value);
  };
  const handleIntroductionChange = (e) => {
    setIntroduction(e.target.value);
  };
  const handleGithubUrlChange = (e) => {
    setGithubUrl(e.target.value);
  };
  
  const exportAsImage = () => {
    const cardElement = document.querySelector('.intro-card');
    html2canvas(cardElement).then((canvas) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'intro_card.png';
      link.click();
    });
  };

  let inputGame;
  if (game === "genshin" || game === "hosuta" || game === "zzz") {
    inputGame = <input type="text" name="other" placeholder="ユーザーIDを入力してください" onChange={handleGameIdChange} value={gameId} />;
  } else if (game === "none" || game === "") {
    inputGame = "";
  } else {
    inputGame = <input type="text" name="other" placeholder="その他のゲームを入力してください" onChange={handleGameIdChange} value={gameId} />;
  }

  return (
    <div>
      <h2>自己紹介カード作成画面</h2>
      <div className='intro-card'>
        <div className='intro-card-header' style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          <h3>自己紹介</h3>
          <input type="text" name="name" placeholder="名前" onChange={handleNameChange} value={name} />
          {imageUrl ? (
            <img src={imageUrl} alt="好きな画像" style={{ maxWidth: '100px', height: 'auto', marginLeft: '10px' }} />
          ) : (
          <input type="text" name="image" placeholder="画像のURLを入力してください" onChange={handleImageUrlChange} value={imageUrl} />
          )}
        </div>
        <div className='intro-card-body'>
          <div className='intro-card-section'>
            <h4>趣味</h4>
            <input type="text" name="hobby" placeholder="趣味" onChange={handleHobbyChange} value={hobby} />
          </div>
          <div className='intro-card-section'>
            <h4>好きなゲーム</h4>
            <select name="game" onChange={handleGameChange} value={game}>
              <option value="none">なし</option>
              <option value="genshin">原神</option>
              <option value="hosuta">崩壊スターレール</option>
              <option value="zzz">ゼレンスゾーンゼロ</option>
              <option value="other">その他</option>

            </select>
            {inputGame}
          </div>
          <div className='intro-card-section'>
            <h4>好きな音楽</h4>
            <input type="text" name="music" placeholder="好きな音楽" onChange={handleMusicChange} value={music} />
          </div>
          <div className='intro-card-section'>
            <h4>一言</h4>
            <input type="text" name="introduction" placeholder="一言" onChange={handleIntroductionChange} value={introduction} />
          </div>
          <div className='intro-card-section'>
            <h4>GitHub</h4>
            <input type="checkbox" name="github" checked={isGithubChecked} onChange={handleGithubChange} />
            {isGithubChecked && <input type="text" name="github" placeholder="GitHubのURLを入力してください" onChange={handleGithubUrlChange} value={githubUrl} />}
          </div>
        </div>
        <button type="button" onClick={exportAsImage}>カードを画像として保存</button>
      </div>
    </div>
  );
}

export default IntroCard;