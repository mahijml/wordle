import React from 'react'

export default function Line({ guess , isFinal , solution}) {
    const word_length = 5;
    const boxes= [];
    for(let i =0 ; i < word_length; i++) {
        const char = guess[i]
        let className = `box ${char && "current"}`;

        if(isFinal) {
            if(char === solution[i]){
                className += ' correct'
            }else if( solution.includes(char)) {
                className += ' close '
            }else{
                className += ' incorrect '
            }
        }

        boxes.push(<div className={className} key={i}>{char}</div>)
    }
  return (
    <div className='line'>
        {boxes}
    </div>
  )
}
