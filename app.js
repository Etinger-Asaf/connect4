import { useReducer } from "react";
import { reducer } from "./reducer";
import { intialGameState } from "./initialState";
import Row from "./row";
import { checkForWin, deepCloneBoard, generateNewBoard } from "./utilis";

const App = () => {
  const [state, dispatch] = useReducer(reducer, intialGameState);

  const play = (c) => {
    if (!state.gameOver) {
      let board = deepCloneBoard(state.board);
      //check if cell is taken by starting at the bottom row and working up
      for (let r = 5; r >= 0; r--) {
        if (!board[r][c]) {
          board[r][c] = state.currentPlayer;
          break;
        }
      }

      // Check status of board
      let result = checkForWin(board);
      if (result === state.player1) {
        dispatch({
          type: "endGame",
          message: "Player1 (red) wins!",
          board,
        });
      } else if (result === state.player2) {
        dispatch({
          type: "endGame",
          message: "Player2 (yellow) wins!",
          board,
        });
      } else if (result === "draw") {
        dispatch({
          type: "endGame",
          message: "Draw Game!",
          board,
        });
      } else {
        const nextPlayer =
          state.currentPlayer === state.player1 ? state.player2 : state.player1;

        dispatch({ type: "togglePlayer", nextPlayer, board });
      }
    }
    // it's gameover and a user clicked a cell
    else {
      dispatch({
        type: "updateMessage",
        message: "Game Over. Please start a new game.",
      });
    }
  };

  const board = state.board.map((row, i) => {
    return <Row key={i} row={row} play={play} />;
  });

  const newGameBtnHandler = () => {
    dispatch({ type: "newGame", board: generateNewBoard() });
  };

  return (
    <div className="app">
      <h1>{state.header}</h1>
      <button onClick={newGameBtnHandler}>New Game</button>
      <div className="board">{board}</div>
      <h3>{state.message}</h3>
    </div>
  );
};

export default App;
