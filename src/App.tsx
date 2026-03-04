import React, { useState, useEffect, useCallback } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';
import { Note } from './models/Note';
import { loadNotes, saveNotes, createNote } from './utils/noteStorage';

type View = 'list' | 'editor';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
          primary: { main: '#6750A4' },
          secondary: { main: '#625B71' },
        },
        shape: { borderRadius: 12 },
        typography: { fontFamily: '"Google Sans", "Roboto", "Arial", sans-serif' },
      }),
    [prefersDarkMode]
  );

  const [notes, setNotes] = useState<Note[]>([]);
  const [currentView, setCurrentView] = useState<View>('list');
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  useEffect(() => {
    setNotes(loadNotes());
  }, []);

  const persist = useCallback((updated: Note[]) => {
    setNotes(updated);
    saveNotes(updated);
  }, []);

  const handleAddNote = () => {
    setEditingNote(null);
    setCurrentView('editor');
  };

  const handleNoteClick = (note: Note) => {
    setEditingNote(note);
    setCurrentView('editor');
  };

  const handleSave = (title: string, content: string, isPinned: boolean) => {
    if (!title.trim() && !content.trim()) return;

    if (editingNote) {
      const updated = notes.map((n) =>
        n.id === editingNote.id
          ? { ...n, title: title.trim(), content: content.trim(), isPinned, updatedAt: Date.now() }
          : n
      );
      persist(updated);
    } else {
      const newNote = createNote(title, content, isPinned);
      persist([...notes, newNote]);
    }
  };

  const handleDelete = (note?: Note) => {
    const target = note || editingNote;
    if (target) {
      persist(notes.filter((n) => n.id !== target.id));
    }
  };

  const handleBack = () => {
    setCurrentView('list');
    setEditingNote(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {currentView === 'list' ? (
        <NoteList
          notes={notes}
          onNoteClick={handleNoteClick}
          onAddNote={handleAddNote}
          onDeleteNote={handleDelete}
        />
      ) : (
        <NoteEditor
          note={editingNote}
          onSave={handleSave}
          onDelete={() => handleDelete()}
          onBack={handleBack}
        />
      )}
    </ThemeProvider>
  );
}

export default App;
