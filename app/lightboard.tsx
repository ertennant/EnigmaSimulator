type LightboardProps = {
  currentValue: string, 
  layout: string[][]
}

export default function Lightboard({currentValue, layout}: LightboardProps) {
  return (
    <div>
      {layout.map((row, i) => 
        <div key={"keyboard-row-" + i} className="text-center">
          {row.map(key => 
            <p className={"inline-block mx-3 my-2 letter bg-black rounded-full text-2xl font-[900]" + (key == currentValue ? " text-amber-100 text-shadow-[0_0_10px_#fef3c6,0_0_20px_#fef3c6] " : " text-neutral-400")} key={"light-" + key}>{key}</p>
          )}
        </div>
      )}
    </div>
  )
}