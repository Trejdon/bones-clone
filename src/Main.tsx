import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-yellow-100 text-black h-screen flex flex-col gap-4 items-center mx-48">
      <h1 className="text-5xl">🎲🦴 Bones Clone 🦴🎲</h1>
      <h3 className="text-2xl text-red-800 mt-2">
        Fancy a game of knucklebones?
      </h3>
      <p className="p-4">
        Knucklebones is a two player dice rolling game and its origin appears to
        be a minigame created for the 2022 video game "Cult of the Lamb".
        Players take turns rolling a die, then placing that die on their board
        to be scored. Multiple similar dice in the same column will drastically
        increase the score of that column. However, when a die is placed in a
        column, if your opponent currently has any dice of the SAME value in the
        SAME column on their board, those dice are removed from the board. This
        creates a game with an interesting risk/reward mechanic that increases
        the amount of strategy involved in winning.
      </p>
      <div className="embeddedVideo">
        <iframe
          width="600"
          height="360"
          src="https://www.youtube.com/embed/y4PfvZiEs5E"
          title="How To Play Knucklebones"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <div>
        <button
          className="h-10 w-32 bg-red-800 rounded-lg text-white mt-4"
          onClick={() => navigate("/play")}
        >
          Play
        </button>
      </div>
    </div>
  );
};

export default Main;
