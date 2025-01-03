import Quill, { Delta, Op, QuillOptions } from "quill"
import "quill/dist/quill.snow.css"
import {  RefObject, useEffect, useRef } from "react"
import { PiTextAa } from "react-icons/pi"
import { MdSend } from "react-icons/md"
import { Button } from "./ui/button";
import { ImageIcon, Smile } from "lucide-react";
import Hint from "./Hint"
type Message = {
  image: File | null
  text: string
}
type Props = {
  variant?: "create" | "update"
  onSubmit: (message: Message) => void,
  onCancel?: () => void,
  onSave?: (message: Message) => void
  placeHolder?: string
  defaultValue?: Delta | Op[]
  disabled?: boolean
  innerRef?: RefObject<Quill | null>

}
const Editor = ({ variant = "create", onSubmit, onCancel, onSave, innerRef, placeHolder = "Write something...", defaultValue = [], disabled = false }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current
    const editorContainer = container.appendChild(container.ownerDocument.createElement('div'))
    const options: QuillOptions = { theme: "snow" };
    const _quill = new Quill(editorContainer, options);
    return () => {
      if (container) {
        container.innerHTML = ""
      }
    }
  }, [])
  return (
    <div className="flex flex-col">
      <div className="flex flex-col border border-slate-200 rounded-md overflow-hidden focus-within:border-slate-300 focus-within:shadow-sm transition bg-white">
        <div ref={containerRef} className="h-full ql-custom" />
        <div className="flex px-2 pb-2 z-[5]">
          <Hint label="Hide formatting">
            <Button size="iconSm" variant="ghost" onClick={() => { }}>
              <PiTextAa className="size-4" />
            </Button>
          </Hint>
          <Hint label="Emoji">
            <Button size="iconSm" variant="ghost" onClick={() => { }}>
              <Smile className="size-4" />
            </Button>
          </Hint>
          {variant == "create" &&
            <Hint label="Image">
              <Button size="iconSm" variant="ghost" onClick={() => { }}>
                <ImageIcon className="size-4" />
              </Button>
            </Hint>
          }
          {variant == "update" && (<div className="ml-auto flex items-center gap-x-2">
            <Button variant="outline" size="sm" onClick={() => { }} disabled>Cancel</Button>
            <Button variant="outline" className="bg-[#007a5a] hover:bg-[#007a5a]/80 text-white" size="sm" onClick={() => { }} disabled>Save</Button>
          </div>)}
          {variant == "create" &&
            <Button disabled className="ml-auto bg-[#007a5a] hover:bg-[#007a5a]/80 text-white" size="iconSm" onClick={() => { }}>
              <MdSend />
            </Button>
          }
        </div>
      </div>
      <div className="p-2 text-[12px] text-muted-foreground flex justify-end">
        <p>
          <strong>Shift + Return</strong> to enter new line
        </p>
      </div>
    </div>
  )
}

export default Editor
