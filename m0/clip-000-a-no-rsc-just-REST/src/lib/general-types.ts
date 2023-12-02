export interface Speaker {
  id?: number;
  firstName: string;
  lastName: string;
  company?: string | null;
  twitterHandle?: string | null;
  userBioShort: string;
  sessions?: SpeakerSession[];
  favorites?: AttendeeFavorite[];
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
