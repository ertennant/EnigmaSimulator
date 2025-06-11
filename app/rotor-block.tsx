type RotorBlockProps = {
  positions: String[]
}

export default function RotorBlock({positions}: RotorBlockProps) {
  return (
    <div className="px-4 py-14 border-2 w-fit border-zinc-500">
      {positions.map((pos, i) => 
        <p className="mx-8 outline-2 outline-zinc-500 border-2 p-1 inset-shadow-black inset-shadow-sm font-[Roboto_Mono] font-bold inline text-black text-xl bg-linear-to-t from-zinc-800 to-zinc-800 via-zinc-300" key={`rotor-${i}-pos`}>{pos}</p>
      )}
    </div>
  )
}