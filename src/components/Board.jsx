import Square from "./Square";
import { calculateWinner } from "../utils/gameHelpers";
const Board = ({ xIsNext, squares, onPlay }) => {
  const { winner, winningSquares } = calculateWinner(squares);
  let status = winner
    ? `Winner: ${winner}`
    : `Next Player: ${xIsNext ? "X" : "O"}`;

  const handleClick = (i) => {
    if (squares[i] || winner) return;
    const nextSquares = squares.slice();
    xIsNext ? (nextSquares[i] = "X") : (nextSquares[i] = "O");
    onPlay(nextSquares);
  };

  //create board-row
  const boardRows = [0, 1, 2].map((row) => (
    <div key={row} className="board-row">
      {[0, 1, 2].map((col) => {
        const index = row * 3 + col;
        return (
          <Square
            key={index}
            value={squares[index]}
            onSquareClick={() => handleClick(index)}
            isWinning={winningSquares.includes(index)}
          />
        );
      })}
    </div>
  ));

  return (
    <>
      <div className="status">{status}</div>
      {boardRows}

      {/* copy of original implementation for future references */}
      {/* <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div> */}
    </>
  );
};

export default Board;
