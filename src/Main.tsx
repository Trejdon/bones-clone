import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-yellow-100 text-black h-screen flex flex-col gap-2 items-center mx-48">
      <div className="bg-black w-full flex justify-center h-40 border-b-red-800 border-b-8">
        <img src="./public/bones-clone-logo.svg" alt="bones clone logo" />
      </div>
      <div className="bg-slate-700 m-2 border-4 border-black text-white rounded-lg">
        <p className="m-4 px-24">
          Bones clone is a two player dice rolling game with origins as a
          minigame created for the 2022 video game "Cult of the Lamb". I enjoyed
          the game so much I decided to create a web based clone as a side
          project. Checkout the video below to learn how to play and give it a
          try!
        </p>
      </div>
      <div className="bg-slate-700 p-4 border-4 border-black text-white rounded-lg">
        <iframe
          width="560"
          height="320"
          src="https://www.youtube.com/embed/y4PfvZiEs5E"
          title="How To Play Knucklebones"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <div>
        <button
          className="h-12 w-40 bg-red-800 rounded-lg text-xl text-white mt-4"
          onClick={() => navigate("/play")}
        >
          Play
        </button>
      </div>
    </div>
  );
};

export default Main;
