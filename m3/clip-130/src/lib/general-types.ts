export interface Speaker {
  id: number;
  firstName: string;
  lastName: string;
  company: string;
  twitterHandle: string;
  userBioShort: string;
  timeSpeaking: Date;
  favoriteCount?: number;
  favorite?: boolean;
  favoriteStatus?: FavoriteStatusEnum;
  sessions?: SpeakerSession[];
  favorites?: AttendeeFavorite[];
  _count?: { favorites: number };
}

export interface Session {
  id: number;
  title: string;
  description: string;
  sessionStart?: Date;
  speakers?: SpeakerSession[];
}

export interface SpeakerSession {
  speakerId: number;
  sessionId: number;
  speaker: Speaker;
  session: Session;
}

export interface Attendee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdDate: Date;
  favorites?: AttendeeFavorite[];
}

export interface AttendeeFavorite {
  id: number;
  attendeeId: string;
  speakerId: number;
  attendee: Attendee;
  speaker: Speaker;
}

type FavoriteStatusEnum =
  | "favored"
  | "not-favored"
  | "updating"
  | "hidden"
  | "errored";
