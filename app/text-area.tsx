/**
 * The TextArea component is a more human-friendly (but less historically accurate) substitute for the Keyboard and Lightboard. 
 * It allows the user to view the original and encoded versions of the entire message, rather than just the most recently entered letter. 
 */

import { ChangeEvent } from "react"

type TextAreaProps = {
  content: string, 
  editable: boolean, 
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void, 
  css?: string, 
  placeholderText?: string, 
  isEnabled: boolean 
}

export default function TextArea({content, editable, onChange, css, placeholderText, isEnabled}: TextAreaProps) {
  return (
    <textarea className={css + (isEnabled ? " text-white " : " text-zinc-500 ") + " font-[Roboto_Mono] p-2 text-lg bg-black w-128 h-48 resize-none rounded-sm"}
      value={content}
      disabled={!editable || !isEnabled}
      onChange={editable && isEnabled && onChange ? onChange : undefined}
      placeholder={placeholderText ?? ""}
    >
    </textarea>
  )
}