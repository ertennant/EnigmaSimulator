/** 
 * This class provides the reflector functionality. 
 * The reflector is connected to the left side of the left-most rotor on most models.
 * On the M4, it is connected to the left side of the Zusatzwalze. 
 * It maps an input letter to an output letter, which is then fed back through the rotors in reverse order.  
 */

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