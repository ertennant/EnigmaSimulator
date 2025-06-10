type LightboardProps = {
  currentValue: string, 
  layout: string[][]
}

export default function Lightboard({currentValue, layout}: LightboardProps) {
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