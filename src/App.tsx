import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import PlayerBoard from "./PlayerBoard";
import {
  calculateBoardScore,
  rollDie,
  createUpdatedBoard,
  cancelOpponentBoard,
} from "./gameUtils";

export type MoveType = {
  playerId: string;
  columnSelected: number;
  roll: number;
};
export type ColumnType = number[];
export type BoardType = ColumnType[];

export type PlayerType = {
  id: string;
  name: string;
  isHuman: boolean;
  board: BoardType;
  score: number;
};

const App = () => {
  const [roll, setRoll] = useState<number>(0);
  const [playerOneData, setPlayerOneData] = useState<PlayerType>({
    id: self.crypto.randomUUID(),
    name: "Player",
    board: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
    score: 0,
    isHuman: true,
  });
  const [playerTwoData, setPlayerTwoData] = useState<PlayerType>({
    id: self.crypto.randomUUID(),
    name: "Computer",
    board: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
    score: 0,
    isHuman: false,
  });
  const [status, setStatus] = useState(playerOneData.id);
  const [lastMove, setLastMove] = useState<MoveType | undefined>(undefined);
  const [winner, setWinner] = useState("");

  const PLAYERS = [playerOneData.id, playerTwoData.id];

  const handleRollDie = (): void => {
    setRoll(rollDie());
  };

  useEffect(() => {
    if (status === "PROCESSING") {
      // Update player score from lastMove object
      if (lastMove === undefined) {
        throw new Error("Error recording last move");
      }
      const isPlayerOne = playerOneData.id === lastMove?.playerId;
      const currentPlayerData = isPlayerOne
        ? { ...playerOneData }
        : { ...playerTwoData };
      const otherPlayerData = isPlayerOne
        ? { ...playerTwoData }
        : { ...playerOneData };
      const { board } = currentPlayerData;
      const currentPlayerUpdaterFn = isPlayerOne
        ? setPlayerOneData
        : setPlayerTwoData;
      const otherPlayerUpdaterFn = isPlayerOne
        ? setPlayerTwoData
        : setPlayerOneData;

      currentPlayerData.board = createUpdatedBoard(board, lastMove);
      currentPlayerData.score = calculateBoardScore(board);

      currentPlayerUpdaterFn(currentPlayerData);

      // Update the other player's board from lastMove object
      const otherPlayerUpdatedBoard = cancelOpponentBoard(
        [...otherPlayerData.board],
        lastMove
      );
      otherPlayerData.board = otherPlayerUpdatedBoard;
      otherPlayerData.score = calculateBoardScore(otherPlayerUpdatedBoard);

      otherPlayerUpdaterFn({ ...otherPlayerData });

      // Evaluate for win condition
      const hasZerosArr = currentPlayerData.board.map((column) =>
        column.includes(0)
      );

      if (!hasZerosArr.includes(true)) {
        setStatus("GAME_OVER");
        setWinner(currentPlayerData.name);
        console.log(`Game over, ${currentPlayerData.name} wins!`);
      } else {
        // Update status for next player turn
        setStatus(PLAYERS.filter((player) => player !== lastMove.playerId)[0]);
      }
    }
  }, [status]);

  return (
    <div className="p-0 m-0">
      <div id="game">
        <div className="flex justify-around">
          <PlayerBoard
            player={playerOneData}
            currentRoll={roll}
            handleRollDie={handleRollDie}
            setLastMove={setLastMove}
            setRoll={setRoll}
            setStatus={setStatus}
            status={status}
          />
          <PlayerBoard
            player={playerTwoData}
            currentRoll={roll}
            handleRollDie={handleRollDie}
            setLastMove={setLastMove}
            setRoll={setRoll}
            setStatus={setStatus}
            status={status}
          />
        </div>
      </div>
    </div>
  );
};

const root = createRoot(document.querySelector("#root")!);

root.render(<App />);
