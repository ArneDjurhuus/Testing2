import React, { useState } from 'react';
import {
  Box,
  Fab,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import NoteCard from './NoteCard';
import { Note } from '../models/Note';
import { sortNotes, filterNotes } from '../utils/noteStorage';

interface NoteListProps {
  notes: Note[];
  onNoteClick: (note: Note) => void;
  onAddNote: () => void;
  onDeleteNote: (note: Note) => void;
}

export default function NoteList({ notes, onNoteClick, onAddNote, onDeleteNote }: NoteListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [noteToDelete, setNoteToDelete] = useState<Note | null>(null);

  const displayed = sortNotes(filterNotes(notes, searchQuery));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100dvh' }}>
      {/* Header */}
      <Box sx={{ px: 2, pt: 2, pb: 1 }}>
        <Typography variant="h5" fontWeight={700} sx={{ mb: 1.5 }}>
          Pixel Notes
        </Typography>

        <TextField
          placeholder="Search notes"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="small"
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: searchQuery ? (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setSearchQuery('')} aria-label="Clear search">
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : null,
              sx: { borderRadius: 6 },
            },
          }}
        />
      </Box>

      {/* Note grid */}
      <Box sx={{ flexGrow: 1, overflow: 'auto', px: 2, pt: 1, pb: 10 }}>
        {displayed.length === 0 ? (
          <Box sx={{ textAlign: 'center', mt: 8 }}>
            <Typography variant="h6" color="text.secondary">
              {searchQuery ? 'No notes found' : 'No notes yet'}
            </Typography>
            <Typography variant="body2" color="text.disabled" sx={{ mt: 1 }}>
              {searchQuery ? 'Try a different search' : 'Tap + to create your first note'}
            </Typography>
          </Box>
        ) : (
          <Box sx={{ columnCount: 2, columnGap: '12px' }}>
            {displayed.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onClick={onNoteClick}
                onLongPress={setNoteToDelete}
              />
            ))}
          </Box>
        )}
      </Box>

      {/* FAB */}
      <Fab
        color="primary"
        aria-label="Add note"
        onClick={onAddNote}
        sx={{ position: 'fixed', bottom: 24, right: 24 }}
      >
        <AddIcon />
      </Fab>

      {/* Delete confirmation dialog */}
      <Dialog open={!!noteToDelete} onClose={() => setNoteToDelete(null)}>
        <DialogTitle>Delete note</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete &quot;{noteToDelete?.title || 'Untitled'}&quot;?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNoteToDelete(null)}>Cancel</Button>
          <Button
            color="error"
            onClick={() => {
              if (noteToDelete) onDeleteNote(noteToDelete);
              setNoteToDelete(null);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
