import { useQueryState } from "nuqs";

export const useParentMessageId = () => {
  return useQueryState<number | null>("parentMsgId", {
    defaultValue: null,
    parse: (val) => parseInt(val),
  });
};
