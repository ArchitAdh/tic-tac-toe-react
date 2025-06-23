import { useState } from "react";
import Board from "./components/Board";
import SetupScreen from "./components/SetupScreen";
import { calculateWinner } from "./utils/gameHelpers";
const Game = () => {
  const [gameStarted, setGameStarted] = useState(false);

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

  // reset game
  const handleReset = () => {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  };

  const moves = history.map((move) => {
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
  // props grouping
  const playerState = { playerO, setPlayerO, playerX, setPlayerX };
  const gameState = { gameStarted, setGameStarted, handleReset, status };

  return (
    <div className="game-container">
      <SetupScreen
        playerState={playerState}
        gameState={gameState}
        status={gameStarted ? status : null}
      />
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
