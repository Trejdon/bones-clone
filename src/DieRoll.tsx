import { FC } from "react";
import 'animate.css';


type DieRollProps = {
  roll: number;
  canRoll: boolean;
  handleRollDie: () => void;
};

const DieRoll: FC<DieRollProps> = ({ roll, canRoll, handleRollDie }) => {
  const shouldDisplayRoll = canRoll && roll > 0;
  const rollClass = shouldDisplayRoll ? "" : "hidden";
  const shouldDisplayButton = canRoll && roll === 0;
  const buttonClass = shouldDisplayButton ? "" : "hidden";
  return (
    <div
      id="die-roll"
      className="w-1/2 mx-auto border-4 border-gray-400 rounded-lg h-28 flex flex-col justify-center items-center bg-slate-700"
    >
      <div id="roll" className={`text-4xl p-5 ${rollClass}`}>
        {shouldDisplayRoll && (
          <img
            className="h-14 inline-block border-2 border-zinc-900 rounded-md bg-white animate__animated animate__rollIn"
            src={`./${roll}.svg`}
            alt="die roll"
          />
        )}
      </div>
      <button
        className={`h-10 w-20 btn ${buttonClass}`}
        onClick={handleRollDie}
      >
        Roll
      </button>
    </div>
  );
};

export default DieRoll;
