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
    setRotorPositions(enigma.current.rotorPositions);
  }, [enigma.current.rotorPositions])

  useEffect(() => {
    setPlugboard(enigma.current.plugboard); 
  }, [enigma.current.plugboard])

  // Page needs to update when: 
  // - plugboard is updated by user 
  // - rotor positions change 
  // - machine produces output 

  function handleKeyEvent(key: string) {
    if (key.length > 1) return; // for now, ignore things like 'Enter' and 'Backspace' 

    let c = enigma.current.encodeLetter(key);
    console.log(c);
  }
  return (
    <main onKeyUp={e => handleKeyEvent(e.key)} className="h-full flex flex-col justify-center items-center">
      <div className="p-4 bg-zinc-900 flex flex-col items-center justify-center gap-4">
        <RotorBlock positions={rotorPositions}></RotorBlock>
        <Lightboard currentValue={"A"} layout={enigma.current.keyboardLayout}></Lightboard>
        <Keyboard currentValue={"T"} layout={enigma.current.keyboardLayout}></Keyboard>
      </div>
      <Plugboard mappings={plugboard}></Plugboard>
    </main>
  );
}
