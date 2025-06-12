import { ChangeEvent } from "react"

type TextAreaProps = {
  content: string, 
  editable: boolean, 
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void, 
  css?: string, 
  placeholderText?: string 
}

export default function TextArea({content, editable, onChange, css, placeholderText}: TextAreaProps) {
  return (
    <textarea className={css + " font-[Roboto_Mono] p-2 text-lg bg-black w-128 h-48 resize-none rounded-sm"}
      value={content}
      disabled={!editable}
      onChange={editable && onChange ? onChange : undefined}
      placeholder={placeholderText ?? ""}
    >
    </textarea>
  )
}