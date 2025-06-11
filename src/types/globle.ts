export type Memory = {
  id: number;
  title: string;
  message: string;
  date: Date;
  image?: string;
};
export type MemoryFormData = {
  title: string;
  message: string;
  date: string;
  image?: string;
};
