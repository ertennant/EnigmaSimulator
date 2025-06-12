"use client";

import Enigma from "@/src/enigma";
import Lightboard from "./lightboard";
import Keyboard from "./keyboard";
import Plugboard from "./plugboard";
import RotorBlock from "./rotor-block";
import { SetStateAction, useEffect, useState, useRef, KeyboardEventHandler } from "react";
import ConfigPanel from "./config-panel";
import ENIGMA_SPECS from "@/src/enigma-specs";
import TextArea from "./text-area";
import Image from "next/image";

export default function Home() {
  const enigma = useRef(new Enigma("Enigma I"));
  const [rotorInfo, setRotorInfo] : [any[], React.Dispatch<SetStateAction<any[]>>] = useState(enigma.current.getRotorInfo());
  const [plugboard, setPlugboard] = useState(Array.from(enigma.current.plugboard));
  const [openConfigPanel, setOpenConfigPanel] = useState(false); // open/close the configuation panel 
  const [currentInput, setCurrentInput] = useState(""); // most recent letter entered 
  const [currentOutput, setCurrentOutput] = useState(""); // Enigma encoding of most recent letter entered 
  const [showLightboard, setShowLightboard] = useState(true); // toggle between showing simulator keyboards and textareas 
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [plugboardIsOpen, setPlugboardIsOpen] = useState(false); // open/close the configuation panel 

  useEffect(() => {
    enigma.current.changeReflector("B");
    function handleKeyEvent(e: KeyboardEvent) {
      if (showLightboard == false) return; 
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) return; 

      let key = e.key; 
      if (key.length > 1) return; // for now, ignore things like 'Enter' and 'Backspace' 
      key = key.toUpperCase();
      setInputText(inputText + key);
      setCurrentInput(key);
      let c = enigma.current.encodeLetter(key);
      setOutputText(outputText + c);
      setCurrentOutput(c);
    }

    document.addEventListener("keyup", handleKeyEvent);

    return () => document.removeEventListener("keyup", handleKeyEvent);
  }, [])

  useEffect(() => {
    setRotorInfo(enigma.current.getRotorInfo());
  }, [enigma.current.rotorPositions])

  useEffect(() => {
    setPlugboard(Array.from(enigma.current.plugboard)); 
  }, [enigma.current.plugboard])

  function handleUpdateInput(text: string) {
    if (text.length == inputText.length + 1) {
      let key = text.charAt(text.length - 1).toUpperCase();
      setCurrentInput(key);
      setInputText(inputText + key);
      let c = enigma.current.encodeLetter(key);
      setCurrentOutput(c);
      setOutputText(outputText + c);
    } else if (text.length == inputText.length - 1) {
      enigma.current.undo(); 
      setRotorInfo(enigma.current.getRotorInfo()); 
      setInputText(inputText.slice(0, inputText.length - 1));
      setOutputText(outputText.slice(0, outputText.length - 1));
      setCurrentInput(inputText.charAt(inputText.length - 1));
      setCurrentOutput(outputText.charAt(outputText.length - 1));
    }
  }
  function handleKeyClick(key: string) {
    // if (key == "Backspace") {
    //   if (inputText.length == 0) return; 

    //   console.log("handleKeyClick() - detected backspace")
    //   enigma.current.undo(); 
    //   setInputText(inputText.slice(0, inputText.length - 1));
    //   setOutputText(outputText.slice(0, outputText.length - 1));
    //   setCurrentInput(inputText.charAt(inputText.length - 1));
    //   setCurrentOutput(outputText.charAt(outputText.length - 1));
    //   return; 
    // }

    if (key.length > 1) return; // Ignore non-letter keys. 

    key = key.toUpperCase();
    setCurrentInput(key);
    setInputText(inputText + key);
    let c = enigma.current.encodeLetter(key);
    setCurrentOutput(c);
    setOutputText(outputText + c);
  }

  function handleChangeConfig(config: {reflector: string, rotors: {name: string, position: string}[]}) {
    setOpenConfigPanel(false);
    console.log(config);
    enigma.current.initialize(config);
  }

  function handleChangePlugboard(pairs: string[][]) {
    enigma.current.setPlugboard(pairs);
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
    <main className="relative h-full flex flex-col justify-center items-center">
      <button 
        className="absolute right-0 top-0 m-2 cursor-pointer" 
        onClick={() => setShowLightboard(!showLightboard)}
        title={showLightboard ? "Hide Keyboard" : "Show Keyboard"}
        >
        <Image
          src={showLightboard ? "./keyboard-off.svg" : "./keyboard.svg"}
          alt={showLightboard ? "Hide Keyboard" : "Show Keyboard"}
          height={30}
          width={30}
        >
        </Image>
      </button>
      <div className="p-4 bg-zinc-900 flex flex-col items-center justify-center gap-4" >
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
        {showLightboard ? 
          <>
            <Lightboard currentValue={currentOutput ?? ""} layout={enigma.current.keyboardLayout}></Lightboard>
            <Keyboard 
              currentValue={currentInput ?? ""} 
              layout={enigma.current.keyboardLayout}
              onClick={handleKeyClick}
            ></Keyboard>
          </>
          : 
          <>
            <TextArea content={outputText} editable={false} placeholderText="Your encoded message will appear here."></TextArea>
            <TextArea content={inputText} editable={true} onChange={e => handleUpdateInput(e.currentTarget.value)} css="border-2 border-zinc-500" placeholderText="[Type Here]"></TextArea>
          </>
        }
        <Plugboard mappings={plugboard} onSubmit={handleChangePlugboard} isVisible={plugboardIsOpen} togglePlugboard={() => setPlugboardIsOpen(!plugboardIsOpen)}></Plugboard>
      </div>
    </main>
  );
}
