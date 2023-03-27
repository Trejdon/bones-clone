import { FC, useState, useEffect } from "react";
import PlayerBoard from "./PlayerBoard";
import DieRoll from "./DieRoll";
import Modal from "./Modal";
import {
  calculateBoardScore,
  cancelOpponentBoard,
  coinFlip,
  createUpdatedBoard,
  rollDie,
  sleep,
} from "./gameUtils";

import { MoveType, PlayerType } from "./App";

const DEFAULT_PLAYER = {
  id: "",
  name: "",
  isHuman: true,
  board: [[]],
  score: 0,
};

const Game: FC = () => {
  const [roll, setRoll] = useState<number>(0);
  const [playerOneData, setPlayerOneData] =
    useState<PlayerType>(DEFAULT_PLAYER);
  const [playerTwoData, setPlayerTwoData] =
    useState<PlayerType>(DEFAULT_PLAYER);
  const [status, setStatus] = useState("INIT");
  const [lastMove, setLastMove] = useState<MoveType | undefined>(undefined);
  const [showModal, setShowModal] = useState(false);
  const [winner, setWinner] = useState("");
  const [players, setPlayers] = useState<string[]>(["", ""]);

  const handleRollDie = (): void => {
    setRoll(rollDie());
  };

  const initializeGame = () => {
    const p1ID = self.crypto.randomUUID();
    const p2ID = self.crypto.randomUUID();
    setRoll(0);
    setLastMove(undefined);
    setWinner("");
    setShowModal(false);
    setPlayerOneData({
      id: p1ID,
      name: "Player",
      board: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      score: 0,
      isHuman: true,
    });
    setPlayerTwoData({
      id: p2ID,
      name: "Computer",
      board: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      score: 0,
      isHuman: false,
    });
    const PLAYERS = [p1ID, p2ID];
    setPlayers(PLAYERS);
    setStatus(PLAYERS[coinFlip(0, 1)]);
  };

  useEffect(() => {
    initializeGame();
  }, []);

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
        setStatus(players.filter((player) => player !== lastMove.playerId)[0]);
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
        await sleep(2500);
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
    <div className="game-board">
      {/* Player one avatar, score, and dice roller */}
      <div className="player-col">
        <DieRoll
          roll={roll}
          canRoll={status === playerOneData.id}
          handleRollDie={handleRollDie}
        />
        <div className="total-score">
          <div className="">{playerOneData.name}</div>
          <div className="">{playerOneData.score}</div>
        </div>
      </div>
      {/* Game boards for both players */}
      <div className="board-col">
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
      <div className="player-col-rev">
        <DieRoll
          roll={roll}
          canRoll={status === playerTwoData.id}
          handleRollDie={handleRollDie}
        />
        <div className="total-score">
          <div className="">{playerTwoData.name}</div>
          <div className="">{playerTwoData.score}</div>
        </div>
      </div>
      {showModal && (
        <Modal>
          <h2>{`${winner} wins!`}</h2>
          <button onClick={initializeGame} className="h-10 w-32 btn">
            Play again
          </button>
        </Modal>
      )}
    </div>
  );
};

export default Game;
