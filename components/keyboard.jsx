import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./keyboard.css";
const Keyboard = (props) => {
  const topRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const middleRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const bottomRow = ["Z", "X", "C", "V", "B", "N", "M"];

  

  return (
    <>
      <div className="keyboard">
        <div className="Toprow">
          {topRow.map((value) => {
            return (
              <Button
                onClick={(event) => {
                  dispatchEvent(new KeyboardEvent("keydown", { key: value }));
                  
                }}
                value={value}
                size="lg"
                className="topButtons"
                variant={props.buttonStates[value].state}
              >
                {value}
              </Button>
            );
          })}
        </div>
        <div className="Middlerow">
          {middleRow.map((value) => {
            return (
              <Button
                onClick={(event) => {
                  dispatchEvent(new KeyboardEvent("keydown", { key: value }));
                }}
                value={value}
                size="lg"
                className="middleButtons"
                variant={props.buttonStates[value].state}
              >
                {value}
              </Button>
            );
          })}
        </div>
        <div className="Bottomrow">
          <Button
            variant="dark"
            onClick={() => {
              dispatchEvent(new KeyboardEvent("keydown", { keyCode: 8 }));
            }}
          >
            Back
          </Button>
          {bottomRow.map((value, index) => {
            return (
              <Button
                id={["button", value].join("")}
                value={value}
                size="lg"
                className="bottomButtons"
                variant={props.buttonStates[value].state}
                onClick={(event) => {
                  dispatchEvent(new KeyboardEvent("keydown", { key: value }));
                }}
              >
                {value}
              </Button>
            );
          })}
          <Button
            variant="dark"
            onClick={() => {
              dispatchEvent(new KeyboardEvent("keydown", { keyCode: 13 }));
            }}
          >
            Enter
          </Button>
        </div>
      </div>
    </>
  );
};
export default Keyboard;
