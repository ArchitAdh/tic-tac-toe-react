// players name

const SetupScreen = ({ playerState, gameState }) => {
  const { playerX, setPlayerX, playerO, setPlayerO } = playerState;
  const { gameStarted, setGameStarted } = gameState;

  return (
    <>
      {!gameStarted && (
        <div className="setup-screen">
          <div className="setup-image">
            <h2 className="setup-heading">
              Tic Tac Toe
              <small>Let's Play</small>
            </h2>
          </div>
          <form
            className="setup-form"
            onSubmit={(e) => {
              e.preventDefault();
              setGameStarted(true);
            }}
          >
            <div className="playerX input">
              <input
                className="input-field"
                id="playerX"
                type="text"
                value={playerX}
                onChange={(e) => setPlayerX(e.target.value)}
                required
                maxLength="7"
              />
              <label htmlFor="playerX" className="input-label">
                Player X Name
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
                maxLength="7"
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
        </div>
      )}
    </>
  );
};
export default SetupScreen;
