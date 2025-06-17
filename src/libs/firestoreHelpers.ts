import { collection, getDocs, addDoc, Timestamp } from "firebase/firestore";
import { db } from "@/firebase";
import { MemoryFormData, Memory } from "@/types/globle";

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
