import { useEffect, useState } from "react";

let globalState = {}; // Data
let listeners = []; // contains ".set" functions for the "globalState"
let actions = {}; // functions

// true = [setState] => render
// false = not render
export const useStore = (shouldListen = true) => {
  const setState = useState(globalState)[1]; // [1] => [state, setState] (to get "setState" function)

  const dispatch = (actionIdenfifier, payload) => {
    const newState = actions[actionIdenfifier](globalState, payload); //

    globalState = { ...globalState, ...newState }; // update State

    for (const listener of listeners) {
      listener(globalState); // listener => contain setState() function
    }
  };

  // useEffect => to register only 1 ".set" effect
  useEffect(() => {
    if (shouldListen) {
      listeners.push(setState); // Add setState Function to "listeners"
    }

    return () => {
      if (shouldListen) {
        listeners = listeners.filter((li) => li !== setState); // Clear .set Function from "listeners"
      }
    };
  }, [setState, shouldListen]); // "set" always runs once

  return [globalState, dispatch];
};

// Return Updated Data & Actions (functions)
export const initStore = (userActions, initialState) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
  }

  actions = { ...actions, ...userActions };
};
