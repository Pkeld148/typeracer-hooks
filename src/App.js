import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import SnippetSelector from "./components/SnippetSelector";

const initialGameState = {
  victory: false,
  startTime: null,
  endTime: null,
};

const App = () => {
  const buttonTextItems = [
    "Bears, beets, battlestar galactica",
    "Something easy to type",
    "Even easier",
  ];

  // function isValidKey(e)
  // {
  //   var charCode = e.keyCode || e.which;
  //   if (charCode == 8){

  //     console.log(e.code);
  //     return false;
  //   }
  //   return true;
  // }

  const [userText, setUserText] = useState("");
  const [snippet, setSnippet] = useState(null);
  const [gameState, setGameState] = useState(initialGameState);
  const [wins, setWins] = useState(0);
  const [gameMode, setGameMode] = useState("Normal");
  const [whatToType, setWhatToType] = useState(null);
  const [giveUp, setGiveUp] = useState(false);

  const [hasError, setErrors] = useState(false);
  const [films, setFilms] = useState([]);

  const inputRef = useRef();

  const difficulty = document.getElementById("difficulty");

  if (gameMode === "Hardcore") {
    window.onkeydown = function (event) {
      if (event.which == 8) {
        event.preventDefault(); // turn off browser transition to the previous page
        alert(
          "NO BACKSPACES ALLOWED! GUESS YOU NEED TO HIT THAT RESET BUTTON EH?"
        );
        setGiveUp(true);
      }
    };
  } else {
    window.onkeydown = function (event) {
      if (event.which == 8) {
        return true;
      }
    };
  }

  const updateUserText = (event) => {
    setUserText(event.target.value);

    if (gameMode === "Easy") {
      if (event.target.value.toLowerCase() === snippet.toLowerCase()) {
        setGameState({
          ...gameState,
          victory: true,
          endTime: Date.now() - gameState.startTime,
        });
      }
    } else if (gameMode === "Normal") {
      if (event.target.value === snippet) {
        setGameState({
          ...gameState,
          victory: true,
          endTime: Date.now() - gameState.startTime,
        });
      }
    } else if (gameMode === "Hard") {
      if (event.target.value === snippet) {
        setGameState({
          ...gameState,
          victory: true,
          endTime: Date.now() - gameState.startTime,
        });
      }
    } else if (gameMode === "Hardcore") {
      if (event.target.value === snippet) {
        setGameState({
          ...gameState,
          victory: true,
          endTime: Date.now() - gameState.startTime,
        });
      }
    }
  };

  const updateGameMode = (event) => {
    setGameMode(event.target.value);
  };

  const chooseSnippet = (selectedSnippet) => {
    setUserText("");

    if (gameMode === "Hard") {
      var shuffled = selectedSnippet
        .split("")
        .sort(function () {
          return 0.5 - Math.random();
        })
        .join("");
      setSnippet(shuffled);
    } else {
      setSnippet(selectedSnippet);
    }

    setGameState({ ...gameState, victory: false, startTime: Date.now() });
    inputRef.current.focus();
  };

  const resetGame = () => {
    setWhatToType(null);
    setUserText("");
    setSnippet(null);
    setGameState(initialGameState);
    setGiveUp(false);
    difficulty.selectedIndex = 1;
    setGameMode("Normal");
  };

  // useEffect(() => {
  //   if (gameState.victory) {
  //     document.title = "VICTORY!";
  //   }
  //   setWins(wins + 1);
  // }, [trigger]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(
      "https://ghibliapi.herokuapp.com/films?limit=3"
    );
    console.log(response);
    response
      .json()
      .then((response) => setFilms(response))
      .catch((err) => setErrors(err));
  };

  return (
    <div className="game">
      <h2>TypeRace</h2>
      <h2>Difficulty: {gameMode}</h2>

      <label form="difficulty">Choose a difficulty: </label>
      <select id="difficulty" name="difficulty" onChange={updateGameMode}>
        <option value="Easy">Easy</option>
        <option value="Normal" selected>
          Normal
        </option>
        <option value="Hard">Hard</option>
        <option value="Hardcore">Hardcore</option>
      </select>
      <SnippetSelector
        chooseSnippet={chooseSnippet}
        films={films}
        whatToType={whatToType}
        setWhatToType={setWhatToType}
      />
      <h3>{userText}</h3>
      <h3>Snippet: {snippet}</h3>
      <h3>Victory Time: {gameState.endTime}ms</h3>
      {/* {gameMode === "Hardcore" ? 
      <input value={userText} onkeydown="return isValidKey(event)" ref={inputRef} onChange={updateUserText} />

      } */}
      <input value={userText} ref={inputRef} onChange={updateUserText} />

      <div>
        {gameState.victory || giveUp ? (
          <>
            {/* <h1>WHOA GOOD JOB</h1> */}
            <button onClick={resetGame}>Reset Game?</button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default App;
