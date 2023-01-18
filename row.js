import Cell from "./src/components/boardCell";

function Row({ row, play }) {
  const board = row.map((cell, i) => {
    return <Cell key={i} value={cell} columnIndex={i} play={play} />;
  });
  return <div className="row">{board}</div>;
}
export default Row;
