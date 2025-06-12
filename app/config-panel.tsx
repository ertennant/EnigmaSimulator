import { FormEvent, MouseEventHandler, useState } from "react"
import { EnigmaConfig } from "@/src/enigma";

type ConfigPanelProps = {
  currentConfig: {
    model: string, 
    reflector: string, 
    rotors: {name: string, position: string}[],
  },
  modelOptions: string[], 
  configOptions: {
    rotors: string[], 
    reflectors: string[], 
    // rotorPositions: string[], 
  }, 
  // onChangeModel: (name: string) => void, 
  onChangeConfig: (options: EnigmaConfig) => void, 
  onCancel: () => void, 
}

export default function ConfigPanel({currentConfig, modelOptions, configOptions, onChangeConfig, onCancel}: ConfigPanelProps) {
  // const [config, setConfig] = useState(currentConfig);

  // function handleChangeModel(name: string) {
  //   if (name != currentConfig.model) {
  //     onChangeModel(name);
  //   }
  // }

  function handleChangeConfig(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); 
    let temp = {...currentConfig};
    temp.reflector = event.currentTarget.reflector.value; 
    for (let i = 0; i < currentConfig.rotors.length; i++) {
      temp.rotors[i].name = event.currentTarget[`rotor-${i}`].value; 
      temp.rotors[i].position = event.currentTarget[`rotor-${i}-position`].value; 
    }
    console.log(temp);
    onChangeConfig(temp);
  }

  return (
    <form 
      className={"p-8 border-2 w-fit border-zinc-500 gap-2 grid grid-rows-4 place-items-stretch" + (currentConfig.rotors.length == 4 ? " grid-cols-5" : " grid-rows-4")}
      onSubmit={handleChangeConfig}
      >
      <label htmlFor="reflector" className="font-[Roboto] col-span-1 row-span-1 row-start-1 col-start-1 text-center content-center">Reflector</label>
      <select name="reflector" defaultValue={currentConfig.reflector} className="font-[Roboto_Mono] col-span-1 row-span-1 col-start-1 row-start-2">
        {configOptions.reflectors.map((reflector) => 
          <option value={reflector} key={"reflector-opt-" + reflector}>{reflector}</option>
        )}
      </select>
      <p className="col-span-1 row-span-1 row-start-3 col-start-1"></p>
      <p className="font-[Roboto] row-start-1 col-start-2 text-center content-center col-span-3">Rotors</p>
      {currentConfig.rotors.map((cr, i) => 
        <select 
          key={"rotor-select-" + i}
          className="font-[Roboto_Mono] row-start-2 col-span-1 row-span-1 w-[5em]" 
          name={`rotor-${i}`} 
          defaultValue={cr.name ?? "hi"}
        >
          {configOptions.rotors.map(rotorLabel => 
            <option value={rotorLabel} key={"rotor-opt-" + rotorLabel}>{rotorLabel}</option>
          )}
        </select>
      )}
      {currentConfig.rotors.map((cr, i) => 
        <input 
          className="font-[Roboto_Mono] col-span-1 row-span-1 row-start-3 text-center w-[5em] bg-black rounded-md" 
          type="text" 
          maxLength={1} 
          name={`rotor-${i}-position`} 
          defaultValue={cr.position}
          key={"position-" + i}
        ></input>
      )}
      <div className="row-span-1 row-start-4 col-span-4 text-center">
        <button type="submit" className="font-[Roboto_Mono] button w-[5em] mx-1 bg-radial-[at_25%_25%] from-neutral-500 to-neutral-700 to-75% rounded-md border-2 border-zinc-400">OK</button>
        <button type="button" onClick={onCancel} className="font-[Roboto_Mono] button w-[5em] mx-1 bg-radial-[at_25%_25%] from-neutral-500 to-neutral-700 to-75% rounded-md border-2 border-zinc-400">Cancel</button>
      </div>
    </form>
  )
}