import React from "react";
import { createRoot } from "react-dom/client";

const App = () => {
  return (
    <div>
      <h1>Holy shit it works</h1>
    </div>
  );
};

const root = createRoot(document.querySelector("#root")!);

root.render(<App />);
