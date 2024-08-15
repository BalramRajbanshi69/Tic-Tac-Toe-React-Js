import { useState } from "react";


export default function TicTacToeReact() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setXTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [draw,setDraw] = useState(false);

  const rowSquare = (index:number) => {
    return (
      <button className="square" onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  };

  function handleClick(index:number) {
    if (board[index] !== null){
      return; // square is already occupied  
    }
    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "0";
    setBoard(newBoard);
    setXTurn(!isXTurn);
    const winningCombination = checkWinner(newBoard);
    if (winningCombination) {
      setWinner(newBoard[winningCombination[0]]);
    } else if (!newBoard.includes(null)) {
      setDraw(true);
    }
  }

  function handleReset(){
    setBoard(Array(9).fill(null));
    setWinner(null);
    setDraw(false);
  }

  function checkWinner(newBoard:any[]) {
    const Combinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < Combinations.length; i++) {
      const [a, b, c] = Combinations[i];
      if (
        newBoard[a] !== null &&
        newBoard[a] === newBoard[b] &&
        newBoard[b] === newBoard[c]
      ) {
        return Combinations[i];
      }
    }
    return null;
  }

  return (
    <>
      <div className="board">
        <div className="board-row">
          {rowSquare(0)}
          {rowSquare(1)}
          {rowSquare(2)}
        </div>
        <div className="board-row">
          {rowSquare(3)}
          {rowSquare(4)}
          {rowSquare(5)}
        </div>
        <div className="board-row">
          {rowSquare(6)}
          {rowSquare(7)}
          {rowSquare(8)}
        </div>
      </div>
      <button className="resetBtn" onClick={handleReset}>
        Reset
      </button>
      <div className="result">
        {winner && <h3>The winner of this game is : {winner}</h3>}
        {draw && <h3>Match Draw!</h3>}
      </div>
    </>
  );
}
