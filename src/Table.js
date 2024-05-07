import React from 'react';
import './Table.css';
import back from './assets/robot-back.PNG'
import right from './assets/robot-right.PNG'
import left from './assets/robot-left.PNG'
import front from './assets/robot-front.PNG'
const images = {
  north: back,
  south: front,
  east: right,
  west: left,
};

function Table({ x, y, facing, handlePlace }) {
  const gridSize = 5;

  const isRobotAtCell = (row, column) => x === column && y === gridSize - row - 1;

  const renderCell = (row, column) => {
    return (
      <div
        key={`${row}-${column}`}
        className="cell"
        id={`${row}-${column}`}
        data-testid={`${row}-${column}`}
        onClick={() => handlePlace(column, gridSize - row - 1)}
      >
        {isRobotAtCell(row, column) && (
          <div className="robot">
            {facing && <img src={images[facing.toLowerCase()]} alt={facing} className="robot-icon" />}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="tabletop">
      {Array.from({ length: gridSize }).map((_, row) => (
        <div key={row} className="row">
          {Array.from({ length: gridSize }).map((_, column) => renderCell(row, column))}
        </div>
      ))}
    </div>
  );
}

export default Table;
