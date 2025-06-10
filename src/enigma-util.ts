/** This file contains utility functions for the Enigma project. */

function charToNum(letter: string): number {
  return letter.charCodeAt(0) - "A".charCodeAt(0);
}

function numToChar(num: number): string {
  return String.fromCharCode("A".charCodeAt(0) + num);
}

export { charToNum, numToChar };