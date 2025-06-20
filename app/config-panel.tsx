import { FormEvent } from "react"
import { EnigmaConfig } from "@/src/enigma";

type ConfigPanelProps = {
  currentConfig: {
    model: string, 
    reflector: string, 
    zw?: {"name": string, "position": string}, 
    rotors: {name: string, position: string}[],
  },
  configOptions: {
    rotors: string[], 
    reflectors: string[], 
    zw: string[],
  }, 
  onChangeConfig: (options: EnigmaConfig) => void, 
  onCancel: () => void, 
}

export default function ConfigPanel({currentConfig, configOptions, onChangeConfig, onCancel}: ConfigPanelProps) {

  function handleChangeConfig(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); 
    const temp = {...currentConfig};
    temp.reflector = event.currentTarget.reflector.value; 
    for (let i = 0; i < currentConfig.rotors.length; i++) {
      temp.rotors[i].name = event.currentTarget[`rotor-${i}`].value; 
      temp.rotors[i].position = event.currentTarget[`rotor-${i}-position`].value; 
    }
    onChangeConfig(temp);
  }

  return (
    <form 
      className={"p-8 border-2 w-fit border-zinc-500 gap-2 grid grid-rows-4 place-items-stretch" + (configOptions.zw.length > 0 ? " grid-cols-5" : " grid-rows-4")}
      onSubmit={handleChangeConfig}
      >
      <label htmlFor="reflector" className="font-[Roboto] col-span-1 row-span-1 row-start-1 col-start-1 text-center text-white content-center w-[3em] xs:w-[5em]">Reflector</label>
      <select name="reflector" defaultValue={currentConfig.reflector} className="font-[Roboto_Mono] text-white col-span-1 row-span-1 col-start-1 row-start-2 w-[3em] xs:w-[5em]">
        {configOptions.reflectors.map((reflector) => 
          <option value={reflector} key={"reflector-opt-" + reflector}>{reflector}</option>
        )}
      </select>
      {configOptions.zw.length > 0 && currentConfig.zw ? 
      <>
        <label htmlFor="zw" className="font-[Roboto] col-span-1 row-span-1 row-start-1 col-start-2 text-center text-white content-center w-[3em] xs:w-[5em] ">Zusatzwalze</label>
        <select name="zusatzwalze" defaultValue={currentConfig.zw.name} className="font-[Roboto_Mono] text-white col-span-1 row-span-1 col-start-2 row-start-2 w-[3em] xs:w-[5em]">
          {configOptions.zw.map((z) => 
            <option value={z} key={"zw-opt-" + z}>{z}</option>
          )}
        </select>
        <input 
          className="font-[Roboto_Mono] text-white col-span-1 row-span-1 row-start-3 text-center w-[3em] xs:w-[5em] bg-black rounded-md" 
          type="text" 
          maxLength={1} 
          name={`zw-position`} 
          defaultValue={currentConfig.zw.position}
        ></input>
      </>
      : ""}
      <p className="col-span-1 row-span-1 row-start-3 col-start-1"></p>
      <p className={"font-[Roboto] text-white row-start-1 text-center content-center col-span-3" + (configOptions.zw.length > 0 ? " col-start-3" : " col-start-2")}>Rotors</p>
      {currentConfig.rotors.map((cr, i) => 
        <select 
          key={"rotor-select-" + i}
          className="font-[Roboto_Mono] text-white row-start-2 col-span-1 row-span-1 w-[3em] xs:w-[5em]" 
          name={"rotor-" + i} 
          defaultValue={cr.name ?? "hi"}
        >
          {configOptions.rotors.map(rotorLabel => 
            <option value={rotorLabel} key={"rotor-opt-" + rotorLabel}>{rotorLabel}</option>
          )}
        </select>
      )}
      {currentConfig.rotors.map((cr, i) => 
        <input 
          className="font-[Roboto_Mono] text-white col-span-1 row-span-1 row-start-3 text-center w-[3em] xs:w-[5em] bg-black rounded-md" 
          type="text" 
          maxLength={1} 
          name={"rotor-" + i + "-position"} 
          defaultValue={cr.position}
          key={"position-" + i}
        ></input>
      )}
      <div className={"row-span-1 row-start-4 text-center" + (configOptions.zw.length > 0 ? " col-span-5" : " col-span-4")}>
        <button type="submit" className="button w-[5em] mx-1 bg-radial-[at_25%_25%] from-neutral-500 to-neutral-700 to-75% rounded-md border-2 border-zinc-400 text-white font-bold font-[Roboto_Mono]">OK</button>
        <button type="button" onClick={onCancel} className="button w-[5em] mx-1 bg-radial-[at_25%_25%] from-neutral-500 to-neutral-700 to-75% rounded-md border-2 border-zinc-400 text-white font-bold font-[Roboto_Mono]">Cancel</button>
      </div>
    </form>
  )
}