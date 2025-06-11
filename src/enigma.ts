/** 
 * This class provides a simulation of various models of the Enigma Machines used in World War II. 
 * To add support for more models, edit the enigma-specs file. 
 */

import ENIGMA_SPECS from "./enigma-specs.js";
import { charToNum, numToChar} from "./enigma-util";
import Rotor from "./rotor";
import Reflector from "./reflector";

export type EnigmaConfig = {
  rotors: {name: string, position: string}[], 
  reflector: string 
}

export default class Enigma {
  model: string;
  ETW: string; 
  rotors: Rotor[];   
  reflector: Reflector; 
  plugboard: Map<string, string>; 
  rotorPositions: String[]; 
  keyboardLayout: string[][]; 

  constructor(model: string) {
    if (Object.hasOwn(ENIGMA_SPECS, model)) {
      this.model = model; 
      this.ETW = ENIGMA_SPECS[model as keyof typeof ENIGMA_SPECS].ETW; 
      this.rotors = []; 
      for (let i = 0; i < ENIGMA_SPECS[model as keyof typeof ENIGMA_SPECS].NumRotors; i++) {
        this.rotors.push(new Rotor(ENIGMA_SPECS[model as keyof typeof ENIGMA_SPECS].Rotors[i].Name, ENIGMA_SPECS[model as keyof typeof ENIGMA_SPECS].Rotors[i].Wiring, this.ETW, ENIGMA_SPECS[model as keyof typeof ENIGMA_SPECS].Rotors[i].Turnover));
      }
      this.reflector = new Reflector(ENIGMA_SPECS[model as keyof typeof ENIGMA_SPECS].Reflectors[0].Name, ENIGMA_SPECS[model as keyof typeof ENIGMA_SPECS].Reflectors[0].Wiring);
      this.plugboard = new Map(); 
      this.rotorPositions = this.getRotorPositions(); 
      this.keyboardLayout = ENIGMA_SPECS[model as keyof typeof ENIGMA_SPECS].Keyboard; 
    } else {
      throw new Error("Error: cannot initialize machine because model " + model + " does not exist in enigma-specs data file.");
    }
  }

  updatePlugboard(a: string, b: string): void {
    if (!a || !b) {
      throw new Error("Error: cannot update plugboard because one or more of the specified letters are undefined.");

    }

    a = a.toUpperCase(); 
    b = b.toUpperCase(); 

    if (!this.ETW.includes(a) || !this.ETW.includes(b)) {
      throw new Error("Error: cannot update plugboard because one or more of the specified letters do not exist in Enigma model " + this.model + "'s alphabet.")
    }

    this.plugboard.set(a, b);
    this.plugboard.set(b, a);
  }

  setPlugboard(values: string): void {
    let pairs = values.split(",");
    for (const pair of pairs) {
      this.updatePlugboard(pair.charAt(0), pair.charAt(1));
    }
  }

  getRotorPositions(): string[] {
    return this.rotors.map(rotor => numToChar(rotor.currentPosition));
  }

  getRotorList(): string[] {
    return this.rotors.map(rotor => rotor.name);
  }

  getRotorInfo(): Array<{name: string, position: string}> {
    return this.rotors.map(rotor => ({
      name: rotor.name, 
      position: numToChar(rotor.currentPosition)
    }));
  }

  setRotorPositions(newPositions: string[]): void {
    for (let i = 0; i < Math.min(this.rotors.length, newPositions.length); i++) {
      this.rotors[i].setPosition(newPositions[i]);
    }
    this.rotorPositions = this.getRotorPositions(); 
  }

  setRotors(rotorList: string[]): void {
    if (rotorList.length == this.rotors.length) {
      for (let i = 0; i < rotorList.length; i++) {
        this.changeRotor(i, rotorList[i]);
      }
    } else {
      throw new Error("Error: cannot change rotors. Enigma model " + this.model + " requires " + this.rotors.length + " rotors, but received " + rotorList.length);
    }
  }

  changeReflector(newReflector: string) {
    let reflectorData : { Name: string; Wiring: string; } = ENIGMA_SPECS[this.model as keyof typeof ENIGMA_SPECS].Reflectors.filter(r => r.Name == newReflector)[0];
    if (!reflectorData) {
      throw new Error("Error: cannot change reflectors. Enigma model " + this.model + " does not have any reflector with the specified name.");
    }
    this.reflector = new Reflector(
      reflectorData.Name, 
      reflectorData.Wiring
    );
  }

  changeRotor(position: number, rotorName: string) {
    if (position > -1 && position < this.rotors.length) {
      let rotorData : {Name: string; Wiring: string; Turnover: string[]; } = ENIGMA_SPECS[this.model as keyof typeof ENIGMA_SPECS].Rotors.filter(r => r.Name == rotorName)[0];
      if (rotorData) {
        this.rotors[position] = new Rotor(rotorData.Name, rotorData.Wiring, this.ETW, rotorData.Turnover);
      } else {
        throw new Error("Error: cannot change rotor. No rotor with the name " + rotorName + " exists for Enigma model " + this.model); 
      }
    } else {
      throw new Error("Error: cannot change rotor because rotor position " + position + " is out of range.");
    }
  }

  initialize(options: EnigmaConfig): void {
    this.changeReflector(options.reflector);

    for (let i = 0; i < this.rotors.length; i++) {
      let rotorData = ENIGMA_SPECS[this.model as keyof typeof ENIGMA_SPECS].Rotors.filter(r => r.Name == options.rotors[i].name);
      if (!rotorData) {
        throw new Error("Error: no rotor with the specified name exists.");
      }
      this.rotors[i] = new Rotor(rotorData[0].Name, rotorData[0].Wiring, this.ETW, rotorData[0].Turnover);
      this.rotors[i].setPosition(options.rotors[i].position); 
    }
    this.rotorPositions = this.getRotorPositions(); 
  }

  changeRotorPosition(rotorName: string, position: string) {
    this.rotors.filter(rotor => (rotor.name == rotorName))[0].setPosition(position); 
    this.rotorPositions = this.getRotorPositions(); 
  }

  stepRotors(): void {
    let next = this.rotors[this.rotors.length - 1].notchIsEngaged(); 
    this.rotors[this.rotors.length - 1].step(); 
    for (let i = this.rotors.length - 2; i > -1; i--) {
      if (next) {
        next = this.rotors[i].notchIsEngaged(); 
        this.rotors[i].step(); 
      }
    }
    this.rotorPositions = this.getRotorPositions();
  }

  encodeLetter(letter: string): string {
    let c = letter.charAt(0).toUpperCase();
    if (!this.ETW.includes(letter)) {
      return c; 
    }
    // console.log("Keyboard received input " + c);
    
    // the rotors move before they receive input 
    this.stepRotors(); 
    // console.log(this.rotorPositions);

    // the result is fed through the plugboard 
    c = this.plugboard.get(c) ?? c; 

    // then the result is passed through the rotors one by one, from right to left 
    for (let i = this.rotors.length - 1; i > -1; i--) {
      c = this.rotors[i].encode(c, "left");
      // console.log("Rotor " + this.rotors[i].name + " output letter " + c);
    }

    // the output of the left rotor is put through the reflector 
    c = this.reflector.reflect(c);
    // console.log("Reflector " + this.reflector.name + " output letter " + c);

    // then it is passed back through each rotor from left to right 
    for (let i = 0; i < this.rotors.length; i++) {
      c = this.rotors[i].encode(c, "right");
      // console.log("Rotor " + this.rotors[i].name + " output letter " + c);
    }

    // finally, it is passed back through the plugboard again 
    c = this.plugboard.get(c) ?? c; 

    // console.log(c);
    return c; 
  }

  encodeMessage(message: string): string {
    let output = "";
    for (let i = 0; i < message.length; i++) {
      output = output + this.encodeLetter(message.charAt(i));
    }
    return output; 
  }
}
