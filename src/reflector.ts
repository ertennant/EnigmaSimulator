

import { charToNum } from "./enigma-util";

export default class Reflector {
  readonly name: string; 
  wiring: string[]; 

  constructor(name: string, wiring: string) {
    this.name = name; 
    this.wiring = wiring.split(""); 
  }

  reflect(letter: string): string {
    return this.wiring[charToNum(letter)];
  }
}