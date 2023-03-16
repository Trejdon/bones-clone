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
    <div className={`flex ${flexDir} items-center gap-2`}>
      <div className="h-12 w-12 text-black text-3xl text-center">
        {calculateColumnScore(column)}
      </div>
      <div className="grid grid-rows-3 gap-4 justify-center">
        <div className="cell">
          {!!column[0] && (
            <img
              className="h-16 border-2 border-zinc-900 rounded-md bg-white"
              src={`./images/${column[0]}.svg`}
              alt="die roll"
            />
          )}
        </div>
        <div className="cell">
          {!!column[1] && (
            <img
              className="h-16 border-2 border-zinc-900 rounded-md bg-white"
              src={`./images/${column[1]}.svg`}
              alt="die roll"
            />
          )}
        </div>
        <div className="cell">
          {!!column[2] && (
            <img
              className="h-16 border-2 border-zinc-900 rounded-md bg-white"
              src={`./images/${column[2]}.svg`}
              alt="die roll"
            />
          )}
        </div>
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
