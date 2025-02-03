import { useParentMessageId } from "@/features/messages/parent-message-id";
export const usePanel = () => {
  const [parentMsgId, setParentMsgId] = useParentMessageId();
  const onOpenMessage = (msgId: number) => {
    setParentMsgId(msgId);
  };
  const onCloseMessage = () => {
    setParentMsgId(null);
  };

  return {
    parentMsgId,
    onCloseMessage,
  };
};
