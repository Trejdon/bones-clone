import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import PlayerBoard from "./PlayerBoard";
import DieRoll from "./DieRoll";
import Modal from "./Modal";
import {
  calculateBoardScore,
  rollDie,
  createUpdatedBoard,
  cancelOpponentBoard,
} from "./gameUtils";

export type MoveType = {
  playerId: string;
  columnSelected: number;
  roll: number;
};
export type ColumnType = number[];
export type BoardType = ColumnType[];

export type PlayerType = {
  id: string;
  name: string;
  isHuman: boolean;
  board: BoardType;
  score: number;
};

const App = () => {
  const [roll, setRoll] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);
  const [playerOneData, setPlayerOneData] = useState<PlayerType>({
    id: self.crypto.randomUUID(),
    name: "Player",
    board: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
    score: 0,
    isHuman: true,
  });
  const [playerTwoData, setPlayerTwoData] = useState<PlayerType>({
    id: self.crypto.randomUUID(),
    name: "Computer",
    board: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
    score: 0,
    isHuman: true,
  });
  const [status, setStatus] = useState(playerOneData.id);
  const [lastMove, setLastMove] = useState<MoveType | undefined>(undefined);
  const [winner, setWinner] = useState("");

  const PLAYERS = [playerOneData.id, playerTwoData.id];

  const handleRollDie = (): void => {
    setRoll(rollDie());
  };

  useEffect(() => {
    if (status === "PROCESSING") {
      // Update player score from lastMove object
      if (lastMove === undefined) {
        throw new Error("Error recording last move");
      }
      const isPlayerOne = playerOneData.id === lastMove?.playerId;
      const currentPlayerData = isPlayerOne
        ? { ...playerOneData }
        : { ...playerTwoData };
      const otherPlayerData = isPlayerOne
        ? { ...playerTwoData }
        : { ...playerOneData };
      const { board } = currentPlayerData;
      const currentPlayerUpdaterFn = isPlayerOne
        ? setPlayerOneData
        : setPlayerTwoData;
      const otherPlayerUpdaterFn = isPlayerOne
        ? setPlayerTwoData
        : setPlayerOneData;

      currentPlayerData.board = createUpdatedBoard(board, lastMove);
      currentPlayerData.score = calculateBoardScore(board);

      currentPlayerUpdaterFn(currentPlayerData);

      // Update the other player's board from lastMove object
      const otherPlayerUpdatedBoard = cancelOpponentBoard(
        [...otherPlayerData.board],
        lastMove
      );
      otherPlayerData.board = otherPlayerUpdatedBoard;
      otherPlayerData.score = calculateBoardScore(otherPlayerUpdatedBoard);

      otherPlayerUpdaterFn({ ...otherPlayerData });

      // Evaluate for win condition
      const hasZerosArr = currentPlayerData.board.map((column) =>
        column.includes(0)
      );

      if (!hasZerosArr.includes(true)) {
        setStatus("GAME_OVER");
        const highScore =
          currentPlayerData.score > otherPlayerData.score
            ? currentPlayerData.name
            : otherPlayerData.name;
        console.log(`Game over, ${highScore} wins`);
        setWinner(highScore);
        setShowModal(true);
      } else {
        // Update status for next player turn
        setStatus(PLAYERS.filter((player) => player !== lastMove.playerId)[0]);
      }
    }
  }, [status]);

  return (
    <div className="p-0 m-0 relative">
      <div id="game" className="grid grid-cols-3 h-screen">
        {/* Player one avatar, score, and dice roller */}
        <div className="flex flex-col justify-start items-center my-12">
          <DieRoll
            roll={roll}
            canRoll={status === playerOneData.id}
            handleRollDie={handleRollDie}
          />
          <div className="border-4 border-red-600 w-1/2 text-4xl text-center my-4">
            <div className="">{playerOneData.name}</div>
            <div className="">{playerOneData.score}</div>
          </div>
        </div>
        {/* Game boards for both players */}
        <div className="flex flex-col items-center justify-around bg-yellow-100">
          <PlayerBoard
            inverted={true}
            player={playerOneData}
            currentRoll={roll}
            setLastMove={setLastMove}
            setRoll={setRoll}
            setStatus={setStatus}
            status={status}
          />
          <PlayerBoard
            inverted={false}
            player={playerTwoData}
            currentRoll={roll}
            setLastMove={setLastMove}
            setRoll={setRoll}
            setStatus={setStatus}
            status={status}
          />
        </div>
        {/* Player two avatar, score, and dice roller */}
        <div className="flex flex-col-reverse items-center my-12">
          <DieRoll
            roll={roll}
            canRoll={status === playerTwoData.id}
            handleRollDie={handleRollDie}
          />
          <div className="border-4 border-red-600 w-1/2 text-4xl text-center mx-auto my-4">
            <div className="">{playerTwoData.name}</div>
            <div className="">{playerTwoData.score}</div>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal>
          <h2>{`${winner} wins!`}</h2>
          <button onClick={() => window.location.reload()} className="h-10 w-32 bg-red-800 rounded-lg">Play again</button>
        </Modal>
      )}
    </div>
  );
};

const root = createRoot(document.querySelector("#root")!);

root.render(<App />);
