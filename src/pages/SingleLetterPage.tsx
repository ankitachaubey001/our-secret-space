import LetterEnvelope from "../components/letter/LetterEnvelope";

export default function SingleLetterPage() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-rose-600 mb-4">💖 Your Letter</h1>
      <LetterEnvelope />
    </div>
  );
}
