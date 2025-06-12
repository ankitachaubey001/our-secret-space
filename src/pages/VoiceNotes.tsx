// pages/VoiceNotes.tsx
import { useEffect, useState } from "react";
import AddVoiceNoteModal from "../components/AddVoiceNoteModal";
import type { VoiceNote } from "../types/globle";

export default function VoiceNotes() {
  const [notes, setNotes] = useState<VoiceNote[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("voice-notes");
    if (stored) {
      setNotes(JSON.parse(stored));
    }
  }, []);

  const addNote = (note: VoiceNote) => {
    const updated = [...notes, note];
    setNotes(updated);
    localStorage.setItem("voice-notes", JSON.stringify(updated));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-rose-600 mb-6">🎧 Voice Notes</h1>

      <button
        onClick={() => setShowModal(true)}
        className="mb-4 bg-rose-500 text-white px-4 py-2 rounded shadow hover:bg-rose-600"
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
              <audio controls src={note.audio} className="w-full" />
              <div className="mt-2 flex flex-wrap gap-2">
                {note.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-pink-200 text-sm rounded-full text-pink-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
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
