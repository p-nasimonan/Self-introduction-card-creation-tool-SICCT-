import React from 'react';

/**
 * @file IntroCard.js
 * @brief 自己紹介カード作成コンポーネント
 * @details ユーザーが自己紹介カードを作成するための画面を提供します。
 */

function IntroCard() {
  return (
    <div>
      <h2>自己紹介カード作成画面</h2>
      <form>
        <div>
          <label>名前:</label>
          <input type="text" name="name" />
        </div>
        <div>
          <label>趣味:</label>
          <input type="text" name="hobby" />
        </div>
        <div>
          <label>自己紹介:</label>
          <textarea name="introduction"></textarea>
        </div>
        <button type="submit">カードを作成</button>
      </form>
    </div>
  );
}

export default IntroCard;
