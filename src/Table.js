import React from 'react';
import './Table.css';

const images = {
  north: '/robot-back.PNG',
  south: '/robot-front.PNG',
  east: '/robot-right.PNG',
  west: '/robot-left.PNG',
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
