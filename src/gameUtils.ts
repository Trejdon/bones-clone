import { BoardType, ColumnType, MoveType } from "./App";

export const rollDie = (): number => {
  return Math.floor(Math.random() * 6 + 1);
};

export const scoreRollTuple = (rollTuple: [number, number]): number => {
  const [value, count] = rollTuple;

  if (count === 1) {
    return value;
  } else {
    const tmp = new Array(count);
    tmp.fill(value);
    const tmpSum = tmp.reduce((acc, curVal) => acc + curVal, 0);
    return tmpSum * count;
  }
};

export const calculateColumnScore = (columnArr: ColumnType): number => {
  const uniqueArr = [...new Set(columnArr)];
  const tupleArr: [number, number][] = uniqueArr.map((value) => {
    const count = columnArr.filter((element) => element === value).length;
    return [value, count];
  });

  const score = tupleArr.reduce((acc, currVal) => {
    return acc + scoreRollTuple(currVal);
  }, 0);

  return score;
};

export const calculateBoardScore = (board: BoardType): number => {
  const columnScoreArr = board.map((column: ColumnType) =>
    calculateColumnScore(column)
  );
  const total = columnScoreArr.reduce((score, total) => score + total, 0);

  return total;
};

export const createUpdatedBoard = (board: BoardType, move: MoveType) => {
  const columnToUpdate: ColumnType = [...board[move.columnSelected]];
  const indexToUpdate = columnToUpdate.indexOf(0);
  columnToUpdate[indexToUpdate] = move.roll;
  board[move.columnSelected] = columnToUpdate;
  return board;
};

export const cancelOpponentBoard = (
  board: BoardType,
  move: MoveType
): BoardType => {
  const { roll, columnSelected } = move;
  const columnToUpdate: ColumnType = [...board[columnSelected]];
  const mappedColumn: ColumnType = columnToUpdate.map((element) =>
    element === roll ? 0 : element
  );
  board[columnSelected] = mappedColumn;

  return board;
};
