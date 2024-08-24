import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import './App.css';
import axios from 'axios';
/**
 * @file IntroCard.js
 * @brief 自己紹介カード作成コンポーネント
 * @details ユーザーが自己紹介カードを作成するための画面を提供します。
 */



function IntroCard() {
  const [exportMode, setExportMode] = useState(false);
  const [isGithubChecked, setIsGithubChecked] = useState(false);
  const [game, setGame] = useState("");
  const [gameId, setGameId] = useState("");
  const [genshinId, setGenshinId] = useState("");
  const [name, setName] = useState("");
  const [hobby, setHobby] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [genshinData, setGenshinData] = useState(null);
  const [error, setError] = useState(null);

  

  const handleGithubChange = (e) => {
    setIsGithubChecked(e.target.checked);
  };
  const handleGameChange = (e) => {
    setGame(e.target.value);
    setGameId(""); // Reset gameId when game changes
  };
  const handleGameIdChange = (e) => {
    setGameId(e.target.value.trim());
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

  const getGameData = (game, gameId) => {
    if (game === "genshin") {
      setGenshinId(gameId);
      const api = process.env.GENSHIN_API_CONTEXT+gameId;
      console.log(`Fetching data from: ${api}`);
      axios.get(api)
        .then(response => {
          console.log(response.data);
          setGenshinData(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  };
  

  const GameName = (game, gameId) => {
    if (game === "genshin") {
      return <span className="export-mode-content">原神 UID: {gameId}</span>;
    } else if (game === "hosuta") {
      return <span className="export-mode-content">崩壊スターレール UID: {gameId}</span>;
    } else if (game === "zzz") {
      return <span className="export-mode-content">ゼレンスゾーンゼロ UID: {gameId}</span>;
    } else if (game === "other") {
      return <span className="export-mode-content">{gameId}</span>;
    } else {
      return "";
      }
  };

  const exportAsImage = () => {
    getGameData(game, gameId);
    setExportMode(true);
    const cardElement = document.querySelector('.intro-card');
    cardElement.classList.add('export-mode');
    html2canvas(cardElement).then((canvas) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'intro_card.png';
      link.click();
      cardElement.classList.remove('export-mode');
    });
    setExportMode(false);
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
        <div className='intro-card-header'>
          <h3>自己紹介</h3>
          <input type="text" name="name" placeholder="名前" onChange={handleNameChange} value={name} />
          <span className="export-mode-content">{name}</span>
        </div>
        <div className='intro-card-body'>
          <div className='intro-card-section'>
            <h4>趣味</h4>
            <input type="text" name="hobby" placeholder="趣味" onChange={handleHobbyChange} value={hobby} />
            <span className="export-mode-content">{hobby}</span>
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
            {GameName(game, gameId)}
          </div>
          <div className='intro-card-section'>
            <h4>一言</h4>
            <input type="text" name="introduction" placeholder="一言" onChange={handleIntroductionChange} value={introduction} />
            <span className="export-mode-content">{introduction}</span>
          </div>
          {isGithubChecked && (
            <div className='intro-card-section'>
              <h4>GitHub</h4>
              <input type="checkbox" name="github" checked={isGithubChecked} onChange={handleGithubChange} />
              <input type="text" name="github" placeholder="GitHubのURLを入力してください" onChange={handleGithubUrlChange} value={githubUrl} />
              <span className="export-mode-content">{githubUrl}</span>
            </div>
          )}
        </div>
        <button type="button" onClick={exportAsImage}>カードを画像として保存</button>
      </div>
      {error && <p className="error-message">エラーが発生しました: {error}</p>}
    </div>
  );
}

export default IntroCard;