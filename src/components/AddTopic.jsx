import { useRef, useState } from "react";

export default function AddTopic({ onAdd, selectedSubject, dark, compact = false }) {
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [image, setImage] = useState(null);
  const [voice, setVoice] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  function handleImageChange(event) {
    const [file] = event.target.files;
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (loadEvent) => setImage(loadEvent.target.result);
    reader.readAsDataURL(file);
  }

  async function toggleRecording() {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks = [];
      mediaRecorderRef.current = recorder;
      recorder.ondataavailable = (event) => chunks.push(event.data);
      recorder.onstop = () => {
        const reader = new FileReader();
        reader.onload = (event) => setVoice(event.target.result);
        reader.readAsDataURL(new Blob(chunks, { type: "audio/webm" }));
        stream.getTracks().forEach((track) => track.stop());
      };
      recorder.start();
      setIsRecording(true);
    } catch {
      alert("Microphone permission is required to record a voice note.");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!name.trim()) return;
    onAdd({ name: name.trim(), subject: selectedSubject, notes: notes.trim(), image, voice });
    setName("");
    setNotes("");
    setImage(null);
    setVoice(null);
  }

  const field = dark ? "border-[#2b3956] bg-[#0b1120] text-white placeholder:text-stone-500" : "border-stone-200 bg-stone-50 text-stone-900 placeholder:text-stone-400";
  const surface = dark ? "border-[#283552] bg-[#131b2d]" : "border-stone-200 bg-white";

  return (
    <section className={`rounded-2xl border p-5 ${surface}`}>
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold">Capture a topic</h2>
          <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">Add this to {selectedSubject} and recall it later.</p>
        </div>
        <span className="rounded-lg bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">NEW</span>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input value={name} onChange={(event) => setName(event.target.value)} placeholder="What do you want to remember?" className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none ring-emerald-500 focus:ring-2 ${field}`} />
        {!compact && <textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Add a short explanation or cue (optional)" rows={3} className={`w-full resize-none rounded-xl border px-3 py-2.5 text-sm outline-none ring-emerald-500 focus:ring-2 ${field}`} />}
        {!compact && <div className="flex gap-2">
          <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" />
          <button type="button" onClick={() => fileInputRef.current?.click()} className={`rounded-lg border px-3 py-2 text-xs font-medium ${image ? "border-emerald-400 bg-emerald-500/10 text-emerald-600" : field}`}>{image ? "Image attached" : "Attach image"}</button>
          <button type="button" onClick={toggleRecording} className={`rounded-lg border px-3 py-2 text-xs font-medium ${isRecording ? "border-red-400 bg-red-500/10 text-red-500" : voice ? "border-emerald-400 bg-emerald-500/10 text-emerald-600" : field}`}>{isRecording ? "Stop recording" : voice ? "Voice attached" : "Voice note"}</button>
        </div>}
        {image && <div className="relative"><img src={image} alt="Topic attachment" className="h-28 w-full rounded-xl object-cover" /><button type="button" onClick={() => setImage(null)} className="absolute right-2 top-2 rounded-md bg-black/70 px-2 py-1 text-xs text-white">Remove</button></div>}
        {voice && <audio src={voice} controls className="h-8 w-full" />}
        <button type="submit" className="w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500">Add topic</button>
      </form>
    </section>
  );
}
