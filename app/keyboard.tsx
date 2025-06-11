type KeyboardProps = {
  currentValue: string, 
  layout: string[][]
}

export default function Keyboard({currentValue, layout}: KeyboardProps) {
  return (
    <div>
      {layout.map((row, i) => 
        <div key={"keyboard-row-" + i} className="text-center">
          {row.map(key => 
            <p className={"inline-block mx-3 my-2 letter bg-neutral-700 rounded-full border-2 border-zinc-400 text-2xl font-[400] text-neutral-200" + (key == currentValue ? " text-neutral-300 bg-zinc-800 border-zinc-500 translate-y-2 " : "")}>{key}</p>
          )}
        </div>
      )}
    </div>
  )
}