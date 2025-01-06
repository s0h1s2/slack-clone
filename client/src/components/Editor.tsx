import Quill, { Delta, Op, QuillOptions } from "quill"
import "quill/dist/quill.snow.css"
import { RefObject, useEffect, useLayoutEffect, useRef, useState } from "react"
import { PiTextAa } from "react-icons/pi"
import { MdSend } from "react-icons/md"
import { Button } from "./ui/button";
import { ImageIcon, Smile } from "lucide-react";
import Hint from "./Hint"
import { cn } from "@/lib/utils"
import EmojiPopover from "./EmojiPopover"
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
  const [message, setMessage] = useState("");
  const [isToolbarVisable, setToolbarVisiable] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const submitRef = useRef(onSubmit);
  const placeHolderRef = useRef(placeHolder);
  const saveRef = useRef(onSave);
  const quillRef = useRef<Quill | null>(null);
  const defaultValueRef = useRef(defaultValue);
  const disabledRef = useRef(disabled);
  useLayoutEffect(() => {
    submitRef.current = onSubmit;
    placeHolderRef.current = placeHolder;
    saveRef.current = onSave;
    defaultValueRef.current = defaultValue;
    disabledRef.current = disabled;
  })
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current
    const editorContainer = container.appendChild(container.ownerDocument.createElement('div'))
    const options: QuillOptions = {
      theme: "snow",
      placeholder: placeHolderRef.current,
      modules: {
        keyboard: {
          bindings: {
            enter: {
              key: "Enter",
              handler: () => {
                return;
              }
            },
            shift_enter: {
              key: "Enter",
              shiftKey: true,
              handler: () => {
                quill.insertText(quill.getSelection()?.index || 0, "\n")
              }
            }
          }
        }
      }
    };
    const quill = new Quill(editorContainer, options);
    quillRef.current = quill;
    quillRef.current.focus();
    quill.setContents(defaultValueRef.current)
    setMessage(quill.getText())
    quill.on(Quill.events.TEXT_CHANGE, () => {
      setMessage(quill.getText())
    })
    if (innerRef) { }
    return () => {
      quill.off(Quill.events.TEXT_CHANGE)
      if (container) {
        container.innerHTML = ""
      }
      if (quillRef.current) {
        quillRef.current = null;
      }

      if (innerRef) {
        innerRef.current = null;
      }
    }
  }, [innerRef])
  const toggleToolbar = () => {
    setToolbarVisiable((current) => !current)
    const toolbarEl = containerRef.current?.querySelector('.ql-toolbar');
    if (toolbarEl) {
      toolbarEl.classList.toggle("hidden");
    }
  }
  const onEmojiSelect = (emoji: unknown) => {
    const quill = quillRef.current
    if (quill) {
      quill.insertText(quill.getSelection()?.index || 0, emoji!.native)
    }
  }
  const isMessageBoxEmpty = message.trim().length === 0;
  return (
    <div className="flex flex-col">
      <div className="flex flex-col border border-slate-200 rounded-md overflow-hidden focus-within:border-slate-300 focus-within:shadow-sm transition bg-white">
        <div ref={containerRef} className="h-full ql-custom" />
        <div className="flex px-2 pb-2 z-[5]">
          <Hint label={isToolbarVisable ? "Hide formatting" : "Show formatting"}>
            <Button size="iconSm" disabled={disabled} variant="ghost" onClick={toggleToolbar}>
              <PiTextAa className="size-4" />
            </Button>
          </Hint>
          <EmojiPopover hint="Emoji" onEmojiSelect={onEmojiSelect}>
            <Button size="iconSm" variant="ghost" >
              <Smile className="size-4" />

            </Button>
          </EmojiPopover >
          {variant == "create" &&
            <Hint label="Image">
              <Button size="iconSm" variant="ghost" onClick={() => { }}>
                <ImageIcon className="size-4" />
              </Button>
            </Hint>
          }
          {variant == "update" && (<div className="ml-auto flex items-center gap-x-2">
            <Button disabled={disabled} variant="outline" size="sm" onClick={() => { }} >Cancel</Button>
            <Button disabled={disabled || isMessageBoxEmpty} variant="outline" className="bg-[#007a5a] hover:bg-[#007a5a]/80 text-white" size="sm" onClick={() => { }} >Save</Button>
          </div>)}
          {variant == "create" &&
            <Button disabled={isMessageBoxEmpty || disabled} className={cn("ml-auto mt-1", isMessageBoxEmpty ? "bg-white hover:bg-white text-muted-foreground" : "bg-[#007a5a] hover:bg-[#007a5a]/80 text-white")} size="iconSm" onClick={() => { }}>
              <MdSend />
            </Button>
          }
        </div>
      </div>
      {variant == "create" && <div className={cn("p-2 text-[12px] text-muted-foreground flex justify-end opacity-0 transition cursor-default", !isMessageBoxEmpty && "opacity-100")}>
        <p>
          <strong>Shift + Return</strong> to enter new line
        </p>
      </div>
      }
    </div >
  )
}

export default Editor
