import Editor from "@/components/Editor"

const ChatInput = () => {
  return (
    <div className="px-5 w-full">
      <Editor onSubmit={(text)=>console.log(text)}  placeHolder="Say something..."/>
    </div>
  )
}

export default ChatInput
