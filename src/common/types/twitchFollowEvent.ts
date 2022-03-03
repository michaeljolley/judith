import { TwitchEventSubscription } from './twitchEventSubscription';

export type TwitchFollowEvent = {
  challenge?: string;
  subscription: TwitchEventSubscription;
  event: {
    user_id: string;
    user_login: string;
    user_name: string;
    broadcaster_user_id: string;
    broadcaster_user_login: string;
    broadcaster_user_name: string;
    followed_at: string;
  }
}
