// players name

const SetupScreen = ({ playerState, gameState }) => {
  const { playerX, setPlayerX, playerO, setPlayerO } = playerState;
  const { gameStarted, setGameStarted, handleReset, status } = gameState;

  return (
    <div className="setup-screen">
      {!gameStarted ? (
        <>
          <div className="setup-image">
            <h2 className="setup-heading">
              Tic Tac Toe
              <small>Let's Play</small>
            </h2>
          </div>
          <form className="setup-form" onSubmit={() => setGameStarted(true)}>
            <div className="playerX input">
              <input
                className="input-field"
                id="playerX"
                type="text"
                value={playerX}
                onChange={(e) => setPlayerX(e.target.value)}
                required
              />
              <label htmlFor="playerX" className="input-label">
                player X name
              </label>
            </div>
            <div className="playerO input">
              <input
                className="input-field"
                id="playerO"
                type="text"
                value={playerO}
                onChange={(e) => setPlayerO(e.target.value)}
                required
              />
              <label htmlFor="playerO" className="input-label">
                Player O Name
              </label>
            </div>
            <div className="action">
              <button className="action-button" type="submit">
                Start game
              </button>
            </div>
          </form>
        </>
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
