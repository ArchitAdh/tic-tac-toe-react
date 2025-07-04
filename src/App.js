import { useState } from "react";
import Board from "./components/Board";
import SetupScreen from "./components/SetupScreen";
import { calculateWinner } from "./utils/gameHelpers";
import undoIcon from "./assets/undo.svg";
import redoIcon from "./assets/redo.svg";
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

  const status = () => {
    if (winner) {
      return (
        <p className="status-head">
          Winner: <span> {winner === "X" ? playerX : playerO} </span>
        </p>
      );
    } else {
      return (
        <p className="status-head">
          Next Player:{" "}
          <span> {xIsNext ? "(X) " + playerX : "(O) " + playerO} </span>
        </p>
      );
    }
  };

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
    setPlayerX(playerO);
    setPlayerO(playerX);
  };
  // FULL reset
  const handleFullReset = () => {
    setPlayerX("");
    setPlayerO("");
    setGameStarted(false);
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  };

  // handle Redo and Undo
  const handleUndo = () => {
    if (currentMove > 0) {
      setCurrentMove(currentMove - 1);
    }
  };

  const handleRedo = () => {
    if (currentMove < history.length - 1) {
      setCurrentMove(currentMove + 1);
    }
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
  // props grouping
  const playerState = { playerO, setPlayerO, playerX, setPlayerX };
  const gameState = { gameStarted, setGameStarted };

  return (
    <div className="game-container">
      <SetupScreen playerState={playerState} gameState={gameState} />
      {gameStarted && (
        <>
          <div className="game-main">
            <div className="game-board">
              <Board
                xIsNext={xIsNext}
                squares={currentSquares}
                onPlay={handlePlay}
              />
            </div>
            <div className="game-controls">
              <button onClick={handleUndo} disabled={currentMove === 0}>
                <img src={undoIcon} alt="Undo" width="24" height="24" />
              </button>
              <button
                onClick={handleRedo}
                disabled={currentMove === history.length - 1}
              >
                <img src={redoIcon} alt="Undo" width="24" height="24" />
              </button>
            </div>
            <>
              {status()}
              <button
                className="action-button reset --green"
                onClick={handleReset}
              >
                Play Again
              </button>
              <button
                className="action-button reset --red"
                onClick={handleFullReset}
              >
                Restart
              </button>
            </>
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
