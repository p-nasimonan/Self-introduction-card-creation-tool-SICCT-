import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import './App.css';
import axios from 'axios';
import characters from './characters.json';
import namecards from './namecards.json';

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

  // Flaskバックエンドから原神データを取得する
  const getGenshinData = (genshinId) => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/genshin/${genshinId}`;
    console.log(`Fetching data from: ${url}`);
    return axios.get(url)
      .then(response => {
        console.log(response.data);
        setGenshinData(response.data);
        setError(null);  // エラーをクリア
        return response.data;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(`Error fetching data: ${error.message}`);
        throw error;
      });
  };

  const handleGetGameData = () => {
    getGenshinData(gameId);
  };

  const exportAsImage = () => {
    setExportMode(true);
    const cardElement = document.querySelector('.intro-card');
    cardElement.classList.add('export-mode');

    html2canvas(cardElement, { useCORS: true }).then((canvas) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'intro_card.png';
      link.click();
      cardElement.classList.remove('export-mode');
      setExportMode(false);
    });
  };

  // avatarIdをキャラクター画像URLに変換する関数
  const getCharacterImageUrl = (avatarId) => {
    return `https://enka.network/ui/${characters[avatarId]?.SideIconName}.png`;
  };

  // 聖遺物画像URLに変換する関数
  const getEquipmentImageUrl = (avatar, index) => {
    return `https://enka.network/ui/${avatar.equipList[index].flat.icon}.png`;
  };

  const getnamecardImageUrl = (namecardId) => {
    return `https://enka.network/ui/${namecards[namecardId]?.icon}.png`;
  };

  const displayGameInfo = () => {
    if (game === "genshin" && genshinData) {
      const namecardImageUrl = getnamecardImageUrl(genshinData.playerInfo.nameCardId);
      return (
        <div className="genshin-info" style={{ backgroundImage: `url(${namecardImageUrl})` }}>
          <div className="genshin-header">
            <div className="genshin-details">
              <p>UID: {genshinData.uid}</p>
              <p>ニックネーム: {genshinData.playerInfo.nickname}</p>
              <p>冒険ランク: {genshinData.playerInfo.level}</p>
              <p>世界ランク: {genshinData.playerInfo.worldLevel}</p>
              <p className="status-message">{genshinData.playerInfo.signature}</p>
            </div>
          </div>
          <div className="character-lineup">
            <h4>キャラクターラインナップ</h4>
            <div className="character-list">
              {genshinData.avatarInfoList.map(avatar => (
                <div key={avatar.avatarId} className="character">
                  <img src={getCharacterImageUrl(avatar.avatarId)} className="character-image" alt="キャラクター画像"/>
                  <img src={getEquipmentImageUrl(avatar, 0)} className="equipment-image" alt="聖遺物画像"/>
                  <img src={getEquipmentImageUrl(avatar, 5)} className="equipment-image" alt="武器画像"/>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  let inputGame;
  if (game === "genshin" || game === "hosuta" || game === "zzz") {
    inputGame = <input type="text" name="other" placeholder="ユーザーIDを入力してください" onChange={handleGameIdChange} value={gameId} className="export-mode-content" />;
  } else if (game === "none" || game === "") {
    inputGame = "";
  } else {
    inputGame = <input type="text" name="other" placeholder="その他のゲームを入力してください" onChange={handleGameIdChange} value={gameId} className="export-mode-content" />;
  }

  return (
    <div>
      <h2>自己紹介カード作成画面</h2>
      <div className='intro-card'>
        <div className='intro-card-header'>
          <h2>自己紹介</h2>
          <input type="text" name="name" placeholder="名前" onChange={handleNameChange} value={name} className="export-mode-content" />
          <h3>名前: {name}</h3>
        </div>
        <div className='intro-card-body'>
          <div className='intro-card-section'>
            <h4>趣味</h4>
            <input type="text" name="hobby" placeholder="趣味" onChange={handleHobbyChange} value={hobby} className="export-mode-content" />
            <span>{hobby}</span>
          </div>
          <div className='intro-card-section'>
            <h4>好きなゲーム</h4>
            <select name="game" onChange={handleGameChange} value={game} className="export-mode-content">
              <option value="none">なし</option>
              <option value="genshin">原神</option>
              <option value="hosuta">崩壊スターレール</option>
              <option value="zzz">ゼレンスゾーンゼロ</option>
              <option value="other">その他</option>
            </select>
            {inputGame}
            <button type="button" onClick={handleGetGameData} className="export-mode-content">ゲームデータを取得</button>
            {displayGameInfo()}
          </div>
          <div className='intro-card-section'>
            <h4>一言</h4>
            <input type="text" name="introduction" placeholder="一言" onChange={handleIntroductionChange} value={introduction} className="export-mode-content" />
            <span>{introduction}</span>
          </div>
          <div className='intro-card-section'>
            <h4>GitHub</h4>
            <p className="export-mode-content">GitHUbはしてますか？</p><input type="checkbox" name="github" checked={isGithubChecked} onChange={handleGithubChange} className="export-mode-content" />
            {isGithubChecked && (
              <div>
                <input type="text" name="github" placeholder="GitHubのURLを入力してください" onChange={handleGithubUrlChange} value={githubUrl} className="export-mode-content" />
                <span>{githubUrl}</span>
              </div>
            )}
          </div>
        </div>
        <button type="button" onClick={exportAsImage} className="export-mode-content">カードを画像として保存</button>
      </div>
      {error && <p className="error-message">エラーが発生しました: {error}</p>}
    </div>
  );
}

export default IntroCard;