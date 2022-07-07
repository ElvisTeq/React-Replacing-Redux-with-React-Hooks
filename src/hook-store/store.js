import { useEffect, useState } from "react";

let globalState = {}; // Data
let listeners = []; // contains ".set" functions for the "globalState"
let actions = {}; // functions

export const useStore = () => {
  const setState = useState(globalState)[1]; // [1] => [state, setState] (to get "setState" function)

  const dispatch = (actionIdenfifier, payload) => {
    const newState = actions[actionIdenfifier](globalState, payload);
    globalState = { ...globalState, ...newState };

    for (const listener of listeners) {
      listener(globalState); // listener => contain setState() function
    }
  };

  useEffect(() => {
    listeners.push(setState); // Add setState Function to "listeners"

    return () => {
      listeners = listeners.filter((li) => li !== setState); // Remove setState Function from "listeners"
    };
  }, [setState]); // "set" always runs once

  return [globalState, dispatch];
};

// Return Updated Data & Actions (functions)
export const initStore = (userActions, initialState) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
  }

  actions = { ...actions, ...userActions };
};
