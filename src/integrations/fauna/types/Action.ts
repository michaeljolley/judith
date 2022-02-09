export type Action = {
  actionDate: string;
  userId: string;
  displayName: string;
  avatarUrl: string;
  eventType: string;
  eventData: unknown;
  _id?: string;
}