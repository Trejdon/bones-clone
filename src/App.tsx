import { useState } from "react";
import { createRoot } from "react-dom/client";
import BoardColumn from "./BoardColumn";
import { rollDie } from "./gameUtils";

const App = () => {
  const [roll, setRoll] = useState<number>(0);
  const [canRoll, setCanRoll] = useState<boolean>(true);
  const [playerBoard, setPlayerBoard] = useState<[number, number, number][]>([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  const handleRollDie = (): void => {
    setRoll(rollDie());
    setCanRoll(false);
  };

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
          <div className="grid grid-cols-3 gap-4 w-fit">
            {/* TODO: This doesn't smell right, need to find a better way to handle creating the "board" */}
            {playerBoard.map((column, index) => {
              return (
                <BoardColumn
                  board={playerBoard}
                  setCanRoll={setCanRoll}
                  setRoll={setRoll}
                  columnIndex={index}
                  currentRoll={roll}
                  setPlayerBoard={setPlayerBoard}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const root = createRoot(document.querySelector("#root")!);

root.render(<App />);
