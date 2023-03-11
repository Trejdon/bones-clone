import { useState } from "react";
import { createRoot } from "react-dom/client";
import PlayerBoard from "./PlayerBoard";
import { rollDie } from "./gameUtils";

const App = () => {
  const [roll, setRoll] = useState<number>(0);
  const [canRoll, setCanRoll] = useState<boolean>(true);
  const [playerOneBoard, setPlayerOneBoard] = useState<
    [number, number, number][]
  >([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const [playerTwoBoard, setPlayerTwoBoard] = useState<
    [number, number, number][]
  >([
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
        <div className="flex justify-around">
          <PlayerBoard
            board={playerOneBoard}
            canRoll={canRoll}
            currentRoll={roll}
            handleRollDie={handleRollDie}
            setCanRoll={setCanRoll}
            setPlayerBoard={setPlayerOneBoard}
            setRoll={setRoll}
          />
          <PlayerBoard
            board={playerTwoBoard}
            canRoll={canRoll}
            currentRoll={roll}
            handleRollDie={handleRollDie}
            setCanRoll={setCanRoll}
            setPlayerBoard={setPlayerTwoBoard}
            setRoll={setRoll}
          />
        </div>
      </div>
    </div>
  );
};

const root = createRoot(document.querySelector("#root")!);

root.render(<App />);
