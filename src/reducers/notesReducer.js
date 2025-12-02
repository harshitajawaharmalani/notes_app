import { v4 as uuid } from "uuid";

export const notesReducer = (state, { type, payload }) => {
    switch (type) {
        case "TITLE":
            return { ...state, title: payload };

        case "TEXT":
            return { ...state, text: payload };

        case "ADD_NOTE":
            return {
                ...state,
                notes: [
                    ...state.notes,
                    {
                        text: state.text,
                        title: state.title,
                        id: uuid(),
                        isPinned: false,
                    },
                ],
            };

        case "CLEAR_INPUT":
            return { ...state, title: "", text: "" };

        case "PIN":
            return {
                ...state,
                notes: state.notes.map((note) =>
                    note.id === payload.id ? { ...note, isPinned: true } : note
                ),
            };

        case "UNPIN":
            return {
                ...state,
                notes: state.notes.map((note) =>
                    note.id === payload.id ? { ...note, isPinned: false } : note
                ),
            };

        case "ADD_TO_ARCHIVE":
            return {
                ...state,
                archive: [
                    ...state.archive,
                    state.notes.find((n) => n.id === payload.id),
                ],
                notes: state.notes.filter((n) => n.id !== payload.id),
            };

        case "REMOVE_FROM_ARCHIVE":
            return {
                ...state,
                notes: [
                    ...state.notes,
                    state.archive.find((n) => n.id === payload.id),
                ],
                archive: state.archive.filter((n) => n.id !== payload.id),
            };

        // ✅ FIXED MOVE_TO_BIN
        case "MOVE_TO_BIN":
    // Try to find the note in notes or archive
    const noteInNotes = state.notes.find(n => n.id === payload.id);
    const noteInArchive = state.archive.find(n => n.id === payload.id);
    const noteToMove = noteInNotes || noteInArchive;

    if (!noteToMove) return state; // Safety check

    return {
        ...state,
        notes: state.notes.filter(n => n.id !== payload.id),
        archive: state.archive.filter(n => n.id !== payload.id),
        bin: [...state.bin, noteToMove],
    };


        case "RESTORE_FROM_BIN":
    return {
        ...state,
        notes: [
            ...state.notes,
            state.bin.find((n) => n.id === payload.id),
        ],
        bin: state.bin.filter((n) => n.id !== payload.id),
    };


        default:
            return state;
    }
};
