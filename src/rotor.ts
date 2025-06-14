/* This class  */

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

  // input(letter: string): string {
  //   let n = charToNum(letter); // easier to perform modular addition/subtraction on integers  

  //   // offset input value by the rotor's current distance from position 0
  //   // (because the signal will be received at the contact that is *the offset distance away* from the contact corresponding to the input letter)
  //   n = (n + this.currentPosition) % this.alphabetLength; 

  //   // get the letter this value maps to, then undo the effect of the offset before sending the output to the next rotor 
  //   // (because the next rotor does not know how this rotor's position, and may have its own offset)
  //   n = (charToNum(this.wiring.charAt(n)) - this.currentPosition + this.alphabetLength) % this.alphabetLength;

  //   // output the resulting letter 
  //   return numToChar(n); 
  // }

  // output(letter: string): string {
  //   let n = charToNum(letter);
  //   n = (n + this.currentPosition) % this.alphabetLength; 
  //   n = charToNum(this.alphabet.charAt(this.wiring.indexOf(numToChar(n))));
  //   n = (n - this.currentPosition + this.alphabetLength) % this.alphabetLength;
  //   return numToChar(n); 
  // }

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

