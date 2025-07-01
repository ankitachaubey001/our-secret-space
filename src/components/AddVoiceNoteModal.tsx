import { useState, useRef } from "react";
import { motion } from "framer-motion";
import type { VoiceNote } from "../types/globle";

type Props = {
  onClose: () => void;
  onSubmit: (note: VoiceNote) => void;
};

export default function AddVoiceNoteModal({ onClose, onSubmit }: Props) {
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [chunks, setChunks] = useState<Blob[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
    }
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (e) => setChunks((prev) => [...prev, e.data]);
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "audio/webm" });
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      setChunks([]);
    };
    recorder.start();
    mediaRecorderRef.current = recorder;
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

 const handleSubmit = () => {
  if (!title || !audioUrl) return;
  const note: VoiceNote = {
    id: "", // will be set after Firestore returns the id
    title,
    tag,
    tags: tag ? [tag] : [],
    createdAt: new Date(),
    audioUrl
  };
  onSubmit(note);
  onClose();
};


  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl"
      >
        <h2 className="text-xl font-bold text-rose-500 mb-4 text-center">🎤 Add Voice Note</h2>
        
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 mb-3 border rounded"
        />
        <input
          type="text"
          placeholder="Tag (e.g. goodnight)"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="w-full px-4 py-2 mb-3 border rounded"
        />

        <div className="flex justify-between items-center mb-4">
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`px-4 py-2 rounded text-white cursor-pointer ${isRecording ? "bg-gray-500" : "bg-rose-500"}`}
          >
            {isRecording ? "Stop Recording" : "🎙️ Record"}
          </button>

          <label className="cursor-pointer text-blue-500 underline">
            Upload File
            <input type="file" accept="audio/*" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>

        {audioUrl && (
          <audio controls src={audioUrl} className="w-full mb-4" />
        )}

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="bg-gray-200 px-4 py-2 rounded cursor-pointer">Cancel</button>
          <button onClick={handleSubmit} className="bg-rose-500 text-white px-4 py-2 rounded cursor-pointer">Save</button>
        </div>
      </motion.div>
    </div>
  );
}
