import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import PlayerBoard from "./PlayerBoard";
import { rollDie } from "./gameUtils";

export type MoveType = {
  playerId: string;
  columnSelected: number;
  roll: number;
};

export type BoardType = [number, number, number][];

export type PlayerType = {
  id: string;
  isHuman: boolean;
  board: BoardType;
  score: number;
};

const App = () => {
  const [roll, setRoll] = useState<number>(0);
  const [playerOneData, setPlayerOneData] = useState<PlayerType>({
    id: self.crypto.randomUUID(),
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
    board: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
    score: 0,
    isHuman: false,
  });
  const [players] = useState([playerOneData.id, playerTwoData.id]);
  const [status, setStatus] = useState(playerOneData.id);
  const [lastMove, setLastMove] = useState<MoveType | undefined>(undefined);

  const handleRollDie = (): void => {
    setRoll(rollDie());
  };

  useEffect(() => {
    if (status === "PROCESSING") {
      // Update player score from lastMove object
      if (lastMove === undefined) {
        throw new Error("Error recording last move");
      }

      // TODO: Sort this entire mess out

      const dataToUpdate =
        playerOneData.id === lastMove?.playerId
          ? { ...playerOneData }
          : { ...playerTwoData };
      const { board } = dataToUpdate;
      const updaterFn =
        playerOneData.id === lastMove?.playerId
          ? setPlayerOneData
          : setPlayerTwoData;

      console.log({ lastMove });

      const indexToUpdate = board[lastMove?.columnSelected].indexOf(0);
      const columnToUpdate: [number, number, number] = [
        ...board[lastMove?.columnSelected],
      ];
      const updatedBoard = [...board];

      columnToUpdate[indexToUpdate] = roll;
      board[lastMove?.columnSelected] = columnToUpdate;

      const updatedPlayerObj = { ...dataToUpdate, ...board };

      console.log({ updatedPlayerObj });

      // updaterFn({ ...dataToUpdate, ...board });

      // Update the other player's board from lastMove object
      // Ensure total scores are updated for both players
      // Evaluate for win condition
      // Update status for next player turn
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
