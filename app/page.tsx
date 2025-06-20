"use client";

import Enigma, { EnigmaConfig } from "@/src/enigma";
import Lightboard from "./lightboard";
import Keyboard from "./keyboard";
import Plugboard from "./plugboard";
import RotorBlock from "./rotor-block";
import { SetStateAction, useEffect, useState, useRef, useCallback, ChangeEvent } from "react";
import ConfigPanel from "./config-panel";
import ENIGMA_SPECS from "@/src/enigma-specs";
import TextArea from "./text-area";
import Image from "next/image";

export default function Home() {
  const enigma = useRef(new Enigma("Enigma I"));
  const [rotorInfo, setRotorInfo] : [{name: string, position: string}[], React.Dispatch<SetStateAction<{name: string, position: string}[]>>] = useState(enigma.current.getRotorInfo());
  const [plugboard, setPlugboard] = useState(Array.from(enigma.current.plugboard));
  const [showPlugboard, setShowPlugboard] : [boolean, React.Dispatch<SetStateAction<boolean>>] = useState(false); // open/close the plugboard component 
  const [showLightboard, setShowLightboard] : [boolean, React.Dispatch<SetStateAction<boolean>>] = useState(true); // toggle between showing simulator keyboards and textareas 
  const [showConfigPanel, setShowConfigPanel] : [boolean, React.Dispatch<SetStateAction<boolean>>] = useState(false); // open/close the configuration panel 
  const [inputText, setInputText] : [string, React.Dispatch<SetStateAction<string>>]= useState(""); // the text input by the user 
  const [outputText, setOutputText] : [string, React.Dispatch<SetStateAction<string>>]= useState(""); // the encoding of inputText produced by the enigma algorithm 
  const [initialConfig, setInitialConfig] : [EnigmaConfig, React.Dispatch<SetStateAction<EnigmaConfig>>] = useState({rotors: enigma.current.getRotorInfo(), reflector: enigma.current.reflector.name});

  /**
   * If the user presses a letter key, encodes that letter and appends it to the message. 
   * If the user presses the Backspace key, reverses the most recent letter input and encoding. 
   * @param event The KeyboardEvent triggered by the user. 
   */
  const handleKeyEvent = useCallback((event: KeyboardEvent) => {
    if (["INPUT", "TEXTAREA"].includes((event.target as HTMLElement).tagName)) return; 

    if (showConfigPanel || showPlugboard) return; 

    if (event.key == "Backspace") {
      if (inputText.length == 0) return; // backspace on empty string is meaningless, ignore it 

      enigma.current.undo(); 
      setInputText(inputText.slice(0, inputText.length - 1));
      setOutputText(outputText.slice(0, outputText.length - 1));
      setRotorInfo(enigma.current.getRotorInfo());
    } else if (event.key.length == 1) {
      const key = event.key.toUpperCase(); 
      const c = enigma.current.encodeLetter(key);
      setInputText(inputText + key);
      setOutputText(outputText + c);
      setRotorInfo(enigma.current.getRotorInfo());
    } 
  }, [inputText, outputText, showConfigPanel, showPlugboard])

  useEffect(() => {
    document.addEventListener("keyup", handleKeyEvent); // this way, the user can use their keyboard to activate the simulator keys 
    return () => document.removeEventListener("keyup", handleKeyEvent);
  }, [handleKeyEvent])

  /**
   * Equivalent to handleKeyEvent, but takes a string instead of a KeyboardEvent parameter. 
   * @param key The letter the user entered, or "Backspace" if they used the backspace key. 
   */
  function handleInputText(text: string): void {
    text = text.toUpperCase(); 
    const msg = enigma.current.encodeMessage(text);
    setInputText(inputText + text);
    setOutputText(outputText + msg);
    setRotorInfo(enigma.current.getRotorInfo());
  }

  function handleUndo() {
    if (inputText.length == 0) return; 

    if (inputText.charAt(inputText.length - 1) != " ") {
      enigma.current.undo(); 
      setRotorInfo(enigma.current.getRotorInfo());
    }
    setInputText(inputText.slice(0, inputText.length - 1));
    setOutputText(outputText.slice(0, outputText.length - 1));
  }

  function handleClear() {
    if (inputText.length == 0) return; 

    setInputText("");
    setOutputText("");
    enigma.current.reinitialize(initialConfig); 
  }

  function handleChangeInput(e: ChangeEvent<HTMLTextAreaElement>) {
    if (e.currentTarget.value.length < inputText.length) {
      handleUndo(); 
    } else {
      handleInputText(e.currentTarget.value.slice(inputText.length));
    }
  }

  /**
   * Changes the model of Enigma being used, and updates any encoded message to what the new model would output starting from its default configuration. 
   * @param model The name of the desired Enigma model.
   */
  function handleChangeModel(model: string): void {
    enigma.current.changeModel(model);
    if (initialConfig) {
      enigma.current.reinitialize(initialConfig);
    }
    if (inputText.length > 0) {
      // if there is an existing message, re-encode it using the new machine 
      setOutputText(enigma.current.encodeMessage(inputText));
    }
    setRotorInfo(enigma.current.getRotorInfo());
  }

  /**
   * Changes the rotors, the rotor positions, and/or the reflector. 
   * @param config The desired configuration settings: the reflector name, and an array of objects specifying the names and positions of the rotors. 
   */
  function handleChangeConfig(config: EnigmaConfig) {
    setShowConfigPanel(false);
    setInitialConfig(config);
    enigma.current.reinitialize(config);
    if (inputText.length > 0) {
      setOutputText(enigma.current.encodeMessage(inputText));
    }
  }

  /**
   * Sets the plugboard according to the specified array of letter pair swaps. 
   * @param pairs An array of the format [["A","Z"]] where each inner array of two strings represents letters to swap. 
   */
  function handleChangePlugboard(pairs: string[][]): void {
    enigma.current.setPlugboard(pairs);
    if (inputText.length > 0) {
      enigma.current.reinitialize(initialConfig);
      setOutputText(enigma.current.encodeMessage(inputText));
    }
    setPlugboard(Array.from(enigma.current.plugboard));
  }
  
  return (
    <main className="relative xs:p-4 bg-black h-full flex flex-col justify-center items-center" >
      <button 
        className="absolute right-0 top-0 m-2 cursor-pointer rounded-full p-2 hover:bg-zinc-700" 
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
      <div className="xs:p-4 bg-zinc-900 flex flex-col items-center justify-center gap-4" >
        {showConfigPanel 
        ? 
        <ConfigPanel
          currentConfig={
            {
              model: enigma.current.model,
              reflector: enigma.current.reflector.name,
              zw: {"name": enigma.current.ZW?.name ?? "", "position": enigma.current.ZW?.getPosition() ?? ""}, 
              rotors: rotorInfo
            }
          }
          configOptions={
            { rotors: ENIGMA_SPECS[enigma.current.model as keyof typeof ENIGMA_SPECS].Rotors.map(r => r.Name),
              reflectors: ENIGMA_SPECS[enigma.current.model as keyof typeof ENIGMA_SPECS].Reflectors.map(r => r.Name),
              zw: ENIGMA_SPECS[enigma.current.model as keyof typeof ENIGMA_SPECS].Zusatzwalze.map(z => z.Name),
            }
          }
          onChangeConfig={handleChangeConfig}
          onCancel={() => setShowConfigPanel(false)}
        ></ConfigPanel>
        : <RotorBlock 
            rotorInfo={rotorInfo} 
            onClick={() => setShowConfigPanel(true)}
          ></RotorBlock>
        }
        <select className="font-[Roboto_Mono] font-bold text-neutral-200 bg-radial-[at_25%_25%] from-neutral-500 to-neutral-700 to-75% py-2 px-4 " defaultValue={enigma.current.model} onChange={e => handleChangeModel(e.currentTarget.value)}>
          {Object.keys(ENIGMA_SPECS).map(name => 
            <option key={"model-opt-" + name} value={name}>{name}</option>
          )}
        </select>
        {showLightboard ? 
          <>
            <Lightboard currentValue={outputText.length > 0 ? outputText.charAt(outputText.length - 1) : ""} layout={enigma.current.keyboardLayout} isEnabled={!showConfigPanel && !showPlugboard}></Lightboard>
            <Keyboard 
              currentValue={inputText.length > 0 ? inputText.charAt(inputText.length - 1) : ""} 
              layout={enigma.current.keyboardLayout}
              onClick={handleInputText}
              isEnabled={!showConfigPanel && !showPlugboard}
            ></Keyboard>
          </>
          : 
          <>
            <TextArea content={outputText} editable={false} isEnabled={!showConfigPanel && !showPlugboard} placeholderText="Your encoded message will appear here."></TextArea>
            <TextArea 
              content={inputText} 
              editable={true} 
              onChange={handleChangeInput} 
              onClear={handleClear}
              isEnabled={!showConfigPanel && !showPlugboard}
              css="border-2 border-zinc-500" 
              placeholderText="[Type Here]"
            ></TextArea>
          </>
        }
        <Plugboard mappings={plugboard} onSubmit={handleChangePlugboard} isVisible={showPlugboard} togglePlugboard={() => setShowPlugboard(!showPlugboard)}></Plugboard>
      </div>
    </main>
  );
}
