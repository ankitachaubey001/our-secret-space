import { collection, getDocs, addDoc, Timestamp, getDoc, doc, orderBy, query } from "firebase/firestore";
import { db } from "../hooks/firebaseConfig";
import type { Letter, Memory, MemoryFormData, SpecialDay, VoiceNote } from "../types/globle";


const collectionRef = collection(db, "memories");

export async function fetchMemories(): Promise<Memory[]> {
  const snapshot = await getDocs(collectionRef);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      message: data.message,
      image: data.image || "",
      tag: data.tag,
      date: data.date?.toDate?.() || new Date(),
    };
  });
}

export async function addMemoryToFirestore(formData: MemoryFormData) {
  const data = {
    ...formData,
    date: Timestamp.fromDate(new Date(formData.date)),
  };
  await addDoc(collectionRef, data);
}



const lettersRef = collection(db, "letters");

export async function createLetter(letter: Omit<Letter, "id" | "date">): Promise<void> {
  await addDoc(lettersRef, {
    ...letter,
    date: Timestamp.fromDate(new Date()),
  });
}

export async function fetchLetters(): Promise<Letter[]> {
  const snapshot = await getDocs(lettersRef);
  return snapshot.docs.map((docSnap) => {
    const data = docSnap.data();
    return {
      id: docSnap.id,
      title: data.title,
      message: data.message,
      category: data.category,
      isLocked: data.isLocked,
      password: data.password,
      date: data.date.toDate(),
    };
  });
}
export async function fetchLetterById(id: string): Promise<Letter | null> {
  const docRef = doc(db, "letters", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return null;

  const data = docSnap.data();
  return {
    id: docSnap.id,
    title: data.title,
    message: data.message,
    category: data.category,
    isLocked: data.isLocked,
    password: data.password,
    date: data.date.toDate(),
  };
}


export const addVoiceNoteToFirestore = async (note: Omit<VoiceNote, "id">) => {
  const docRef = await addDoc(collection(db, "voiceNotes"), {
    ...note,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
};

export const fetchVoiceNotes = async (): Promise<VoiceNote[]> => {
  const snapshot = await getDocs(collection(db, "voiceNotes"));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as VoiceNote[];
};






export const fetchSpecialDays = async (): Promise<SpecialDay[]> => {
  const q = query(collection(db, "specialDays"), orderBy("createdAt", "asc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      date: data.date,
      createdAt: data.createdAt?.toDate?.() ?? new Date()
    };
  });
};

export const addSpecialDay = async (day: Omit<SpecialDay, "id" | "createdAt">) => {
  const docRef = await addDoc(collection(db, "specialDays"), {
    ...day,
    createdAt: Timestamp.now()
  });
  return docRef.id;
};

