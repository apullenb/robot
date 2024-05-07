import React from 'react'
import styled from 'styled-components';

function Controls({ move, rotate, report }) {
    return (
      <ControlRow>
        <div>
            <h3>Position Robot</h3>
            <p>Use the buttons below or the left and right arrow keys</p>
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
      </ControlRow>
    );
  }
export default Controls

const ControlRow = styled.div`
display: flex;
gap: 12px;
margin: 2px 0;
padding: 6px;

& div {
    border: 1px solid black;
    padding: 6px;

 h3 {
    font-size: 18px;
    margin: 2px 0;
}
p {
    margin: 2px 0;
}

button {
    padding: 3px 8px;
    background-color: #e0a884;
    margin: 1px 10px 1px 0;
    border: 1px solid gray;
    cursor: pointer;
    border-radius: 10px;
}

}

`