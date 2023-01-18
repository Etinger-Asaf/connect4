import { intialGameState } from "./initialState";
export function reducer(state, action) {
  switch (action.type) {
    case "newGame":
      return {
        ...intialGameState,
        board: action.board,
      };

    case "togglePlayer":
      return {
        ...state,
        currentPlayer: action.nextPlayer,
        board: action.board,
      };

    case "endGame":
      return {
        ...state,
        gameOver: true,
        message: action.message,
        board: action.board,
      };
    case "updateMessage":
      return {
        ...state,
        message: action.message,
      };
    default:
      throw new Error(`Action "${action.type}" is not a valid action`);
  }
}
