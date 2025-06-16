/* This class provides the rotor functionality. */

import { charToNum, numToChar} from "./enigma-util";

export default class Rotor {
  name: string; 
  wiring: string; 
  alphabet: string; 
  alphabetLength: number; 
  currentPosition: number;
  turnoverPositions: number[];  

  constructor(name: string, wiring: string, alphabet: string, turnoverPositions: string[]) {
    this.name = name; 
    this.wiring = wiring; 
    this.alphabet = alphabet; 
    this.currentPosition = 0; 
    this.turnoverPositions = turnoverPositions.map(letter => charToNum(letter));
    this.alphabetLength = wiring.length; 
  }

  encode(letter: string, direction: string) {
    let n = charToNum(letter);
    n = (n + this.currentPosition) % this.alphabetLength; 
    
    let c; 
    if (direction == "left") {
      c = this.wiring.charAt(n); 
    } else {
      c = this.alphabet.charAt(this.wiring.indexOf(numToChar(n)));
    }

    return numToChar((charToNum(c) - this.currentPosition + this.alphabetLength) % this.alphabetLength);
  }

  step(): void {
    this.currentPosition = (this.currentPosition + 1) % this.alphabetLength; 
    return; 
  }

  reverseStep(): void {
    this.currentPosition = (this.currentPosition - 1 + this.alphabetLength) % this.alphabetLength;
  }

  notchIsEngaged(): boolean {
    for (const pos of this.turnoverPositions) {
      if (pos == this.currentPosition) {
        return true; 
      }
    }
    return false; 
  }

  setPosition(letter: string): void {
    this.currentPosition = charToNum(letter);
  }
}

