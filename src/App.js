import React, { useEffect, useState } from 'react';
import Line from './components/Line';
import './app.css'



export default function App() {
    const [currentGuess, setCurrentGuess] = useState('');
    const [solution, setSolution] = useState('');
    const [guesses, setGuesses] = useState(Array(6).fill(null));
    const [isGameOver , setIsGameOver] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);


    useEffect(()=>{
      const keyHandler = (e)=>{
        if(isGameOver){
          return
        }
        if(e.key === 'Enter') {
          if(currentGuess.length !== 5) {
            return
          }
          const newGuess = [...guesses];
          newGuess[guesses.findIndex(value => value == null)] = currentGuess;
          setGuesses(newGuess);
          setCurrentGuess('');
          if(solution === currentGuess){
            setIsCorrect(true);
            setIsGameOver(true)
          }
        }

        if(e.key === 'Backspace') {
          setCurrentGuess(currentGuess.slice(0, -1));
          return;
        }
        if(currentGuess.length >= 5) {
          return;
        }

        const isLetter = e.key.match(/^[A-Za-z]$/) != null;
        if(isLetter) {
          setCurrentGuess(prev=> prev + e.key)
        }
      }

      window.addEventListener("keydown",keyHandler)

      return ()=> window.removeEventListener("keydown",keyHandler)
      
   },[currentGuess,isGameOver,solution , guesses])

    useEffect(()=>{
      const fetchWord =async ()=> {
        await fetch("http://localhost:3001/words")
        .then(res => res.json())
        .then(res=> {
            
            const randomNum = Math.floor(Math.random()* res.length);
            setSolution(res[randomNum].word)
        })
      }
      fetchWord();
        
    },[])  
      
    
  return (
    <>
    <div className='navbar'>wordle</div>
    <div className='board'>
      {guesses.map((guess,i)=>{
        const isCurrentGuess = i === guesses.findIndex(value=> value == null);
        return(
          <Line 
          key={i}
          guess={isCurrentGuess ? currentGuess : guess ?? ''} 
          isFinal={!isCurrentGuess && guess != null}
          solution={solution}
          />
        )
      })}
        {isGameOver && isCorrect && <div><h3>you win!</h3></div>}
        {!isGameOver && !isCorrect && guesses[5] != null && (
          <div>
            <h3>you lost!</h3>
            <h4>The word was : {solution}</h4>
          </div>
        )}
    </div>
    </>
  )
}
