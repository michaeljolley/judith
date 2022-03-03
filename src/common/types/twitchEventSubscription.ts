export type TwitchEventSubscription = {
  id: string;
  type: string;
  version: string;
  status: string;
  cost: number;
  condition?: {
      broadcaster_user_id?: string;
  }
  created_at: string;
  transport: {
      method: string;
      callback: string;
  }
}