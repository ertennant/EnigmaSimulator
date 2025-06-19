/**
 * The TextArea component is a more human-friendly (but less historically accurate) substitute for the Keyboard and Lightboard. 
 * It allows the user to view the original and encoded versions of the entire message, rather than just the most recently entered letter. 
 */

import { ChangeEvent } from "react"
import Image from "next/image"

type TextAreaProps = {
  content: string, 
  editable: boolean, 
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void, 
  onClear?: () => void, 
  css?: string, 
  placeholderText?: string, 
  isEnabled: boolean 
}

export default function TextArea({content, editable, onChange, onClear, css, placeholderText, isEnabled}: TextAreaProps) {
  return (
    <div className="relative">
      <textarea className={css + (isEnabled ? " text-white " : " text-zinc-500 ") + " relative font-[Roboto_Mono] p-2 text-lg bg-black resize-none w-full sm:w-128 h-48 rounded-sm"}
        value={content}
        disabled={!editable || !isEnabled}
        onChange={editable && isEnabled && onChange ? onChange : undefined}
        placeholder={placeholderText ?? ""}
      >
      </textarea>
      {editable ? 
        <button className="absolute top-0 right-0 m-1 p-1 button" onClick={onClear}>
          <Image
            src="./garbage.svg"
            alt="Clear"
            width={20}
            height={20}
          >          
          </Image>
        </button> 
      : 
        ""
      }
    </div>
  )
}