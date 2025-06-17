/**
 * The Keyboard component provides a visual representation of the Enigma machine keyboard, in the historically-accurate order (typically QWERTZ).
 */

type KeyboardProps = {
  currentValue: string, 
  layout: string[][],
  onClick: (key: string) => void,
  isEnabled: boolean 
}

export default function Keyboard({currentValue, layout, onClick, isEnabled}: KeyboardProps) {
  return (
    <div>
      {layout.map((row, i) => 
        <div key={"keyboard-row-" + i} className="text-center">
          {row.map(key => 
            <button 
              key={"key-" + key}
              className={"m-[1px] sm:mx-3 sm:my-2 letter rounded-full border-2 text-2xl font-[400] " + (key == currentValue ? " text-neutral-300 border-zinc-500 translate-y-2 " : "") + (isEnabled ? "bg-metal cursor-pointer text-neutral-200 border-zinc-400 " : "bg-metal-disabled cursor-default text-neutral-500 border-zinc-500 ")}
              onClick={isEnabled ? () => onClick(key) : undefined}
            >{key}</button>
          )}
        </div>
      )}
    </div>
  )
}