type KeyboardProps = {
  currentValue: string, 
  layout: string[][],
  onClick: (key: string) => void
}

export default function Keyboard({currentValue, layout, onClick}: KeyboardProps) {
  return (
    <div>
      {layout.map((row, i) => 
        <div key={"keyboard-row-" + i} className="text-center">
          {row.map(key => 
            <button key={"key-" + key}
              className={"cursor-pointer inline-block mx-3 my-2 letter bg-neutral-700 rounded-full border-2 border-zinc-400 text-2xl font-[400] text-neutral-200" + (key == currentValue ? " text-neutral-300 bg-zinc-800 border-zinc-500 translate-y-2 " : "")}
              onClick={e => onClick(key)}
            >{key}</button>
          )}
        </div>
      )}
    </div>
  )
}