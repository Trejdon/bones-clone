import { FC } from "react";
import { MoveType, PlayerType } from "./App";
import BoardColumn from "./BoardColumn";

type PlayerBoardProps = {
  inverted: boolean;
  player: PlayerType;
  currentRoll: number;
  setLastMove: React.Dispatch<React.SetStateAction<MoveType | undefined>>;
  setRoll: React.Dispatch<React.SetStateAction<number>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  status: string;
};

const PlayerBoard: FC<PlayerBoardProps> = ({
  inverted,
  player,
  currentRoll,
  setLastMove,
  setRoll,
  setStatus,
  status,
}) => {
  const { board, id, isHuman } = player;
  return (
    <div className="board">
      <div className="grid grid-cols-3 gap-2 w-fit">
        {board.map((column, index) => {
          return (
            <BoardColumn
              column={column}
              inverted={inverted}
              isHuman={isHuman}
              playerId={id}
              setStatus={setStatus}
              setRoll={setRoll}
              columnIndex={index}
              currentRoll={currentRoll}
              setLastMove={setLastMove}
              status={status}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PlayerBoard;
