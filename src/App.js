import { useState } from "react";
import Board from "./components/Board";
import { calculateWinner } from "./utils/gameHelpers";
const Game = () => {
  const [gameStarted, setGameStarted] = useState(false);

  // players name
  const [playerX, setPlayerX] = useState("");
  const [playerO, setPlayerO] = useState("");

  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const result = calculateWinner(currentSquares);
  const winner = result?.winner;
  const status = winner
    ? `Winner: ${winner === "X" ? playerX : playerO}`
    : `Next Player: ${xIsNext ? playerX : playerO}`;

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    // setHistory([...history, nextSquares]);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  //handle game start flag
  const handleStartGame = () => {
    if (playerO.trim() && playerX.trim()) {
      setGameStarted(true);
    } else {
      alert("Please Enter Names for both players");
    }
  };

  // reset game
  const handleReset = () => {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  };

  const moves = history.map((squares, move) => {
    let description;
    move > 0
      ? (description = `Go to move # ${move}`)
      : (description = "Go to game start");

    return (
      <li key={move}>
        <button
          onClick={() => jumpTo(move)}
          className={`move-button ${move === currentMove ? "active" : ""}`}
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="game-container">
      <div className="name-inputs">
        <div className="playerX">
          <label htmlFor="playerX">Player X Name</label>
          <input
            type="text"
            value={playerX}
            onChange={(e) => setPlayerX(e.target.value)}
            placeholder="Player X"
          />
        </div>
        <div className="playerO">
          <label htmlFor="playerO">Player O Name</label>
          <input
            type="text"
            value={playerO}
            onChange={(e) => setPlayerO(e.target.value)}
            placeholder="Player O"
          />
        </div>

        {!gameStarted ? (
          <button onClick={handleStartGame}>Start Game</button>
        ) : (
          <div className="game-controls">
            <p className="status">{status}</p>
            <button onClick={handleReset}>Restart</button>
          </div>
        )}
      </div>
      {gameStarted && (
        <>
          {" "}
          <div className="game-main">
            <div className="game-board">
              <Board
                xIsNext={xIsNext}
                squares={currentSquares}
                onPlay={handlePlay}
              />
            </div>
          </div>
          <div className="game-info">
            <ol>{moves}</ol>
          </div>
        </>
      )}
    </div>
  );
};
export default Game;
