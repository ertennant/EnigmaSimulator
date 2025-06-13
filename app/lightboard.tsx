/**
 * The Lightboard component provides a visual representation of the Enigma machine lightboard.
 * When a key is pressed on the Keyboard, the letter that it encodes to lights up on the Lightboard. 
 */

type LightboardProps = {
  currentValue: string, 
  layout: string[][],
  isEnabled: boolean
}

export default function Lightboard({currentValue, layout, isEnabled}: LightboardProps) {
  return (
    <div>
      {layout.map((row, i) => 
        <div key={"keyboard-row-" + i} className="text-center">
          {row.map(key => 
            <p className={"inline-block mx-3 my-2 letter bg-black rounded-full text-2xl font-[900]" + ((isEnabled && key != currentValue) ? " text-neutral-400" : (isEnabled && key == currentValue) ? " text-amber-100 text-shadow-[0_0_10px_#fef3c6,0_0_20px_#fef3c6]" : (!isEnabled && key == currentValue) ? " text-neutral-400 text-shadow-[0_0_10px_#fef3c6,0_0_20px_#fef3c6]" : " text-neutral-700")} key={"light-" + key}>{key}</p>
          )}
        </div>
      )}
    </div>
  )
}