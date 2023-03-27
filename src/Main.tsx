import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  return (
    <div className="main-container">
      <div className="logo-container">
        <img src="./bones-clone-logo.svg" alt="bones clone logo" />
      </div>
      <div className="desc-container">
        <p className="m-4 px-24">
          Bones clone is a two player dice rolling game with origins as a
          minigame created for the 2022 video game "Cult of the Lamb". I enjoyed
          the game so much I decided to create a web based clone as a side
          project. Checkout the video below to learn how to play and give it a
          try!
        </p>
      </div>
      <div className="vid-container">
        <iframe
          width="560"
          height="320"
          src="https://www.youtube.com/embed/y4PfvZiEs5E"
          title="How To Play Knucklebones"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <button
        className="h-12 w-40 btn text-xl text-white mt-4"
        onClick={() => navigate("/play")}
      >
        Play
      </button>
    </div>
  );
};

export default Main;
