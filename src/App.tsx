import React from "react";
import "./App.css";
import Memory from "./memory-game";
import balloon from "./images/balloon.jpeg";
import bike from "./images/bike.jpeg";
import butterfly from "./images/butterfly.jpeg";
import elephant from "./images/elephant.jpeg";
import eyes from "./images/eyes.jpeg";
import gift from "./images/gift.jpeg";
import tiger from "./images/tiger.jpeg";
import tulips from "./images/tulips.jpeg";
import _ from "lodash";

function App() {
  var images:string[]= _.shuffle([balloon, bike, butterfly, elephant, eyes, gift, tiger, tulips, balloon, bike, butterfly, elephant, eyes, gift, tiger, tulips])

  return (
    <Memory images={images}/>
  );
}

export default App;
