import { useState, useRef } from 'react'
import { Card } from './card'
import logo from './assets/mygo.png'
import './App.css'

const generateInitialCards = () => {
  const sources = [];
  for (let i = 1; i < 11; i++) {
    const imgUrl = new URL(`./assets/${i}.png`, import.meta.url).href;
    sources.push(imgUrl);
  }
  return sources.map(url => new Card(url));
};

const getShuffledCards = (cards) => {
  const shuffled = [...cards];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};

function App() {
  // state declaration
  const [score, setScore] = useState(0);
  const [cards, setCards] = useState(generateInitialCards);
  const [maxScore, setMaxScore] = useState(0);
  const dialogRef = useRef(null);

  const handleImgClick = (clickedCard) => {
    if (clickedCard.selected) {
      setScore(0);
      setCards(generateInitialCards()); 
    } else {
      const newScore = score + 1;
      if (newScore === cards.length) {
        dialogRef.current.showModal();
      }
      setScore(newScore);
      setMaxScore(Math.max(maxScore, newScore));

      setCards(prevCards => {
        const updatedCards = prevCards.map(card => {
          if (card.id === clickedCard.id) {
            return { ...card, selected: true };
          }
          return card;
        });
        return getShuffledCards(updatedCards);
      });
    }
  };

  const handleRestart = () => {
    dialogRef.current.close();
    setScore(0);
    setMaxScore(0);
    setCards(generateInitialCards);
  }

  return (
    <>
      <header>
        <div className="logo"><img src={logo}/></div>
        <div className="scores">
          <div className="score">Score: {score}</div>
          <div className="maxScore">Best score: {maxScore}</div>
        </div>
      </header>
      <div className='image-cards'>
        {cards.map(card => (
          <div className="image-container" key={card.id}>
            <img src={card.src} onClick={() => handleImgClick(card)}/>
          </div>
        ))}
      </div>
      <dialog ref={dialogRef}>
        <p>You win!</p>
        <button type='button' onClick={handleRestart}>Restart game!</button>
      </dialog>
    </>
    
  )
}

export default App
