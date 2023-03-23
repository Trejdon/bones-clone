import { FC, useState, useEffect } from "react";
import PlayerBoard from "./PlayerBoard";
import DieRoll from "./DieRoll";
import {
  calculateBoardScore,
  cancelOpponentBoard,
  coinFlip,
  createUpdatedBoard,
  rollDie,
  sleep,
} from "./gameUtils";

import { MoveType, PlayerType, BoardType } from "./App";

type GameProps = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setWinner: React.Dispatch<React.SetStateAction<string>>;
};

const Game: FC<GameProps> = ({ setShowModal, setWinner }) => {
  const [roll, setRoll] = useState<number>(0);
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
    isHuman: false,
  });
  const [status, setStatus] = useState(playerOneData.id);
  const [lastMove, setLastMove] = useState<MoveType | undefined>(undefined);

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

        setWinner(highScore);
        setShowModal(true);
      } else {
        // Update status for next player turn
        setRoll(0);
        setStatus(PLAYERS.filter((player) => player !== lastMove.playerId)[0]);
      }
    }

    if (!playerTwoData.isHuman && status === playerTwoData.id) {
      const aiRollAndSelection = async () => {
        const randColSelection = playerTwoData.board.reduce(
          (result, currentColumn, currentIndex) => {
            const colHasEmpty = currentColumn.includes(0);
            if (colHasEmpty && result === 3) {
              return currentIndex;
            } else if (colHasEmpty) {
              return coinFlip(result, currentIndex);
            } else {
              return result;
            }
          },
          3
        );

        const dieRoll = rollDie();
        setRoll(dieRoll);
        await sleep(3000);
        setLastMove({
          playerId: playerTwoData.id,
          columnSelected: randColSelection,
          roll: dieRoll,
        });
        setStatus("PROCESSING");
      };

      aiRollAndSelection();
    }
  }, [status]);

  return (
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
  );
};

export default Game;
