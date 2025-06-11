import { ChangeEvent, useEffect, useState } from "react";

type RotorProps = {
  // rotorData: any,
  name: string, 
  pos: string, 
  i: number, 
  len: number
}

export default function Rotor({pos, name, i, len}: RotorProps) {
  const [position, setPosition] = useState("");
  const [label, setLabel] = useState(name);

  function handleChangePosition() {
    console.log("called handleChangePosition, name = " + label + ", pos = " + position);
    // setPosition(newPosition);
    if (position.length == 1) {
      // onChange(label, position);
    }
  }

  function handleChangeRotor(newRotor: string) {
    // setLabel(newRotor);
    if (newRotor.length > 0) {
      // onChange(newRotor, position);
    }
  }

  return (
    <>
      <input 
        type="text"
        className={`order-${i + 2} font-[Roboto_Mono] text-center w-[3em] text-zinc-400`}
        value={label}
        disabled={true}
      >
      </input>
      <input 
        type="text" 
        className={`order-${(len * (i + 1) + 1)} mx-8 outline-2 outline-zinc-500 border-2 p-1 w-[1.25em] text-center inset-shadow-black inset-shadow-sm font-[Roboto_Mono] font-bold text-black text-xl bg-linear-to-t from-zinc-800 to-zinc-800 via-zinc-300`} 
        value={pos}
        disabled={true}
      ></input>
    </>

  )
}