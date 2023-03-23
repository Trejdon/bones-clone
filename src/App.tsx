import { useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Game from "./Game";
import Main from "./Main";
import Modal from "./Modal";

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
  const [showModal, setShowModal] = useState(false);
  const [winner, setWinner] = useState("");

  return (
    <div className="p-0 m-0 relative">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/play"
            element={<Game setShowModal={setShowModal} setWinner={setWinner} />}
          />
        </Routes>
      </BrowserRouter>
      {showModal && (
        <Modal>
          <h2>{`${winner} wins!`}</h2>
          <button
            onClick={() => window.location.reload()}
            className="h-10 w-32 bg-red-800 rounded-lg"
          >
            Play again
          </button>
        </Modal>
      )}
    </div>
  );
};

const root = createRoot(document.querySelector("#root")!);

root.render(<App />);
