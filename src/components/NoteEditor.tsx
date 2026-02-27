import React, { useState } from 'react';
import {
  Box,
  TextField,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { Note } from '../models/Note';

interface NoteEditorProps {
  note: Note | null;
  onSave: (title: string, content: string, isPinned: boolean) => void;
  onDelete: () => void;
  onBack: () => void;
}

export default function NoteEditor({ note, onSave, onDelete, onBack }: NoteEditorProps) {
  const [title, setTitle] = useState(note?.title ?? '');
  const [content, setContent] = useState(note?.content ?? '');
  const [isPinned, setIsPinned] = useState(note?.isPinned ?? false);

  const handleBack = () => {
    if (title.trim() || content.trim()) {
      onSave(title, content, isPinned);
    }
    onBack();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100dvh' }}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <IconButton edge="start" aria-label="back" onClick={handleBack}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, ml: 1 }}>
            {note ? 'Edit Note' : 'New Note'}
          </Typography>
          <IconButton
            aria-label={isPinned ? 'Unpin note' : 'Pin note'}
            onClick={() => setIsPinned(!isPinned)}
          >
            {isPinned ? <PushPinIcon color="primary" /> : <PushPinOutlinedIcon />}
          </IconButton>
          {note && (
            <IconButton
              aria-label="Delete note"
              onClick={() => {
                onDelete();
                onBack();
              }}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', px: 2, pb: 2, overflow: 'auto' }}>
        <TextField
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          variant="standard"
          fullWidth
          slotProps={{
            input: {
              disableUnderline: true,
              sx: { fontSize: 24, fontWeight: 600, py: 1 },
            },
          }}
        />
        <TextField
          placeholder="Start typing..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          variant="standard"
          fullWidth
          multiline
          minRows={10}
          slotProps={{
            input: {
              disableUnderline: true,
              sx: { fontSize: 16, lineHeight: 1.6 },
            },
          }}
          sx={{ flexGrow: 1 }}
        />
      </Box>
    </Box>
  );
}
