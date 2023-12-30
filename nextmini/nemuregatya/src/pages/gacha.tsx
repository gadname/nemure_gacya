import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

function TwitterIcon() {
    return (
      <svg viewBox="0 0 24 24" width="24" height="24">
        <g>
          <path d="M14.258 10.152L23.176 0h-2.113l-7.747 8.813L7.133 0H0l9.352 13.328L0 23.973h2.113l8.176-9.309 6.531 9.309h7.133zm-2.895 3.293l-.949-1.328L2.875 1.56h3.246l6.086 8.523.945 1.328 7.91 11.078h-3.246zm0 0" fill="#000" />
        </g>
      </svg>
    );
}
interface Item {
  name: string;
  description: string;
}
interface SelectedImage {
  path: string;
  name: string;
  description: string;
}

interface Items {
  [key: string]: Item;
}
type HistoryItem = {
  path: string;
  name: string;
  description: string;
};
const Gacha = () => {
    const [result, setResult] = useState<HistoryItem | null>(null);
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [gifSrc, setGifSrc] = useState("/gacha.png"); // Added: state to store the current gif
    const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);
    const [isButtonActive, setIsButtonActive] = useState(false); // New state for button click
    const [displayed, setDisplayed] = useState(0); // New state for displayed images
    
    const specialImage = {
      path: "/farao.jpg",
      name: "ねむれふぁらお",
      description: "みいらです。ねむれません。"
    };
    const handleMouseDown = () => {
        setIsButtonActive(true);
    }
    useEffect(() => {
      const storedDisplayed = localStorage.getItem('displayed');
      if (storedDisplayed) {
        setDisplayed(JSON.parse(storedDisplayed));
      }
    }, []);
    const handleMouseUp = () => {
        setIsButtonActive(false);
    }
    useEffect(() => {
      // Load data from localStorage after the component is mounted
      const storedHistory = localStorage.getItem('gachaHistory');
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    }, []);
  
    const handleGacha = () => {
      setGifSrc("/gacha.gif"); // Set the gif to the spinning gacha
      setTimeout(() => {
        const items: Items = {
            '/raion.jpg': {name: 'ねむれらいおん', description: 'よががすきです。ねむれません'},
            '/cat.jpg': {name: 'ねむれきゃっと', description: 'ふさふさです。ねむれません'}, 
            '/zakkii.jpg': {name: 'ねむれろぼっと', description: 'ねむいです。ねむれません'},
            '/hisaju.jpg': {name: 'ねむれひさじゅ', description: 'こうちょうです。ねむれません'},
            '/midori.jpg': {name: 'ねむれみどりさん', description: 'おさけがすきです。ねむれません'},
            '/fish.jpg': {name: 'ねむれさかばんばすぴす', description: 'こだいぎょです。ねむれません'},
            '/gorira.jpg': {name: 'ねむれごりら', description: 'きんにくです。ねむれません'},
            '/misary.jpg': {name: 'ねむれみざりー', description: 'こわいです。ねむれません'},
            '/kuma.jpg': {name: 'ねむれくちゃまん', description: 'てでぃべあです。ねむれません'},
            '/current.jpg': {name: 'ねむれんとゆーざー.', description: 'ゆうしょうしました。ねむれません'},
          
          };
          
        const keys = Object.keys(items);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        const newResult = {path: randomKey, ...items[randomKey]};
        setResult(newResult);
        setHistory(prevHistory => {
          if (!prevHistory.some(item => item.path === newResult.path)) {
            const newHistory = [...prevHistory, newResult]; // 新しい結果を履歴に追加
            localStorage.setItem('gachaHistory', JSON.stringify(newHistory)); // Store the history in local storage

            // Check if there are 3 of the same image in the history
            const count = newHistory.filter(item => item.path === newResult.path).length;
            if (count === 3) {
              // Issue a premium gacha ticket
              console.log("プレミアムガチャチケットを発行しました！");
            }

            // 新しい画像の数を計算します
            const newImagesCount = new Set(newHistory.map(item => item.path)).size;
            setDisplayed(newImagesCount); // 表示されている画像の数を更新します
            localStorage.setItem('displayed', JSON.stringify(newImagesCount)); // Store the displayed count in local storage
            return newHistory;
          }
          return prevHistory;
        });
        setGifSrc(newResult.path); // Set the gif to the result
      }, 1800); // 5 seconds later
    }
  
    useEffect(() => {
      handleGacha();
    }, []);
  
    const shareOnTwitter = () => {
        const appUrl = "https://your-app-url.com";
        const imageName = result ? result.name : '';
        const text = `『${imageName}』が当たったよ!!\nみんなもガチャを回そう!!\n#ねむれガチャ\n#ねむれシリーズ\n#ミニアプリウィーク\n https://nemure-gacya.vercel.app/`;
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    }

    const handleImageClick = (item: HistoryItem) => {
        console.log(item); // Add this line
        setSelectedImage(item);
      }

    const handleSpecialImageClick = () => {
        setSelectedImage(specialImage);
    }

    const handleCloseModal = () => {
      setSelectedImage(null);
    }
  
    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            marginTop: '0px', 
            justifyContent: 'center',
            backgroundImage: result && gifSrc === result.path ? 'url(/back.gif)' : 'none', // Set background image
            backgroundSize: 'cover', // Cover the entire area
            backgroundPosition: 'center', // Center the background image
            backgroundRepeat: 'no-repeat', // Do not repeat the background image
            height: '100%' // Set the height to 100% of the viewport height
          }}>
        
        {result && 
          <>
            <button style={{ 
                marginBottom: '20px', 
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
                boxShadow: isButtonActive ? '0 4px 8px 0 rgba(0,0,0,0.2), 0 3px 10px 0 rgba(0,0,0,0.19)' : '0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)', // Reduce shadow when button is clicked
                transform: isButtonActive ? 'scale(0.95)' : 'none' // Shrink button when clicked
                }} 
                onMouseDown={handleMouseDown} // Handle mouse down event
                onMouseUp={handleMouseUp} // Handle mouse up event
                onClick={handleGacha}>もう一度、ガチャを引く</button>    

            <div>
              <img src={gifSrc} alt="Gacha result" style={{width: '600px', height: '600px'}}/>
              {gifSrc === result.path && 
                <div style={{textAlign: 'center'}}>
                  <p style={{fontSize: '30px', color: 'black', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}}>{result.name}</p>
                  {selectedImage && <p>{selectedImage.description}</p>}
                </div>
              }
            </div>
            <button className="icon" onClick={shareOnTwitter}>
              <TwitterIcon />でシェアする  
            </button>  

            {/* Added: Display gacha history */}
            <div>
              <h2>ガチャの履歴</h2>
              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                {history.map((item, index) => (
                  <div key={index} style={{ margin: '10px' }}>
                    <img src={item.path} alt="Gacha history" style={{width: '100px', height: '100px'}} onClick={() => handleImageClick(item)}/>
                    <p>{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        }

        {selectedImage && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={handleCloseModal}>
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <img src={selectedImage.path} alt="Selected" style={{width: '500px', height: '500px'}}/>
              <p style={{
                position: 'absolute', 
                bottom: '10%', 
                fontSize: '30px', // Increase font size
                color: 'white',  
                padding: '10px', 
                textAlign: 'center', 
                transform: 'translateY(50%)',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' // Add text shadow
              }}>
                {selectedImage.description}
              </p> {/* Display the description */}
            </div>
          </div>
        )}

        {displayed === 10 && 
          <div>
            <img src={specialImage.path} alt="Special" onClick={handleSpecialImageClick} />
            <p>{specialImage.name}</p>
          </div>
        }

        {/* Added: Link to index.tsx */}
        <Link href="/">
          <div>ホームに戻る</div>
        </Link>

        {/* Added: Display displayed count */}
        <div>あと：{displayed}/10枚</div>
   
      </div>
    );
}
  
export default Gacha;
