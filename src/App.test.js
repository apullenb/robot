import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import Controls from './Controls';
import Table from './Table';
import '@testing-library/jest-dom';


function placeRobot() {
  fireEvent.click(screen.getByTestId('4-0')); 
}

function reportPosition() {
  fireEvent.keyDown(window, { key: 'r' });
}

function setupApp() {
  render(<App />);
  placeRobot();
}


test('renders Toy Robot Game', () => {
  setupApp();
  const heading = screen.getByText(/Toy Robot Game/i);
  expect(heading).toBeInTheDocument();
});

test('moves robot when pressing Enter key', () => {
  setupApp();
  fireEvent.keyDown(window, { key: 'Enter' });
  reportPosition();
  const newMessage = screen.getByText(/Robot Position: 0, 1, NORTH/i);
  expect(newMessage).toBeInTheDocument();
});

test('rotates robot when pressing left and right arrow keys', () => {
  setupApp();
  fireEvent.keyDown(window, { key: 'ArrowLeft' });
  reportPosition();
  const newMessageLeft = screen.getByText(/Robot Position: 0, 0, WEST/i);
  expect(newMessageLeft).toBeInTheDocument();

  fireEvent.keyDown(window, { key: 'ArrowRight' });
  reportPosition();
  const newMessageRight = screen.getByText(/Robot Position: 0, 0, NORTH/i);
  expect(newMessageRight).toBeInTheDocument();
});

test('displays error when moving out of bounds', () => {
  setupApp();
  for (let i = 0; i < 5; i++) {
    fireEvent.keyDown(window, { key: 'Enter' });
  }

  fireEvent.keyDown(window, { key: 'Enter' });
  const errorMessage = screen.getByText(/Error: Robot can't move beyond the boundary/i);
  expect(errorMessage).toBeInTheDocument();
});


test('renders Controls component', () => {
  const move = jest.fn();
  const rotate = jest.fn();
  const report = jest.fn();

  render(<Controls move={move} rotate={rotate} report={report} />);

  const rotateLeftButton = screen.getByTestId('left-btn');
  const rotateRightButton = screen.getByTestId('right-btn');
  const moveButton = screen.getByTestId('move-btn');
  const reportButton = screen.getByTestId('report-btn');

  expect(rotateLeftButton).toBeInTheDocument();
  expect(rotateRightButton).toBeInTheDocument();
  expect(moveButton).toBeInTheDocument();
  expect(reportButton).toBeInTheDocument();
});

test('invokes appropriate functions on button clicks in Controls', () => {
  const move = jest.fn();
  const rotate = jest.fn();
  const report = jest.fn();

  render(<Controls move={move} rotate={rotate} report={report} />);

  fireEvent.click(screen.getByTestId('left-btn'));
  expect(rotate).toHaveBeenCalledWith('LEFT');

  fireEvent.click(screen.getByTestId('right-btn'));
  expect(rotate).toHaveBeenCalledWith('RIGHT');

  fireEvent.click(screen.getByTestId('move-btn'));
  expect(move).toHaveBeenCalled();

  fireEvent.click(screen.getByTestId('report-btn'));
  expect(report).toHaveBeenCalled();
});


test('renders Table component', () => {
  const handlePlace = jest.fn();
  render(<Table x={0} y={0} facing="NORTH" handlePlace={handlePlace} />);

  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      const cell = screen.getByTestId(`${row}-${col}`);
      expect(cell).toBeInTheDocument();
    }
  }
});

test('clicking on Table cell calls handlePlace', () => {
  const handlePlace = jest.fn();
  render(<Table x={0} y={0} facing="NORTH" handlePlace={handlePlace} />);
  const cell = screen.getByTestId('4-0');
  fireEvent.click(cell);
  expect(handlePlace).toHaveBeenCalledWith(0, 0);
});
