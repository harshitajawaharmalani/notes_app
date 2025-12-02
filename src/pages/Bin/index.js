import { useNotes } from "../../context/notes-context";
import { NotesCard } from "../../components/NotesCard";

export default function Bin() {
    const { bin } = useNotes();

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Bin</h2>

            {bin.length === 0 ? (
                <p className="text-gray-500">No notes in the Bin.</p>
            ) : (
                <div className="flex flex-wrap gap-4">
                    {bin.map((note) => (
                        <NotesCard key={note.id} {...note} isInBin={true} />
                    ))}
                </div>
            )}
        </div>
    );
}
