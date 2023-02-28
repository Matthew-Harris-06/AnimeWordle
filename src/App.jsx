import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./App.css";
import {
  Button,
  Container,
  ListGroup,
  Navbar,
  NavbarBrand,
} from "react-bootstrap";
import Keyboard from "../components/keyboard";

function App() {
  const arrayg = [1, 2, 3, 4, 5];
  const guesses = [1, 2, 3, 4, 5, 6];
  let wordIndex = 0;
  let letterIndex = 0;
  let letter;
  const wordofDay = "GOHAN";
  const wordofDayArray = [...wordofDay];
  const [words, setWords] = useState([[], [], [], [], [], []]);
  const topRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const middleRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const bottomRow = ["Z", "X", "C", "V", "B", "N", "M"];

  const [buttonStates, setButtonStates] = useState(
    topRow.concat(middleRow, bottomRow).reduce((result, letter) => {
      result[letter] = { state: "secondary" };
      return result;
    }, {})
  );
  console.log(buttonStates);

  const handler = (event) => {
    if (event.isComposing || event.keyCode === 229) {
      return;
    }
    event.stopPropagation();
    if (words[wordIndex].length + 1 == 6 && event.keyCode != 13) {
      return;
    }
    //DeleteCharacter
    if (event.keyCode == 8) {
      let copy = [...words];
      copy[wordIndex].pop();
      setWords(copy);
      return;
    }
    if (event.keyCode == 13) {
      //Enter was Pressed
      setButtonStates(buttonStates);

      if (words.length < 5) {
        return;
      }
      let answer = words[wordIndex].join("");
      if (answer == wordofDay) {
        //Correct Answer
        [0, 1, 2, 3, 4].map((val) => {
          document.getElementById([wordIndex, val].join("")).className =
            "successDiv";
        });
        return;
      } else {
        //Incorrect Answer
        wordofDayArray.map((val, index) => {
          console.log(val);
          if (answer.includes(val)) {
            if (answer.indexOf(val) == index) {
              console.log(val + " is in the right place");
              let copy = buttonStates;
              copy[val].state = "success";
              setButtonStates(copy);
              document.getElementById(
                [wordIndex, answer.indexOf(val)].join("")
              ).style.backgroundColor = "#69a832";
              console.log(buttonStates);
            } else {
              document.getElementById(
                [wordIndex, answer.indexOf(val)].join("")
              ).style.backgroundColor = "#a89e32";
              let copy = buttonStates;
              copy[val].state = "warning";
              setButtonStates(copy);
            }
          }
        });
        let copy = buttonStates;
        [...answer].map((char,index) => {
          if (!wordofDay.includes(char)) {
            copy[char].state = "dark";
            document.getElementById([wordIndex,index].join("")).style.borderColor = 'black'
            document.getElementById([wordIndex,index].join("")).style.borderWidth = '4px'

          }
        });
        wordIndex += 1;
        setButtonStates(copy);
        return;
      }
    }
    //EndofLine

    //Adding Ltter

    letter = event.key.toUpperCase();
    if (wordofDay.includes(letter)) {
      console.log(wordofDay.indexOf(letter));
    }
    let copy = [...words];

    copy[wordIndex].push(letter);

    setWords(copy);
    return () => {
      removeEventListener("keydown", this);
    };
  };
  useEffect(() => {
    addEventListener("keydown", handler);
  }, []);
  return (
    <div id="wholePage">
      <Navbar fixed="top" variant="light" bg="light">
        <Container>
          <NavbarBrand>
            <Navbar.Text >Anime Wordle</Navbar.Text>
          </NavbarBrand>
        </Container>
      </Navbar>
      <div id="titleSpan">
        <h1>ANIME WORDLE</h1>
      </div>
      <div className="AlltheWords">
        {guesses.map((val, index1) => {
          return (
            <div className="topWord">
              {arrayg.map((val, index2) => {
                return (
                  <div className="wordDivs" id={[index1, index2].join("")}>
                    {words[index1][index2]}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <Keyboard buttonStates={buttonStates}></Keyboard>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
        integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
        crossorigin="anonymous"
      />
    </div>
  );
}

export default App;
