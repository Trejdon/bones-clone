import { FC } from "react";
import { MoveType, ColumnType } from "./App";
import { calculateColumnScore } from "./gameUtils";

type BoardColumnProps = {
  column: ColumnType;
  columnIndex: number;
  currentRoll: number;
  isHuman: boolean;
  inverted: boolean;
  playerId: string;
  status: string;
  setLastMove: React.Dispatch<React.SetStateAction<MoveType | undefined>>;
  setRoll: React.Dispatch<React.SetStateAction<number>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
};

const BoardColumn: FC<BoardColumnProps> = ({
  column,
  columnIndex,
  currentRoll,
  playerId,
  isHuman,
  inverted,
  setLastMove,
  setRoll,
  setStatus,
  status,
}) => {
  const handleColumnClick = (index: number): void => {
    setLastMove({
      playerId,
      columnSelected: index,
      roll: currentRoll,
    });
    setRoll(0);
    setStatus("PROCESSING");
  };
  const flexDir = inverted ? "flex-col-reverse" : "flex-col";
  const hiddenClass = status === playerId ? "" : "hidden";
  const showButton = isHuman && currentRoll !== 0 && column.includes(0);

  return (
    <div className={`flex ${flexDir} items-center gap-4`}>
      <div className="h-12 w-12 border-red-500 border-2 text-black text-2xl text-center">
        {calculateColumnScore(column)}
      </div>
      <div className="grid grid-rows-3 gap-4 justify-center">
        <div className="cell">{!!column[0] && column[0]}</div>
        <div className="cell">{!!column[1] && column[1]}</div>
        <div className="cell">{!!column[2] && column[2]}</div>
      </div>
      <div className="h-12">
        {showButton && (
          <button
            className={`bg-red-800 h-12 w-24 rounded-lg ${hiddenClass}`}
            onClick={() => handleColumnClick(columnIndex)}
          >
            +
          </button>
        )}
      </div>
    </div>
  );
};

export default BoardColumn;
