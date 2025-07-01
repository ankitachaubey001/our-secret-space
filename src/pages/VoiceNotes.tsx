import { useEffect, useState } from "react";
import AddVoiceNoteModal from "../components/AddVoiceNoteModal";
import type { VoiceNote } from "../types/globle";
import { addVoiceNoteToFirestore, fetchVoiceNotes } from "../libs/firestoreHelpers";

export default function VoiceNotes() {
  const [notes, setNotes] = useState<VoiceNote[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadNotes = async () => {
      const data = await fetchVoiceNotes();
      setNotes(data);
    };
    loadNotes();
  }, []);

  const addNote = async (note: VoiceNote) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...rest } = note;
    const docId = await addVoiceNoteToFirestore(rest);
    setNotes([...notes, { ...note, id: docId }]);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-rose-600 mb-6">🎧 Voice Notes</h1>

      <button
        onClick={() => setShowModal(true)}
        className="mb-4 bg-rose-500 text-white px-4 py-2 rounded shadow hover:bg-rose-600 cursor-pointer"
      >
        + Add Voice Note
      </button>

      {notes.length === 0 ? (
        <p className="text-gray-500">No voice notes yet.</p>
      ) : (
        <ul className="space-y-4">
          {notes.map((note) => (
            <li key={note.id} className="p-4 bg-pink-100 rounded-xl shadow">
              <div className="font-semibold text-rose-600 mb-1">{note.title}</div>
              <audio controls src={note.audioUrl} className="w-full" />
              {note.tag && (
                <div className="mt-2">
                  <span className="px-2 py-1 bg-pink-200 text-sm rounded-full text-pink-700">
                    #{note.tag}
                  </span>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {showModal && (
        <AddVoiceNoteModal onClose={() => setShowModal(false)} onSubmit={addNote} />
      )}
    </div>
  );
}
