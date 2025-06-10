type KeyboardProps = {
  currentValue: string, 
  layout: string[][]
}

export default function Keyboard({currentValue, layout}: KeyboardProps) {
  return (
    <div>
      {layout.map((row, i) => 
        <div key={"keyboard-row-" + i}>
          {row.map(key => 
            <p className="inline" key={"key-" + key}>{key}</p>
          )}
        </div>
      )}
    </div>
  )
}