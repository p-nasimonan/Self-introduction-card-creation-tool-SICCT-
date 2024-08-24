import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import './App.css';
/**
 * @file IntroCard.js
 * @brief 自己紹介カード作成コンポーネント
 * @details ユーザーが自己紹介カードを作成するための画面を提供します。
 */

const introCard_img = require('./intro.png');
const genshin_api_url = "https://enka.network/api/uid/";

function IntroCard() {
  const [isGithubChecked, setIsGithubChecked] = useState(false);
  const [game, setGame] = useState("");
  const [game_id, setGameId] = useState("");
  const [name, setName] = useState("");
  const [hobby, setHobby] = useState("");
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

  let inputgame;
  if (game === "genshin" || game === "hosuta" || game === "zzz") {
    inputgame = <input type="text" name="other" placeholder="ユーザーIDを入力してください" onChange={handleGameIdChange} value={game_id} />;
  } else if (game === "none") {
    inputgame = "";
  } else if (game === "") {
    inputgame = "";
  } else {
    inputgame = <input type="text" name="other" placeholder="その他のゲームを入力してください" onChange={handleGameIdChange} value={game_id} />
  }
    
  return (
    <div>
      <h2>自己紹介カード作成画面</h2>
      <form className='intro-card-form'>
        <div>
          <label>名前:</label>
          <input type="text" name="name" onChange={handleNameChange} value={name} />
        </div>
        <div>
          <label>趣味:</label>
          <input type="text" name="hobby" onChange={handleHobbyChange} value={hobby} />
        </div>
        <div>
          <label>好きなゲーム:</label>
          <select name="game" onChange={handleGameChange} value={game}>
            <option value="none">なし</option>
            <option value="genshin">原神</option>
            <option value="hosuta">崩壊スターレール</option>
            <option value="zzz">ゼレンスゾーンゼロ</option>
            <option value="other">その他</option>
          </select>
          <p>{inputgame}</p>
        </div>
        <div>
          <label>一言:</label>
          <input type="text" name="introduction" onChange={handleIntroductionChange} value={introduction} />
        </div>
        <div>
          <label>GitHubはやってますか:</label>
          <input type="checkbox" name="github" checked={isGithubChecked} onChange={handleGithubChange} />
          {isGithubChecked && <input type="text" name="github" placeholder="GitHubのURLを入力してください" onChange={handleGithubUrlChange} value={githubUrl} />}
        </div>
        <button type="button" onClick={exportAsImage}>カードを画像として保存</button>
      </form>


      <div className='intro-card-preview'>
        <h2>プレビュー</h2>
        <div className='intro-card'>
          <div className='intro-card-header'>
            <h3>自己紹介</h3>
            <p>{name}</p>
          </div>
          <div className='intro-card-body'>
            <div className='intro-card-section'>
              <h4>趣味</h4>
              <p>{hobby}</p>
            </div>
            <div className='intro-card-section'>
              <h4>好きなゲーム</h4>
              <p>{game}</p>
            </div>
            <div className='intro-card-section'>
              <h4>一言</h4>
              <p>{introduction}</p>
            </div>
            {isGithubChecked && (
              <div className='intro-card-section'>
                <h4>GitHub</h4>
                <p>{githubUrl}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntroCard;