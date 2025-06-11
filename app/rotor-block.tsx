import Rotor from "./rotor"
import { useState } from "react";
type RotorBlockProps = {
  positions: any[],
  onClick: () => void 
}

export default function RotorBlock({positions, onClick}: RotorBlockProps) {
  // const [rotorData, setRotorData] = useState([...positions]);

  return (
    <div 
      className="px-4 pb-10 pt-4 border-2 w-fit border-zinc-500 grid grid-flow-col grid-rows-2 grid-cols-3 place-items-center cursor-pointer"
      onClick={onClick}
      >
      {positions.map((rotor, i) => 
        <Rotor 
          key={"rotor-" + rotor.name}
          name={rotor.name}
          pos={rotor.position}
          i={i}
          len={positions.length}
        >
        </Rotor>
      )}
    </div>
  )
}