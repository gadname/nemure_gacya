import React, { useState, useEffect } from 'react';
import Link from 'next/link';
interface HistoryItem {
    path: string;
    name: string;
    description: string;
  }
const GachaHistory = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<HistoryItem | null>(null);

  useEffect(() => {
    // Load data from localStorage after the component is mounted
    const storedHistory = localStorage.getItem('gachaHistory');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  const handleImageClick = (item: HistoryItem) => {
    setSelectedImage(item);
  }
  const handleCloseModal = () => {
    setSelectedImage(null);
  }

  return (
    
    <div>
      <h2>ガチャの履歴</h2>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
        {history.map((item, index) => (
          <div key={index} style={{ margin: '10px' }}>
            <img src={item.path} alt="Gacha history" style={{width: '100px', height: '100px'}} onClick={() => handleImageClick(item)}/>
            <p>{item.name}</p>
            <p>{item.description}</p> {/* Display the description */}
          </div>
        ))}
      </div>
      {selectedImage && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={handleCloseModal}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <img src={selectedImage.path} alt="Selected" style={{width: '500px', height: '500px'}}/>
            <p>{selectedImage.name}</p>
            <p>{selectedImage.description}</p> {/* Display the description */}
          </div>
        </div>
      )}
      <Link href="/">
  <button>ホームに戻る</button>
</Link>
    </div>
  );
}

export default GachaHistory;
