/** 
 * The Zusatzwalze is sort of a hybrid between a rotor and a reflector. 
 * It is used in the M4. It is placed between the reflector and the leftmost rotor. 
 * It does not move automatically like a rotor, but it can be moved manually by the operator. 
 * The combination (reflector narrow-b, zusatzwalze beta) and (reflector narrow-c, zw gamma) are equivalent to the M3 reflectors wide-B and wide-C, respectively. 
 */

import { charToNum, numToChar } from "./enigma-util";

export default class Zusatzwalze {
  readonly name: string; 
  wiring: string[]; 
  position: number; 
  alphabet: string; 

  constructor(name: string, wiring: string, alphabet: string) {
    this.name = name; 
    this.wiring = wiring.split(""); 
    this.position = 0; 
    this.alphabet = alphabet; 
  }

  encode(letter: string, direction: string): string {
    let n = charToNum(letter);
    n = (n + this.position) % this.alphabet.length; 
    
    let c; 
    if (direction == "left") {
      c = this.wiring[n]; 
    } else {
      c = this.alphabet.charAt(this.wiring.indexOf(numToChar(n)));
    }

    return numToChar((charToNum(c) - this.position + this.alphabet.length) % this.alphabet.length);
  }

  getPosition(): string {
    return numToChar(this.position);
  }

  setPosition(letter: string): void {
    this.position = charToNum(letter);
  }
}