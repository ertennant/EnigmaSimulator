type RotorProps = {
  name: string, 
  pos: string, 
  i: number, 
  len: number,
  onClick: () => void 
}

export default function Rotor({pos, name, i, len, onClick}: RotorProps) {

  return (
    <>
      <input 
        type="text"
        className={`cursor-pointer order-${i + 2} font-[Roboto_Mono] text-center w-[3em] text-zinc-400`}
        value={name}
        readOnly={true}
        onClick={onClick}
      >
      </input>
      <input 
        type="text" 
        className={`cursor-pointer order-${(len * (i + 1) + 1)} mx-8 outline-2 outline-zinc-500 border-2 p-1 w-[1.25em] text-center inset-shadow-black inset-shadow-sm font-[Roboto_Mono] font-bold text-black text-xl bg-linear-to-t from-zinc-800 to-zinc-800 via-zinc-300`} 
        value={pos}
        readOnly={true}
        onClick={onClick}
      ></input>
    </>

  )
}