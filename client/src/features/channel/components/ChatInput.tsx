import Editor, { ChatMessage } from "@/components/Editor"

const ChatInput = () => {
  const handleSubmit=({text,image}:ChatMessage)=>{

  }
  return (
    <div className="px-5 w-full">
      <Editor onSubmit={handleSubmit}  placeHolder="Say something..."/>
    </div>
  )
}

export default ChatInput
