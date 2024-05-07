import { useState, useEffect } from 'react';
import Table from './Table';
import Controls from './Controls';
import styled from 'styled-components';


function App() {
  const [position, setPosition] = useState({ x: null, y: null, facing: null });
  const [reportMessage, setReportMessage] = useState(' ');

  const Message = styled.p`
  margin: 8px;
  font-size: 17px;
  color: ${reportMessage.includes('Error') ? 'white' : 'gray'};
  text-align: center;
  padding: 5px;
  font-weight: 600;
  background-color: ${reportMessage.includes('Error') ? 'red' : 'white'};
  width: 97%;
  min-height: 20px;
  `
  const handlePlace = (x, y) => {
    if (x >= 0 && x < 5 && y >= 0 && y < 5) {
      setPosition({ x, y, facing: 'NORTH' });
    }
  };

  const move = () => {
    setReportMessage(' ');
    if (position.x === null || position.y === null || position.facing === null) return;

    let { x, y, facing } = position;

    switch (facing) {
        case 'NORTH':
            if (y < 4) {
                setPosition({ x, y: y + 1, facing });
            } else {
                setReportMessage("Error: Robot can't move beyond the boundary to the NORTH.");
            }
            break;
        case 'SOUTH':
            if (y > 0) {
                setPosition({ x, y: y - 1, facing });
            } else {
                setReportMessage("Error: Robot can't move beyond the boundary to the SOUTH.");
            }
            break;
        case 'EAST':
            if (x < 4) {
                setPosition({ x: x + 1, y, facing });
            } else {
                setReportMessage("Error: Robot can't move beyond the boundary to the EAST.");
            }
            break;
        case 'WEST':
            if (x > 0) {
                setPosition({ x: x - 1, y, facing });
            } else {
                setReportMessage("Error: Robot can't move beyond the boundary to the WEST.");
            }
            break;
        default:
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
    setReportMessage(' ');
  };

  const report = () => {
    if (position.x !== null && position.y !== null && position.facing !== null) {
      setReportMessage(`Robot Position: ${position.x}, ${position.y}, ${position.facing}`);
    }
  };

  const handleKeyDown = (event) => {
    setReportMessage(' ');
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
    <Game>
       <Message>{reportMessage}</Message>
      <Table
        x={position.x}
        y={position.y}
        facing={position.facing}
        handlePlace={handlePlace}
      />
      <h2>Game Controls</h2>
      <Controls move={move} rotate={rotate} report={report} />
    </Game>
    </div>
  );
}


export default App;

const Game = styled.div`
margin: 5px 13%;
display: flex;
flex-direction: column;
align-items: center;
border: 1px solid black;
background-color: white;

h2 {
  margin: 2px 0;
  font-size: 22px;
}
`


