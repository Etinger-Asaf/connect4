const Cell = ({ play, columnIndex, value }) => {
  const clickHandler = () => {
    play(columnIndex);
  };
  return (
    <div className="square">
      <div className="circle" onClick={clickHandler} data-color={value}></div>
    </div>
  );
};

export default Cell;
