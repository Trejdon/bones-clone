import { useState, FC, MouseEventHandler } from "react";
import { createRoot } from "react-dom/client";
import { rollDie } from "./gameUtils";

const App = () => {
  const [roll, setRoll] = useState<number>(0);
  const [canRoll, setCanRoll] = useState<boolean>(true);
  const [playerBoard, setPlayerBoard] = useState<number[][]>([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  const handleRollDie = (): void => {
    setRoll(rollDie());
    setCanRoll(false);
  };

  const handleColumnClick = (
    event: MouseEvent,
    board: number[][],
    columnIndex: number
  ): void => {
    event.preventDefault();
    const indexToUpdate = board[columnIndex].indexOf(0);
    const columnToUpdate = [...board[columnIndex]];
    const updatedBoard = [...playerBoard];

    console.log(this);

    columnToUpdate[indexToUpdate] = roll;
    board[columnIndex] = columnToUpdate;

    setPlayerBoard(updatedBoard);
    setRoll(0);
    setCanRoll(true);
  };

  // TODO: Migrate this component to its own file
  interface bCProps {
    board: number[][];
    handleClick: MouseEventHandler<HTMLButtonElement>;
    columnIndex: number;
  }

  const BoardColumn: FC<bCProps> = ({ board, handleClick, columnIndex }) => {
    const currentColumn = board[columnIndex];

    return (
      <div className="border-blue-600 border-2 w-44 flex flex-col items-center gap-4">
        <div className="column grid grid-rows-3 gap-4 justify-center">
          <div className="cell">
            {!!currentColumn[0] ? currentColumn[0] : ""}
          </div>
          <div className="cell">
            {!!currentColumn[1] ? currentColumn[1] : ""}
          </div>
          <div className="cell">
            {!!currentColumn[2] ? currentColumn[2] : ""}
          </div>
        </div>
        {currentColumn.includes(0) && (
          <button
            className="bg-emerald-500 h-12 w-24 rounded-lg"
            onClick={(event) => handleClick(event, board, columnIndex)}
          >
            Add
          </button>
        )}
      </div>
    );
  };
  // TODO: End migration

  return (
    <div className="p-0 m-0">
      <div id="game">
        <div className="board">
          <div
            id="die-roll"
            className="max-w-sm border-2 border-violet-900 rounded-sm h-32 flex flex-col justify-center items-center"
          >
            <div id="roll" className="text-4xl p-5">
              {roll > 0 && roll}
            </div>
            {canRoll && (
              <button
                className="bg-emerald-500 h-12 w-24 rounded-lg"
                onClick={handleRollDie}
              >
                Roll
              </button>
            )}
          </div>
          {/* <div className="border-blue-600 border-2 w-44 flex flex-col items-center gap-4">
            <div className="column grid grid-rows-3 gap-4 justify-center">
              <div className="cell">
                {!!playerBoard[0][0] ? playerBoard[0][0] : ""}
              </div>
              <div className="cell">
                {!!playerBoard[0][1] ? playerBoard[0][1] : ""}
              </div>
              <div className="cell">
                {!!playerBoard[0][2] ? playerBoard[0][2] : ""}
              </div>
            </div>
            {playerBoard[0].includes(0) && (
              <button
                className="bg-emerald-500 h-12 w-24 rounded-lg"
                onClick={() => handleColumnClick(playerBoard, 0)}
              >
                Add
              </button>
            )}
          </div> */}
          <BoardColumn
            board={playerBoard}
            handleClick={handleColumnClick}
            columnIndex={0}
          />
        </div>
      </div>
    </div>
  );
};

const root = createRoot(document.querySelector("#root")!);

root.render(<App />);
