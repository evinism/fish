import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import App from './App';

const dt = 50;

const testArray = [
  {x: 50, y:50},
  {x: 25, y:25},
  {x: 75, y:75},
  {x: 50, y:50},
  {x: 25, y:25},
  {x: 75, y:75},
  {x: 50, y:50},
  {x: 25, y:25},
  {x: 75, y:75}
];


// ----

// should probs be converted to pure fn.
function ensureTypeValidity(fn){
  const fish = fn(testArray[0], testArray, dt);
  assertType(fish.x, 'number');
  assertType(fish.y, 'number');
  if(isNaN(fish.x + fish.y)){
    throw 'NAN error';
  }
}

function assertType(value, type){
  if (typeof value !== type) {
    throw 'Type Error';
  }
}


// ----

let setOfFish = testArray;

function propagateNewSource(src){
  try {
    const updateCandidate = new Function('fish', 'fishArray', 'timeDelta', src);
    ensureTypeValidity(updateCandidate);
    updateFish = updateCandidate;
    return {
      success: true
    };
  } catch (e){
    console.log(e);
    return {
      success: false,
      error: e,
    };
  }
}

let updateFish = (fish, fishArray, timeDelta) => {
  return { x: fish.x + 5, y: fish.y }
};

function tickEnv(){
  setOfFish = setOfFish.map((curValue, _, array) =>
    updateFish(
      Object.assign({}, curValue),
      array,
      dt
    )
  );
  ReactDOM.render(<App fish={setOfFish} propagateNewSource={propagateNewSource} />, $('#react-mount')[0]);
}

$(document).ready(() => {
  setInterval(
    tickEnv,
    dt
  );
});
