import { FC } from "react";
import BoardColumn from "./BoardColumn";
import DieRoll from "./DieRoll";
import { rollDie } from "./gameUtils";

type PlayerBoardProps = {
  board: [number, number, number][];
  canRoll: boolean;
  currentRoll: number;
  handleRollDie: () => void;
  setPlayerBoard: React.Dispatch<
    React.SetStateAction<[number, number, number][]>
  >;
  setRoll: React.Dispatch<React.SetStateAction<number>>;
  setCanRoll: React.Dispatch<React.SetStateAction<boolean>>;
};

const PlayerBoard = ({
  board,
  canRoll,
  currentRoll,
  handleRollDie,
  setPlayerBoard,
  setRoll,
  setCanRoll,
}: PlayerBoardProps) => {
  return (
    <div className="board">
      <DieRoll
        roll={currentRoll}
        canRoll={canRoll}
        handleRollDie={handleRollDie}
      />
      <div className="grid grid-cols-3 gap-4 w-fit">
        {/* TODO: This doesn't smell right, need to find a better way to handle creating the "board" */}
        {board.map((column, index) => {
          return (
            <BoardColumn
              board={board}
              setCanRoll={setCanRoll}
              setRoll={setRoll}
              columnIndex={index}
              currentRoll={currentRoll}
              setPlayerBoard={setPlayerBoard}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PlayerBoard;
