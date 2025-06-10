type RotorBlockProps = {
  positions: String[]
}

export default function RotorBlock({positions}: RotorBlockProps) {
  return (
    <div>
      {positions.map((pos, i) => 
        <p className="inline" key={`rotor-${i}-pos`}>| {pos} |</p>
      )}
    </div>
  )
}