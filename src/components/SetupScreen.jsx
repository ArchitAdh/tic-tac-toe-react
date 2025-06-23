// players name

const SetupScreen = ({ playerState, gameState }) => {
  const { playerX, setPlayerX, playerO, setPlayerO } = playerState;
  const { gameStarted, setGameStarted, handleReset, status } = gameState;

  const handleStartGame = () => {
    if (playerO.trim() && playerX.trim()) {
      setGameStarted(true);
    } else {
      alert("Please Enter Names for both players");
    }
  };
  return (
    <div className="setup-screen">
      {!gameStarted ? (
        <form onSubmit={handleStartGame}>
          <div className="playerX">
            <label htmlFor="playerX">Player X Name</label>
            <input
              id="playerX"
              type="text"
              value={playerX}
              onChange={(e) => setPlayerX(e.target.value)}
              placeholder="Player X"
            />
          </div>
          <div className="playerO">
            <label htmlFor="playerO">Player O Name</label>
            <input
              id="playerO"
              type="text"
              value={playerO}
              onChange={(e) => setPlayerO(e.target.value)}
              placeholder="Player O"
            />
          </div>
          <button type="submit">Start game</button>
        </form>
      ) : (
        <>
          <p className="status">{status}</p>
          <button onClick={handleReset}>Restart</button>
        </>
      )}
    </div>
  );
};
export default SetupScreen;
