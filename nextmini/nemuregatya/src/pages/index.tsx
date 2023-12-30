import React, { useState } from 'react';
import Link from 'next/link';


const Home = () => {
  const [gifSrc, setGifSrc] = useState("/gacha.png"); // 静止画のURL
  const [isButtonActive, setIsButtonActive] = useState(false); // New state for button click
  const handleClick = () => {
    setGifSrc("/gacha.gif"); // GIFのURL
    setTimeout(() => {
      window.location.href='/gacha';
    }, 1800); // 5秒後に遷移
  }
  const handleMouseDown = () => {
    setIsButtonActive(true);
}

const handleMouseUp = () => {
    setIsButtonActive(false);
}
  
  return (
    
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
      <h1 style={{ 
        fontWeight: 'bold', 
        fontSize: '3em', // 大きさを調整
        color: 'black', // 色を黒に設定
        textAlign: 'center', // テキストを中央に配置
        margin: '20px 0' // 上下のマージンを設定
      }}>ねむれガチャ</h1>
      <p>何が出るかな...?</p>
      <img 
  src={gifSrc} 
  alt="Gacha gif" 
  width="600" 
  height="600" 
  style={{ 
    position: 'relative', // Add this
    bottom: '20px' // And this. Adjust the pixel number as needed
  }}
  
/>
      
      <button 
  style={{ 
    position: 'relative', // Add this
    bottom: '10px',
    backgroundColor: 'yellow', 
    color: 'black', 
    border: 'none', 
    padding: '15px 32px', 
    textAlign: 'center', 
    textDecoration: 'none', 
    display: 'inline-block', 
    fontSize: '16px', 
    margin: '4px 2px', 
    cursor: 'pointer', 
    borderRadius: '12px', 
    boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)'
  }} 
  onMouseDown={handleMouseDown} // Handle mouse down event
  onMouseUp={handleMouseUp} // Handle mouse up event
  onClick={handleClick}
>
  ガチャを回す
</button>

<Link href="/nakama">
  <button>"ねむれの仲間たち"一覧へ</button>
</Link>
      
    </div>
    
    
  );
}

export default Home;
