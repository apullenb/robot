import { useState, useEffect } from 'react';
import Table from './Table';
import Controls from './Controls';


function App() {
  const [position, setPosition] = useState({ x: null, y: null, facing: null });
  const [reportMessage, setReportMessage] = useState('');

  const handlePlace = (x, y) => {
    if (x >= 0 && x < 5 && y >= 0 && y < 5) {
      setPosition({ x, y, facing: 'NORTH' });
    }
  };

  const move = () => {
    setReportMessage('');
    if (position.x === null || position.y === null || position.facing === null) return;

    let { x, y, facing } = position;

    switch (facing) {
        case 'NORTH':
            if (y < 4) {
                setPosition({ x, y: y + 1, facing });
            } else {
                setReportMessage("Robot can't move beyond the boundary to the NORTH.");
            }
            break;
        case 'SOUTH':
            if (y > 0) {
                setPosition({ x, y: y - 1, facing });
            } else {
                setReportMessage("Robot can't move beyond the boundary to the SOUTH.");
            }
            break;
        case 'EAST':
            if (x < 4) {
                setPosition({ x: x + 1, y, facing });
            } else {
                setReportMessage("Robot can't move beyond the boundary to the EAST.");
            }
            break;
        case 'WEST':
            if (x > 0) {
                setPosition({ x: x - 1, y, facing });
            } else {
                setReportMessage("Robot can't move beyond the boundary to the WEST.");
            }
            break;
    }
  };

  const rotate = (direction) => {
    if (!position.facing) return;

    const directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
    let currentDirectionIndex = directions.indexOf(position.facing);

    if (direction === 'LEFT') {
      currentDirectionIndex = (currentDirectionIndex + 3) % 4;
    } else if (direction === 'RIGHT') {
      currentDirectionIndex = (currentDirectionIndex + 1) % 4;
    }

    setPosition({ ...position, facing: directions[currentDirectionIndex] });
    setReportMessage('');
  };

  const report = () => {
    if (position.x !== null && position.y !== null && position.facing !== null) {
      setReportMessage(`Robot Position: ${position.x},${position.y},${position.facing}`);
    }
  };

  const handleKeyDown = (event) => {
    setReportMessage('');
    switch (event.key) {
      case 'ArrowUp':
        move();
        break;
      case 'ArrowLeft':
        rotate('LEFT');
        break;
      case 'ArrowRight':
        rotate('RIGHT');
        break;
      case 'Enter':
        move();
        break;
      case 'r':
        report();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [position]);

  return (
    <div>
      <h1>Toy Robot Game</h1>
      <Table
        x={position.x}
        y={position.y}
        facing={position.facing}
        handlePlace={handlePlace}
      />
       {reportMessage && <p>{reportMessage}</p>}
      <Controls move={move} rotate={rotate} report={report} />
     
    </div>
  );
}


export default App;
