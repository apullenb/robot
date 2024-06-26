import React from 'react'
import styled from 'styled-components';

function Controls({ move, rotate, report }) {
    return (
      <ControlRow>
        <div>
            <h3>Position Robot</h3>
            <p>Use the buttons below or the left and right arrow keys</p>
          <button data-testid='left-btn' onClick={() => rotate('LEFT')}>rotate Left</button>
          <button data-testid='right-btn' onClick={() => rotate('RIGHT')}>rotate Right</button>
        </div>
        <div>
            <h3>Move the Robot</h3>
            <p>Use the button below or the Enter key</p>
          <button data-testid='move-btn' onClick={move}>move forward</button>
        </div>
        <div>
            <h3>Report Position</h3>
            <p>Use the R key or the button below</p>
          <button data-testid='report-btn' onClick={report}>report position</button>
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
flex-wrap:wrap;

& div {
    border: 1px solid black;
    padding: 6px;

 h3 {
    font-size: 18px;
    margin: 3% 0;
}
p {
    margin: 2px 0;
}

button {
    padding: 3px 7px;
    background-color: #e0a884;
    margin: 1px 10px 1px 0;
    border: 1px solid gray;
    cursor: pointer;
    border-radius: 10px;
}

}

`