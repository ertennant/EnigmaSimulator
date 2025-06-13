/**
 * The Plugboard component provides an interface for specifying which letters (if any) to swap before encoding with the rotors. 
 */

import { FormEvent } from "react";

type PlugboardProps = {
  mappings: [string, string][],
  onSubmit: (pairs: string[][]) => void, 
  isVisible: boolean, 
  togglePlugboard: () => void
}

export default function Plugboard({mappings, onSubmit, isVisible, togglePlugboard}: PlugboardProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); 
    let pairs = []; 
    for (let i = 0; i < 10; i++) {
      let a = event.currentTarget[`pair-${i}-1`].value; 
      let b = event.currentTarget[`pair-${i}-2`].value; 
      if (a && b) {
        pairs.push([a, b]);
      }
    }
    console.log(pairs);
    onSubmit(pairs);
    togglePlugboard();
  }

  return (
    <div className="flex flex-row justify-center p-2 text-center bg-zinc-800 w-150 flex-wrap">
      <button onClick={togglePlugboard} className={(isVisible ? "hidden" : "") + " button bg-radial-[at_25%_25%] from-neutral-500 to-neutral-700 to-75% rounded-md border-2 border-zinc-400 p-2"}>Show Plugboard</button>
      <form className={(isVisible ? "" : "hidden")} onSubmit={handleSubmit}>
        {
          (Array.from( { length: 10 }, (_, i) => 0 + i * 1)).map((num, idx) => 
            <div key={"pair-" + idx} className="inline-block m-1 p-2 bg-radial-[at_25%_25%] from-neutral-500 to-neutral-600 to-75% rounded-sm">
              <input 
                name={"pair-" + idx + "-1"}
                type="text" 
                maxLength={1}
                defaultValue={mappings[idx] ? (mappings[idx][0] ?? "") : ""}
                className="w-[2em] h-[2em] text-center bg-zinc-900 m-1 rounded-sm"
              ></input>
              <input 
                name={"pair-" + idx + "-2"}
                type="text" 
                maxLength={1}
                defaultValue={mappings[idx] ? (mappings[idx][1] ?? "") : ""}
                className="w-[2em] h-[2em] text-center bg-zinc-900 m-1 rounded-sm"
              ></input>
            </div>
          )
        }
        <div className="m-2">
          <button className="button mx-1 bg-radial-[at_25%_25%] from-neutral-500 to-neutral-700 to-75% rounded-md border-2 border-zinc-400 px-2 w-[5em]" type="submit">OK</button>
          <button className="button mx-1 bg-radial-[at_25%_25%] from-neutral-500 to-neutral-700 to-75% rounded-md border-2 border-zinc-400 px-2 w-[5em]" type="button" onClick={togglePlugboard}>Cancel</button>
        </div>
      </form>
    </div>
  )
}