// export type Memory = {
//   id: number;
//   title: string;
//   message: string;
//   date: Date;
//   image?: string;
//   description?: string;
//   tag?: string;
//   isLocked?: boolean;
//   password?: string;

// };
export type Memory = {
  id: string; 
  title: string;
  message: string;
  date: Date;
  image?: string;
  tag: string;
    description?: string;

};
export type MemoryFormData = {
  title: string;
  message: string;
  date: string;
  image?: string;
  tag?: string;
  isLocked?: boolean;
  password?: string;
};


export type LetterCategory =
  | "Open When You're Sad"
  | "Anniversary Note"
  | "First Fight"
  | "Random Love";

export type Letter = {
  id: string; // Firestore document ID
  title: string;
  message: string;
  category: LetterCategory;
  date: Date;
  isLocked: boolean;
  password?: string;
};

export type VoiceNote = {
  id: string; // Firestore doc ID
  title: string;
  tag: string;           // main tag
  tags: string[];        // optional multiple tags
  audioUrl: string;      // URL for audio playback
  createdAt: Date;       // used for sorting/display
};


export type SpecialDay = {
  id: string;
  title: string;
  date: string;
  createdAt: Date;
};