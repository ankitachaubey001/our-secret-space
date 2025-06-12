export type Memory = {
  id: number;
  title: string;
  message: string;
  date: Date;
  image?: string;
  description?: string;
  tag?: string;

};
export type MemoryFormData = {
  title: string;
  message: string;
  date: string;
  image?: string;
  tag?: string;
};


export type Letter = {
  id: number;
  title: string;
  message: string;
  category: LetterCategory;
};

export type LetterCategory =
  | "Open When You're Sad"
  | "Anniversary Note"
  | "First Fight"
  | "Random Love";

  export type VoiceNote = {
  id: number;
  title: string;
  tags: string[];
  audioUrl: string;
  createdAt: Date;
  audio: string ;
  tag?: string;
};
