import { FC } from "react";

const BG_COLORS = ["bg-white", "bg-yellow-200", "bg-blue-400"];

type CellProps = {
  value: number;
  count: number;
};

const Cell: FC<CellProps> = ({ value, count }) => {
  const bgColor: string = BG_COLORS[count];
  return (
    <div className="cell">
      {!!value && (
        <img
          className={`h-14 border-2 border-zinc-900 rounded-md ${bgColor}`}
          src={`./images/${value}.svg`}
          alt="die roll"
        />
      )}
    </div>
  );
};

export default Cell;
