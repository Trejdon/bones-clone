import { FC } from "react";
import { MoveType, PlayerType } from "./App";
import BoardColumn from "./BoardColumn";
import DieRoll from "./DieRoll";

type PlayerBoardProps = {
  player: PlayerType;
  currentRoll: number;
  handleRollDie: () => void;
  setLastMove: React.Dispatch<React.SetStateAction<MoveType | undefined>>;
  setRoll: React.Dispatch<React.SetStateAction<number>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  status: string;
};

const PlayerBoard: FC<PlayerBoardProps> = ({
  player,
  currentRoll,
  handleRollDie,
  setLastMove,
  setRoll,
  setStatus,
  status,
}) => {
  const { board, id, score } = player;
  return (
    <div className="board">
      <DieRoll
        roll={currentRoll}
        canRoll={status === id}
        handleRollDie={handleRollDie}
      />
      <div className="grid grid-cols-3 gap-4 w-fit">
        {/* TODO: This doesn't smell right, need to find a better way to handle creating the "board" */}
        {board.map((column, index) => {
          return (
            <BoardColumn
              board={board}
              playerId={id}
              setStatus={setStatus}
              setRoll={setRoll}
              columnIndex={index}
              currentRoll={currentRoll}
              setLastMove={setLastMove}
              key={index}
            />
          );
        })}
      </div>
      <div className="player-score w-24 h-24 border-2 border-green-700 text-4xl text-center">
        {score}
      </div>
    </div>
  );
};

export default PlayerBoard;
