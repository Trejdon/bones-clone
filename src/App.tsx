import { useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Game from "./Game";
import Main from "./Main";


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
  return (
    <div className="p-0 m-0 relative">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/play" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

const root = createRoot(document.querySelector("#root")!);

root.render(<App />);
