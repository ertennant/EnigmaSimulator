"use client";

import Enigma from "@/src/enigma";
import Lightboard from "./lightboard";
import Keyboard from "./keyboard";
import Plugboard from "./plugboard";
import RotorBlock from "./rotor-block";
import { SetStateAction, useEffect, useState, useRef } from "react";
import ConfigPanel from "./config-panel";
import ENIGMA_SPECS from "@/src/enigma-specs";

export default function Home() {
  const enigma = useRef(new Enigma("Enigma I"));
  const [rotorInfo, setRotorInfo] : [any[], React.Dispatch<SetStateAction<any[]>>] = useState(enigma.current.getRotorInfo());
  const [plugboard, setPlugboard] = useState(enigma.current.plugboard);
  // const [showLightboard, setShowLightboard] = useState(true); // toggle between showing simulator keyboards and textareas 
  const [openConfigPanel, setOpenConfigPanel] = useState(false); // open/close the configuation panel 
  const [currentInput, setCurrentInput] = useState(""); // most recent letter entered 
  const [currentOutput, setCurrentOutput] = useState(""); // Enigma encoding of most recent letter entered 

  useEffect(() => {
    enigma.current.changeReflector("B");
    function handleKeyEvent(e: KeyboardEvent) {
      if ((e.target as HTMLElement).tagName == "INPUT") return; 

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
    setRotorInfo(enigma.current.getRotorInfo());
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

  function handleChangeConfig(config: {reflector: string, rotors: {name: string, position: string}[]}) {
    setOpenConfigPanel(false);
    console.log(config);
    enigma.current.initialize(config);
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
        {openConfigPanel 
        ? 
        <ConfigPanel
          currentConfig={
            {
              model: enigma.current.model,
              reflector: enigma.current.reflector.name,
              rotors: rotorInfo
            }
          }
          modelOptions={["Enigma I"]}
          configOptions={
            { rotors: ENIGMA_SPECS["Enigma I"].Rotors.map(r => r.Name),
              reflectors: ENIGMA_SPECS["Enigma I"].Reflectors.map(r => r.Name),
            }
          }
          onChangeConfig={handleChangeConfig}
          onCancel={() => setOpenConfigPanel(false)}
        ></ConfigPanel>
        : <RotorBlock positions={rotorInfo} onClick={() => setOpenConfigPanel(true)}></RotorBlock>
        }
        <p className="font-[Roboto_Mono] font-bold text-neutral-200 bg-radial-[at_25%_25%] from-neutral-500 to-neutral-700 to-75% py-2 px-4 ">{enigma.current.model}</p>
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
