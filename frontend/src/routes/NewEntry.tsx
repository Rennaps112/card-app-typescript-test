import { ChangeEvent, MouseEvent, useContext, useState } from "react";
import { Entry, EntryContextType } from "../@types/context";
import { EntryContext } from "../utilities/globalContext";

interface SettingsProperties {
  isDarkMode: boolean;
}

export default function NewEntry({ isDarkMode }: SettingsProperties) {
  const emptyEntry: Entry = { title: "", description: "", created_at: new Date().toISOString().split("T")[0], deadline: new Date(),};
  const { saveEntry } = useContext(EntryContext) as EntryContextType;
  const [newEntry, setNewEntry] = useState<Entry>(emptyEntry);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewEntry({
      ...newEntry,
      [event.target.name]: event.target.value,
    });
  };
  const handleSend = (e: MouseEvent<HTMLButtonElement>) => {
    saveEntry(newEntry);
    setNewEntry(emptyEntry);
  };
  return (
    <section
      className={`flex justify-center flex-col w-fit ml-auto mr-auto mt-10 gap-5 p-8 rounded-md ${
        isDarkMode ? "bg-zinc-600 text-white" : "bg-gray-300 text-black"
      }`}
    >
      <input
        className={`p-3 rounded-md ${isDarkMode ? "bg-slate-900 text-white" : "bg-white text-black"}`}
        type="text"
        placeholder="Title"
        name="title"
        value={newEntry.title}
        onChange={handleInputChange}
      />
      <textarea
        className={`p-3 rounded-md ${isDarkMode ? "bg-slate-900 text-white" : "bg-white text-black"}`}
        placeholder="Description"
        name="description"
        value={newEntry.description}
        onChange={handleInputChange}
      />
      <label className="text-sm font-semibold">Scheduled Date</label>
      <input
        className={`p-3 rounded-md ${isDarkMode ? "bg-slate-900 text-white" : "bg-white text-black"}`}
        type="date"
        name="deadline"
        value={new Date(newEntry.deadline).toISOString().split("T")[0]}
        onChange={handleInputChange}
      />
      <button
        onClick={(e) => {
          handleSend(e);
        }}
        className={`font-semibold p-3 rounded-md ${
          isDarkMode ? "bg-gray-800 hover:bg-slate-600" : "bg-blue-400 hover:bg-blue-500"
        } text-white`}
      >
        Create
      </button>
    </section>
  );
}
