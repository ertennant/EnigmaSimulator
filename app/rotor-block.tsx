/** 
 * The RotorBlock component displays the current positions of each installed rotor, which are visible through windows on a real Enigma machine. 
 * It also shows the names of the rotors in use for the sake of convenience. 
 * (When using a real Enigma machine, it is necessary to open the machine and remove the rotors in order to determine which ones are installed.)
 */

import Rotor from "./rotor"

type RotorBlockProps = {
  rotorInfo: {name: string, position: string}[],
  onClick: () => void 
}

export default function RotorBlock({rotorInfo, onClick}: RotorBlockProps) {

  return (
    <div 
      className="px-4 pb-10 pt-4 border-2 w-fit border-zinc-500 grid grid-flow-col grid-rows-2 grid-cols-3 place-items-center cursor-pointer"
      onClick={onClick}
      >
      {rotorInfo.map((rotor, i) => 
        <Rotor 
          key={"rotor-" + rotor.name}
          name={rotor.name}
          pos={rotor.position}
          i={i}
          len={rotorInfo.length}
        >
        </Rotor>
      )}
    </div>
  )
}