import { FC } from "react";

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
      className="w-1/2 mx-auto border-8 border-gray-400 rounded-sm h-32 flex flex-col justify-center items-center bg-slate-700"
    >
      <div id="roll" className={`text-4xl p-5 ${rollClass}`}>
        {shouldDisplayRoll && (
          <img
            className="h-14 border-2 border-zinc-900 rounded-md bg-white"
            src={`./images/${roll}.svg`}
            alt="die roll"
          />
        )}
      </div>
      <button
        className={`h-10 w-20 bg-red-800 rounded-lg ${buttonClass}`}
        onClick={handleRollDie}
      >
        Roll
      </button>
    </div>
  );
};

export default DieRoll;
