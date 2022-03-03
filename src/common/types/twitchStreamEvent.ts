import { TwitchEventSubscription } from './twitchEventSubscription';

export type TwitchStreamEvent = {
    challenge?: string;
    subscription: TwitchEventSubscription;
    event: {
        broadcaster_user_id: string;
        broadcaster_user_login: string;
        broadcaster_user_name: string;
        id?: string;
        type?: string;
        started_at?: string;
    }
}
