import { useState } from 'react';
import Square from './Square';
import Header from './Header';
import './styles.css';

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    
    xIsNext ? nextSquares[i] = 'X' : nextSquares[i] = 'O';

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return  squares[a];
      }
    }
    return null;
  }
  let winningSquaresStyle = {
    backGroundColor: 'black'
  };
  const winner = calculateWinner(squares);
  let status;
  let playAgain = false;
  if (winner) {
    status = `Winner: ${winner}`;
    playAgain = true;
  } else if (squares.every(square => square !== null)) {
    status = "It's a draw!";
    playAgain = true;
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }
  const handlePlayAgain = () => {
    setSquares(Array(9).fill(null))
    setXIsNext(true);
  }

  return (
    <>
    <Header />

    <div className='status'>{status} 
      <br />
       {playAgain ? <button onClick={handlePlayAgain}>Play again</button> : ""}
    </div>
    <div className='container'>
    <div className="board">
        {squares.map((square, index) => (
          <Square
            key={index}
            value={square}
            onSquareClick={() => handleClick(index)}
          />
        ))}
      </div>
      </div>
    </>
  );
}
