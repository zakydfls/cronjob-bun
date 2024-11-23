interface StarsenderApiPayload {
  MessageType: string;
  To: string;
  Body: string;
  File?: string;
  Delay?: number;
  Schedule?: number;
}

export type { StarsenderApiPayload };
