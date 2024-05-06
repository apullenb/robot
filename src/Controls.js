import React from 'react'

function Controls({ move, rotate, report }) {
    return (
      <div>
        <div>
            <h3>Position Robot</h3>
            <p>use the buttons below or the left and right arrow keys</p>
          <button onClick={() => rotate('LEFT')}>Rotate Left</button>
          <button onClick={() => rotate('RIGHT')}>Rotate Right</button>
        </div>
        <div>
            <h3>Move the Robot</h3>
            <p>Use the button below or the Enter key</p>
          <button onClick={move}>Move Forward</button>
        </div>
        <div>
            <h3>Report Position</h3>
            <p>Use the R key or the button below</p>
          <button onClick={report}>Report Position</button>
        </div>
      </div>
    );
  }
export default Controls