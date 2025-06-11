"use client";

import Enigma from "@/src/enigma";
import Lightboard from "./lightboard";
import Keyboard from "./keyboard";
import Plugboard from "./plugboard";
import RotorBlock from "./rotor-block";
import { SetStateAction, useEffect, useState, useRef } from "react";

export default function Home() {
  const enigma = useRef(new Enigma("Enigma I"));
  const [rotorPositions, setRotorPositions] : [String[], React.Dispatch<SetStateAction<String[]>>] = useState([...enigma.current.rotorPositions]);
  const [plugboard, setPlugboard] = useState(enigma.current.plugboard);
  const [currentInput, setCurrentInput] = useState("");
  const [currentOutput, setCurrentOutput] = useState("");

  useEffect(() => {
    enigma.current.changeReflector("B");
    function handleKeyEvent(e: KeyboardEvent) {
      let key = e.key; 
      if (key.length > 1) return; // for now, ignore things like 'Enter' and 'Backspace' 
      key = key.toUpperCase();
      setCurrentInput(key);
      let c = enigma.current.encodeLetter(key);
      setCurrentOutput(c);
    }

    document.addEventListener("keyup", handleKeyEvent);

    return () => document.removeEventListener("keyup", handleKeyEvent);
  }, [])

  useEffect(() => {
    setRotorPositions(enigma.current.rotorPositions);
  }, [enigma.current.rotorPositions])

  useEffect(() => {
    setPlugboard(enigma.current.plugboard); 
  }, [enigma.current.plugboard])

  function handleKeyClick(key: string) {
    if (key.length > 1) return; // for now, ignore things like 'Enter' and 'Backspace' 
    key = key.toUpperCase();
    setCurrentInput(key);
    let c = enigma.current.encodeLetter(key);
    setCurrentOutput(c);
  }

  // Page needs to update when: 
  // - plugboard is updated by user 
  // - rotor positions change 
  // - machine produces output 

  // function handleKeyEvent(key: string) {
  //   console.log("called handleKeyEvent()");
  //   if (key.length > 1) return; // for now, ignore things like 'Enter' and 'Backspace' 
  //   setCurrentInput(key);
  //   let c = enigma.current.encodeLetter(key);
  //   console.log(c);
  //   setCurrentOutput(c);
  // }
  return (
    <main className="h-full flex flex-col justify-center items-center">
      <div className="p-4 bg-zinc-900 flex flex-col items-center justify-center gap-4">
        <RotorBlock positions={rotorPositions}></RotorBlock>
        <Lightboard currentValue={currentOutput ?? ""} layout={enigma.current.keyboardLayout}></Lightboard>
        <Keyboard 
          currentValue={currentInput ?? ""} 
          layout={enigma.current.keyboardLayout}
          onClick={handleKeyClick}
        ></Keyboard>
      </div>
      <Plugboard mappings={plugboard}></Plugboard>
    </main>
  );
}
