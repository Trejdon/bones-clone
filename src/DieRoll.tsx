import { FC } from 'react';

type DieRollProps = {
  roll: number;
  canRoll: boolean;
  handleRollDie: () => void;
};

const DieRoll: FC<DieRollProps> = ({ roll, canRoll, handleRollDie }) => {
  return (
    <div
      id="die-roll"
      className="max-w-sm border-2 border-violet-900 rounded-sm h-32 flex flex-col justify-center items-center"
    >
      <div id="roll" className="text-4xl p-5">
        {roll > 0 && roll}
      </div>
      {canRoll && (
        <button
          className="bg-emerald-500 h-12 w-24 rounded-lg"
          onClick={handleRollDie}
        >
          Roll
        </button>
      )}
    </div>
  );
};

export default DieRoll;