import { useNotes } from "../../context/notes-context";
import { findNotesInArchive } from "../../utils/findNotesInArchive";

export const NotesCard = ({ id, title, text, isPinned, isInBin }) => {
    const { notesDispatch, archive } = useNotes();

    const isNotesInArchive = findNotesInArchive(archive, id);

    const onPinClick = (id) => {
        notesDispatch({
            type: isPinned ? "UNPIN" : "PIN",
            payload: { id }
        });
    };

    const onArchiveClick = (id) => {
        notesDispatch({
            type: isNotesInArchive ? "REMOVE_FROM_ARCHIVE" : "ADD_TO_ARCHIVE",
            payload: { id }
        });
    };

    const onDeleteClick = (id) => {
        notesDispatch({
            type: "MOVE_TO_BIN",
            payload: { id }
        });
    };

    const onRestoreClick = (id) => {
        notesDispatch({
            type: "RESTORE_FROM_BIN",
            payload: { id }
        });
    };

    return (
        <div className="w-56 border border-neutral-800 p-2 rounded-md w-[300px]" key={id}>
            <div className="flex justify-between border-b-2">
                <p>{title}</p>

                {/* PIN only when NOT in bin AND NOT in archive */}
                {!isInBin && !isNotesInArchive && (
                    <button onClick={() => onPinClick(id)}>
                        <span className="material-symbols-outlined">
                            push_pin
                        </span>
                    </button>
                )}
            </div>

            <div className="flex flex-col">
                <p>{text}</p>

                <div className="ml-auto flex gap-2">
                    {/* Archive button (Disabled in Bin) */}
                    {!isInBin && (
                        <button onClick={() => onArchiveClick(id)}>
                            <span className="material-symbols-outlined">archive</span>
                        </button>
                    )}

                    {/* Delete button (Home / Archive only) */}
                    {!isInBin && (
                        <button onClick={() => onDeleteClick(id)}>
                            <span className="material-symbols-outlined">delete</span>
                        </button>
                    )}

                    {/* Restore button (ONLY inside Bin) */}
                    {isInBin && (
                        <button onClick={() => onRestoreClick(id)}>
                            <span className="material-symbols-outlined">restore_from_trash</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
