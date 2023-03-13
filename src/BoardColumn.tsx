import { FC } from "react";
import { MoveType } from "./App";
import { calculateColumnScore } from "./gameUtils";

type BoardColumnProps = {
  board: [number, number, number][];
  columnIndex: number;
  currentRoll: number;
  playerId: string;
  setLastMove: React.Dispatch<React.SetStateAction<MoveType | undefined>>;
  setRoll: React.Dispatch<React.SetStateAction<number>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
};

const BoardColumn: FC<BoardColumnProps> = ({
  board,
  columnIndex,
  currentRoll,
  playerId,
  setLastMove,
  setRoll,
  setStatus,
}) => {
  const currentColumn = board[columnIndex];

  function handleColumnClick(index: number): void {
    //   const indexToUpdate = board[columnIndex].indexOf(0);
    //   const columnToUpdate: [number, number, number] = [...board[columnIndex]];
    //   const updatedBoard = [...board];

    //   columnToUpdate[indexToUpdate] = currentRoll;
    //   updatedBoard[columnIndex] = columnToUpdate;

    // setPlayerBoard(updatedBoard);

    setLastMove({
      playerId,
      columnSelected: index,
      roll: currentRoll,
    });
    setRoll(0);
    setStatus("PROCESSING");
  }

  return (
    <div className="border-blue-600 border-2 w-44 flex flex-col items-center gap-4">
      <div className="h-12 w-12 border-red-500 border-2 text-center">
        {calculateColumnScore(currentColumn)}
      </div>
      <div className="column grid grid-rows-3 gap-4 justify-center">
        <div className="cell">{!!currentColumn[0] ? currentColumn[0] : ""}</div>
        <div className="cell">{!!currentColumn[1] ? currentColumn[1] : ""}</div>
        <div className="cell">{!!currentColumn[2] ? currentColumn[2] : ""}</div>
      </div>
      {currentColumn.includes(0) && (
        <button
          className="bg-emerald-500 h-12 w-24 rounded-lg"
          onClick={() => handleColumnClick(columnIndex)}
        >
          +
        </button>
      )}
    </div>
  );
};

export default BoardColumn;
