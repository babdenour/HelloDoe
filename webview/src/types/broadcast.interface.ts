export interface IQuickReply {
  title: string;
  payload: string;
}

export type BroadcastTarget = "ALL" | "HIRED";

export type BroadcastMessageType = "TEXT" | "QUICK_REPLIES" | "BUTTONS";
