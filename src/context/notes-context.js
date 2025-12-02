import { createContext, useContext, useReducer, useEffect } from "react"; // 1. Import useEffect
import { notesReducer } from "../reducers/notesReducer";

const NotesContext = createContext();

const NotesProvider = ({ children }) => {
  // 2. Load initial state from Local Storage if it exists
  const initialState = JSON.parse(localStorage.getItem("notes-app-data")) || {
    title: "",
    text: "",
    notes: [],
    archive: [],
    bin: [],
  };

  const [{ title, text, notes, archive, bin }, notesDispatch] = useReducer(
    notesReducer,
    initialState
  );

  // 3. Save to Local Storage whenever state changes
  useEffect(() => {
    localStorage.setItem(
      "notes-app-data",
      JSON.stringify({ title, text, notes, archive, bin })
    );
  }, [title, text, notes, archive, bin]);

  return (
    <NotesContext.Provider
      value={{ title, text, notes, archive, bin, notesDispatch }}
    >
      {children}
    </NotesContext.Provider>
  );
};

const useNotes = () => useContext(NotesContext);

export { NotesProvider, useNotes };