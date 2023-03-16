import { FC } from "react";
import { MoveType, ColumnType } from "./App";
import Cell from "./Cell";
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
      <div className="h-10 w-12 text-black text-2xl flex justify-center items-center">
        {calculateColumnScore(column)}
      </div>
      <div className="grid grid-rows-3 gap-2 justify-center">
        {column.map((value, index) => {
          const count =
            column.filter((element) => element === value).length - 1;
          return <Cell value={value} count={count} key={index} />;
        })}
      </div>
      <div className="h-12">
        {showButton && (
          <button
            className={`bg-red-800 h-10 w-20 rounded-lg ${hiddenClass}`}
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
